<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::with(['user', 'table'])->get();
        return response()->json($reservations);
    }

    public function store(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $validatedData = $request->validate([
                'reservation_date' => 'required|date|after:now',
                'reservation_time' => 'required|date_format:H:i',
                'number_of_guests' => 'required|integer|min:1',
            ]);

            \Log::info('Validated Data: ' . json_encode($validatedData));
            \Log::info('Authenticated User ID: ' . $user->id);

            $availableTable = Table::where('capacity', '>=', $validatedData['number_of_guests'])
                ->whereDoesntHave('reservations', function ($query) use ($validatedData) {
                    $query->where('reservation_date', $validatedData['reservation_date'])
                          ->where('reservation_time', $validatedData['reservation_time'])
                          ->where('status', '!=', 'cancelled');
                })
                ->orderBy('capacity')
                ->first();

            if (!$availableTable) {
                return response()->json(['message' => 'No table available for this date and number of guests.'], 422);
            }

            $reservation = Reservation::create([
                'user_id' => $user->id,
                'table_id' => $availableTable->id,
                'reservation_date' => $validatedData['reservation_date'],
                'reservation_time' => $validatedData['reservation_time'],
                'number_of_guests' => $validatedData['number_of_guests'],
                'status' => 'confirmed',
            ]);

            return response()->json($reservation, 201);
        } catch (\Exception $e) {
            \Log::error('Reservation creation failed: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show(Reservation $reservation)
    {
        return response()->json($reservation->load(['user', 'table']));
    }

    public function update(Request $request, Reservation $reservation)
    {
        $validatedData = $request->validate([
            'reservation_date' => 'sometimes|required|date|after:now',
            'reservation_time' => 'sometimes|required|date_format:H:i',
            'number_of_guests' => 'sometimes|required|integer|min:1',
            'status' => 'sometimes|required|in:pending,confirmed,cancelled',
        ]);

        if (isset($validatedData['reservation_date']) || isset($validatedData['reservation_time']) || isset($validatedData['number_of_guests'])) {
            $availableTable = Table::where('capacity', '>=', $validatedData['number_of_guests'] ?? $reservation->number_of_guests)
                ->where(function ($query) use ($reservation, $validatedData) {
                    $query->where('id', $reservation->table_id)
                        ->orWhereDoesntHave('reservations', function ($query) use ($validatedData, $reservation) {
                            $query->where('reservation_date', $validatedData['reservation_date'] ?? $reservation->reservation_date)
                                  ->where('reservation_time', $validatedData['reservation_time'] ?? $reservation->reservation_time)
                                  ->where('status', '!=', 'cancelled');
                        });
                })
                ->orderBy('capacity')
                ->first();

            if (!$availableTable) {
                return response()->json(['message' => 'Sorry, no table is available for this modification.'], 422);
            }

            $validatedData['table_id'] = $availableTable->id;
        }

        $reservation->update($validatedData);
        return response()->json($reservation->load(['user', 'table']));
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return response()->json(null, 204);
    }
    public function getUserReservations()
    {
        \Log::info('getUserReservations method called');
    
        $user = Auth::user();
        \Log::info('Authenticated user: ', ['user' => $user]);
    
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    
        try {
            $reservations = Reservation::where('user_id', $user->id)
                ->orderBy('reservation_date', 'desc')
                ->orderBy('reservation_time', 'desc')
                ->get();

            \Log::info('Reservations fetched: ', ['count' => $reservations->count()]);

            return response()->json([
                'success' => true,
                'reservations' => $reservations
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch reservations',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getReservationsForUser($userId)
    {
        try {
            $reservations = Reservation::where('user_id', $userId)
                ->orderBy('reservation_date', 'desc')
                ->orderBy('reservation_time', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'reservations' => $reservations
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch reservations',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}