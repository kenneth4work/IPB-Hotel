<?php

namespace App\Services;

use App\Models\RoomAvailability;
use App\Models\RoomType;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class RoomInventoryService
{
    public function __construct(private RoomAvailabilityService $availability) {}

    public function set(RoomType $roomType, string $checkIn, string $checkOut, int $totalRooms, int $blockedRooms = 0, ?int $nightlyPrice = null): void
    {
        Validator::make(['total' => $totalRooms, 'blocked' => $blockedRooms, 'price' => $nightlyPrice], [
            'total' => ['integer', 'min:0', 'max:65535'],
            'blocked' => ['integer', 'min:0', 'lte:total'],
            'price' => ['nullable', 'integer', 'min:0'],
        ])->validate();
        $dates = $this->availability->dates($checkIn, $checkOut);

        DB::transaction(function () use ($roomType, $dates, $totalRooms, $blockedRooms, $nightlyPrice) {
            // Inventory changes and new holds acquire the same room-type lock first.
            RoomType::query()->lockForUpdate()->findOrFail($roomType->id);
            foreach ($dates as $date) {
                $day = RoomAvailability::query()->where('room_type_id', $roomType->id)->where('stay_date', $date)->lockForUpdate()->first();
                if ($day && $totalRooms - $blockedRooms < $this->availability->reservedRooms($day, lock: true)) {
                    throw ValidationException::withMessages(['total' => 'Stok tidak boleh lebih kecil dari reservasi aktif pada '.$date.'.']);
                }
                RoomAvailability::updateOrCreate(['room_type_id' => $roomType->id, 'stay_date' => $date], [
                    'total_rooms' => $totalRooms,
                    'blocked_rooms' => $blockedRooms,
                    'nightly_price' => $nightlyPrice,
                ]);
            }
        }, attempts: 3);
    }
}
