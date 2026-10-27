<?php

namespace App\Http\Controllers;

use App\Models\RoomType;
use App\Services\ReservationQuoteService;
use App\Services\ReservationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function rooms(): JsonResponse
    {
        return response()->json([
            'room_types' => RoomType::where('is_active', true)->orderBy('base_price')->get([
                'id', 'slug', 'name', 'size_sqm', 'max_guests', 'base_price', 'breakfast_price', 'bed_types',
            ]),
            'promo' => ['code' => config('booking.promo_code'), 'discount_percent' => config('booking.promo_discount_percent')],
        ])->header('Cache-Control', 'no-store');
    }

    public function quote(Request $request, ReservationQuoteService $pricing): JsonResponse
    {
        $quote = $pricing->calculate($request->all());
        unset($quote['room_type'], $quote['inventory_complete']);
        $quote['nights'] = array_map(fn ($night) => array_diff_key($night, ['room_availability_id' => true]), $quote['nights']);

        return response()->json(['quote' => $quote])->header('Cache-Control', 'no-store');
    }

    public function store(Request $request, ReservationService $reservations): JsonResponse
    {
        $request->validate(['request_id' => ['required', 'uuid'], 'expected_total' => ['required', 'integer', 'min:0']]);
        $reservation = $reservations->hold($request->all());

        return response()->json(['reservation' => [
            'booking_code' => $reservation->booking_code,
            'status' => $reservation->status->value,
            'room_name' => $reservation->room_type_name,
            'guest_name' => $reservation->guest_name,
            'guest_email' => $reservation->guest_email,
            'guest_phone' => $reservation->guest_phone,
            'check_in' => $reservation->check_in->toDateString(),
            'check_out' => $reservation->check_out->toDateString(),
            'night_count' => $reservation->nights->count(),
            'room_count' => (int) $reservation->room_count,
            'guest_count' => (int) $reservation->guest_count,
            'bed_type' => $reservation->bed_type,
            'with_breakfast' => $reservation->with_breakfast,
            'special_request' => $reservation->special_request,
            'promo_code' => $reservation->promo_code,
            'room_total' => $reservation->room_total,
            'breakfast_total' => $reservation->breakfast_total,
            'discount_amount' => $reservation->discount_amount,
            'total_amount' => $reservation->total_amount,
            'currency' => $reservation->currency,
            'hold_expires_at' => $reservation->hold_expires_at->toIso8601String(),
        ]], $reservation->wasRecentlyCreated ? 201 : 200)->header('Cache-Control', 'no-store');
    }
}
