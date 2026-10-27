<?php

namespace App\Services;

use App\Enums\ReservationStatus;
use App\Models\ReservationNight;
use App\Models\RoomAvailability;
use App\Models\RoomType;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Validator;

class RoomAvailabilityService
{
    /** Check-out is exclusive: a stay from 27 to 28 consumes only the 27th. */
    public function dates(string $checkIn, string $checkOut): array
    {
        Validator::make(['check_in' => $checkIn, 'check_out' => $checkOut], [
            'check_in' => ['required', 'date_format:Y-m-d', 'after_or_equal:today'],
            'check_out' => ['required', 'date_format:Y-m-d', 'after:check_in'],
        ])->validate();

        Validator::make(['check_out' => $checkOut], [
            'check_out' => ['before_or_equal:'.CarbonImmutable::parse($checkIn)->addDays(365)->toDateString()],
        ])->validate();

        $dates = [];
        for ($date = CarbonImmutable::parse($checkIn); $date->lt(CarbonImmutable::parse($checkOut)); $date = $date->addDay()) {
            $dates[] = $date->toDateString();
        }

        return $dates;
    }

    public function forStay(RoomType $roomType, string $checkIn, string $checkOut): array
    {
        $dates = $this->dates($checkIn, $checkOut);
        $inventory = $roomType->availabilities()->whereIn('stay_date', $dates)->get()->keyBy(fn ($day) => $day->stay_date->toDateString());
        $nights = [];

        foreach ($dates as $date) {
            $day = $inventory->get($date);
            $nights[] = [
                'date' => $date,
                'available_rooms' => $day && $roomType->is_active ? max(0, $day->total_rooms - $day->blocked_rooms - $this->reservedRooms($day)) : 0,
                'nightly_price' => $day?->nightly_price ?? $roomType->base_price,
            ];
        }

        return ['available_rooms' => min(array_column($nights, 'available_rooms')), 'nights' => $nights];
    }

    public function reservedRooms(RoomAvailability $day, bool $lock = false): int
    {
        $query = ReservationNight::query()
            ->join('reservations', 'reservations.id', '=', 'reservation_nights.reservation_id')
            ->where('room_availability_id', $day->id)
            ->where(function ($query) {
                $query->whereIn('reservations.status', [ReservationStatus::Confirmed->value, ReservationStatus::CheckedIn->value, ReservationStatus::Completed->value])
                    ->orWhere(function ($query) {
                        $query->where('reservations.status', ReservationStatus::Pending->value)
                            ->where('hold_expires_at', '>', now());
                    });
            });

        // Locking reads see the latest committed holds after waiting for inventory locks.
        if ($lock) {
            $query->lockForUpdate();
        }

        return (int) $query->get(['reservation_nights.room_count'])->sum('room_count');
    }
}
