<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::with('user')->latest()->get();
        return response()->json($testimonials);
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:500',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $testimonial = Testimonial::create([
            'user_id' => $user->id,
            'content' => $request->content,
            'rating' => $request->rating,
        ]);

        return response()->json($testimonial->load('user'), 201);
    }

    public function destroy(Testimonial $testimonial)
{
    
    $testimonial->delete();
    return response()->json(null, 204);
}

}

