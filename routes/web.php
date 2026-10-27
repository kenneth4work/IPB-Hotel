<?php

use App\Http\Controllers\BookingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Home'))->name('home');

Route::get('/booking/room-types', [BookingController::class, 'rooms'])->middleware('throttle:120,1');
Route::post('/booking/quote', [BookingController::class, 'quote'])->middleware('throttle:120,1');
Route::post('/reservations', [BookingController::class, 'store'])->middleware('throttle:10,1');
