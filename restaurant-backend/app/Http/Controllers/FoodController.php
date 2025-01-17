<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    public function index()
    {
        $foods = Food::all();
        return response()->json($foods);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
        ]);

        $food = Food::create($validatedData);
        return response()->json($food, 201);
    }

    public function show(Food $food)
    {
        return response()->json($food);
    }

    public function update(Request $request, Food $food)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric',
            'category_id' => 'sometimes|required|exists:categories,id',
        ]);

        $food->update($validatedData);
        return response()->json($food);
    }

    public function destroy(Food $food)
    {
        $food->delete();
        return response()->json(null, 204);
    }
}