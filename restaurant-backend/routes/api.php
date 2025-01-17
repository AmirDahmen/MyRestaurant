<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TestimonialController;

// Routes for user authentication
Route::group(['middleware' => 'api', 'prefix' => 'users'], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refreshToken', [AuthController::class, 'refresh'])->middleware('jwt.auth');
    Route::get('/verify-email', [AuthController::class, 'verifyEmail'])->name('verify.email');
});
Route::apiResource('foods', FoodController::class);
Route::apiResource('categories', CategoryController::class);
Route::get('/testimonials', [TestimonialController::class, 'index']);


Route::group(['middleware' => ['auth:api']], function () {
    Route::apiResource('reservations', ReservationController::class);
    Route::apiResource('tables', TableController::class);
    Route::apiResource('users', UserController::class);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);


    Route::get('tables/{id}/availability', [TableController::class, 'checkAvailability']);

    Route::get('user/{userId}/reservations', [ReservationController::class, 'getReservationsForUser']);

Route::group(['middleware' => ['auth:api']], function () {
    Route::post('/testimonials', [TestimonialController::class, 'store']);
    Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy']);
});


});



