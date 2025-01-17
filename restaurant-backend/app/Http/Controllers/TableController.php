<?php

namespace App\Http\Controllers;

use App\Models\Table;
use Illuminate\Http\Request;

class TableController extends Controller
{
    public function index()
    {
        $tables = Table::all();
        return response()->json($tables);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'number' => 'required|integer|unique:tables',
            'capacity' => 'required|integer|min:1',
            'status' => 'required|in:available,occupied,out_of_service',
        ]);

        $table = Table::create($validatedData);
        return response()->json($table, 201);
    }

    public function show(Table $table)
    {
        return response()->json($table);
    }

    public function update(Request $request, Table $table)
    {
        $validatedData = $request->validate([
            'number' => 'sometimes|required|integer|unique:tables,number,' . $table->id,
            'capacity' => 'sometimes|required|integer|min:1',
            'status' => 'sometimes|required|in:available,occupied,out_of_service',
        ]);

        $table->update($validatedData);
        return response()->json($table);
    }

    public function destroy(Table $table)
    {
        $table->delete();
        return response()->json(null, 204);
    }

    public function checkAvailability(Request $request)
    {
        $validatedData = $request->validate([
            'reservation_date' => 'required|date|after:now',
            'reservation_time' => 'required|date_format:H:i',
            'number_of_guests' => 'required|integer|min:1',
        ]);

        $availableTable = Table::where('capacity', '>=', $validatedData['number_of_guests'])
            ->whereDoesntHave('reservations', function ($query) use ($validatedData) {
                $query->where('reservation_date', $validatedData['reservation_date'])
                      ->where('reservation_time', $validatedData['reservation_time'])
                      ->where('status', '!=', 'cancelled');
            })
            ->orderBy('capacity')
            ->first();

        if ($availableTable) {
            return response()->json(['available' => true, 'table' => $availableTable]);
        } else {
            return response()->json(['available' => false, 'message' => 'Aucune table disponible pour cette date et ce nombre de personnes.']);
        }
    }
}