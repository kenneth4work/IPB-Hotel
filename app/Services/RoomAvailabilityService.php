<?php

namespace App\Services;

use App\Enums\ReservationStatus;
use App\Models\ReservationNight;
use App\Models\RoomAvailability;
use App\Models\RoomType;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
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

    /**
     * Sisa kamar setiap tipe aktif untuk satu rentang menginap, dihitung dengan satu query.
     * Reservasi tumpang tindih dengan malam D jika check_in <= D < check_out; karena setiap
     * reservasi menyimpan baris per malam, cukup menjumlah baris malam D lalu mengambil
     * nilai terkecil di seluruh rentang. Tanggal tanpa stok membuat tipe itu tidak tersedia.
     */
    public function summary(string $checkIn, string $checkOut): Collection
    {
        $dates = $this->dates($checkIn, $checkOut);
        $reserved = $this->activeNights()
            ->selectRaw('reservation_nights.room_availability_id, SUM(reservation_nights.room_count) as reserved_rooms')
            ->groupBy('reservation_nights.room_availability_id')
            ->toBase();
        $days = RoomAvailability::query()
            ->leftJoinSub($reserved, 'reserved', 'reserved.room_availability_id', '=', 'room_availabilities.id')
            ->whereIn('stay_date', $dates)
            ->get(['room_availabilities.*', 'reserved.reserved_rooms'])
            ->groupBy('room_type_id');

        return RoomType::where('is_active', true)->orderByDesc('base_price')->get()->map(function (RoomType $roomType) use ($days, $dates) {
            $nights = $days->get($roomType->id, collect());
            $free = $nights->map(fn ($day) => max(0, $day->total_rooms - $day->blocked_rooms - (int) $day->reserved_rooms));

            return [
                'room_type_id' => $roomType->id,
                'slug' => $roomType->slug,
                'name' => $roomType->name,
                'available_rooms' => $nights->count() === count($dates) ? (int) $free->min() : 0,
                'stay_price_per_room' => (int) $nights->sum(fn ($day) => $day->nightly_price ?? $roomType->base_price),
            ];
        });
    }

    public function reservedRooms(RoomAvailability $day, bool $lock = false): int
    {
        $query = $this->activeNights()->where('room_availability_id', $day->id);

        // Locking reads see the latest committed holds after waiting for inventory locks.
        if ($lock) {
            $query->lockForUpdate();
        }

        return (int) $query->get(['reservation_nights.room_count'])->sum('room_count');
    }

    /** Malam milik reservasi yang memakai stok: terkonfirmasi, atau pending dengan hold yang masih berlaku. */
    private function activeNights(): Builder
    {
        return ReservationNight::query()
            ->join('reservations', 'reservations.id', '=', 'reservation_nights.reservation_id')
            ->where(function ($query) {
                $query->whereIn('reservations.status', [ReservationStatus::Confirmed->value, ReservationStatus::CheckedIn->value, ReservationStatus::Completed->value])
                    ->orWhere(function ($query) {
                        $query->where('reservations.status', ReservationStatus::Pending->value)
                            ->where('hold_expires_at', '>', now());
                    });
            });
    }
}
