<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Home'))->name('home');
Route::get('/reservasi', fn () => Inertia::render('Home'))->name('reservasi');
Route::get('/kebijakan-privasi', fn () => Inertia::render('Home'))->name('privacy');
Route::get('/syarat-ketentuan', fn () => Inertia::render('Home'))->name('terms');
Route::get('/kebijakan-refund', fn () => Inertia::render('Home'))->name('refund');
Route::get('/kebijakan-cookie', fn () => Inertia::render('Home'))->name('cookies');

Route::get('/booking/room-types', [BookingController::class, 'rooms'])->middleware('throttle:120,1');
Route::post('/booking/quote', [BookingController::class, 'quote'])->middleware('throttle:120,1');
Route::post('/reservations', [BookingController::class, 'store'])->middleware('throttle:10,1');

Route::get('/booking/availability', [BookingController::class, 'availability'])->middleware('throttle:120,1');
Route::post('/reservations/{bookingCode}/payment', [PaymentController::class, 'store'])->middleware('throttle:10,1')->name('payments.store');
Route::post('/payments/webhook', [PaymentController::class, 'webhook'])->middleware('throttle:120,1')->name('payments.webhook');
Route::get('/payments/{payment:reference}', [PaymentController::class, 'finish'])->name('payments.finish');
Route::get('/payments/{payment:reference}/simulate', [PaymentController::class, 'simulator'])->name('payments.simulate');
Route::post('/payments/{payment:reference}/simulate', [PaymentController::class, 'simulate'])->middleware('throttle:10,1');
