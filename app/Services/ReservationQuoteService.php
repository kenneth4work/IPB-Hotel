<?php

namespace App\Services;

use App\Models\RoomType;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ReservationQuoteService
{
    public function __construct(private RoomAvailabilityService $availability) {}

    public function rules(): array
    {
        return [
            'room_type_id' => ['required', 'integer', 'exists:room_types,id'],
            'check_in' => ['required', 'date_format:Y-m-d', 'after_or_equal:today'],
            'check_out' => ['required', 'date_format:Y-m-d', 'after:check_in'],
            'room_count' => ['required', 'integer', 'min:1', 'max:100'],
            'guest_count' => ['required', 'integer', 'min:1', 'max:1000'],
            'bed_type' => ['required', Rule::in(['king', 'queen', 'twin'])],
            'with_breakfast' => ['required', 'boolean'],
            'promo_code' => ['nullable', 'string', 'max:40', Rule::in([config('booking.promo_code')])],
        ];
    }

    public function calculate(array $data, bool $lock = false): array
    {
        $data = Validator::make($data, $this->rules())->validate();
        $dates = $this->availability->dates($data['check_in'], $data['check_out']);
        $query = RoomType::query();
        if ($lock) {
            $query->lockForUpdate();
        }
        $roomType = $query->findOrFail($data['room_type_id']);
        if (! $roomType->is_active) {
            throw ValidationException::withMessages(['room_type_id' => 'Tipe kamar tidak tersedia.']);
        }
        if (! in_array($data['bed_type'], $roomType->bed_types, true)) {
            throw ValidationException::withMessages(['bed_type' => 'Pilihan kasur tidak tersedia untuk tipe kamar ini.']);
        }
        if ($data['guest_count'] > $data['room_count'] * $roomType->max_guests) {
            throw ValidationException::withMessages(['guest_count' => 'Jumlah tamu melebihi kapasitas kamar.']);
        }
        $query = $roomType->availabilities()->whereIn('stay_date', $dates)->orderBy('stay_date');
        if ($lock) {
            $query->lockForUpdate();
        }
        $inventory = $query->get()->keyBy(fn ($day) => $day->stay_date->toDateString());
        $nights = [];
        $roomTotal = 0;
        $breakfastPerNight = $data['with_breakfast'] ? $roomType->breakfast_price * $data['guest_count'] : 0;
        foreach ($dates as $date) {
            $day = $inventory->get($date);
            $price = $day?->nightly_price ?? $roomType->base_price;
            $roomTotal += $price * $data['room_count'];
            $nights[] = [
                'date' => $date,
                'room_availability_id' => $day?->id,
                'available_rooms' => $day ? max(0, $day->total_rooms - $day->blocked_rooms - $this->availability->reservedRooms($day, $lock)) : 0,
                'room_count' => (int) $data['room_count'],
                'nightly_price' => $price,
                'breakfast_total' => $breakfastPerNight,
            ];
        }
        $promo = $data['promo_code'] ?? null;
        $discount = $promo ? intdiv($roomTotal * (int) config('booking.promo_discount_percent') + 50, 100) : 0;
        $breakfastTotal = $breakfastPerNight * count($dates);
        $available = min(array_column($nights, 'available_rooms'));

        return [
            'room_type' => $roomType,
            'inventory_complete' => $inventory->count() === count($dates),
            'available_rooms' => $available,
            'can_book' => $available >= $data['room_count'],
            'nights' => $nights,
            'night_count' => count($dates),
            'room_total' => $roomTotal,
            'breakfast_total' => $breakfastTotal,
            'promo_code' => $promo,
            'discount_amount' => $discount,
            'total_amount' => $roomTotal - $discount + $breakfastTotal,
            'currency' => 'IDR',
        ];
    }
}
