<?php

namespace App\Services;

use App\Enums\ReservationStatus;
use App\Models\Reservation;
use App\Models\RoomType;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ReservationService
{
    public function __construct(private ReservationQuoteService $pricing) {}

    public function hold(array $data): Reservation
    {
        $data = Validator::make($data, [
            ...$this->pricing->rules(),
            'request_id' => ['nullable', 'uuid'],
            'expected_total' => ['nullable', 'integer', 'min:0'],
            'guest_name' => ['required', 'string', 'min:2', 'max:255'],
            'guest_email' => ['required', 'email', 'max:255'],
            'guest_phone' => ['required', 'string', 'max:30', 'regex:/^\+?[0-9\s().-]{9,30}$/', function ($attribute, $value, $fail) {
                if (strlen(preg_replace('/\D/', '', $value)) < 9) {
                    $fail('Nomor WhatsApp minimal 9 digit.');
                }
            }],
            'special_request' => ['nullable', 'string', 'max:2000'],
        ])->validate();
        $data = array_replace($data, [
            'room_type_id' => (int) $data['room_type_id'],
            'room_count' => (int) $data['room_count'],
            'guest_count' => (int) $data['guest_count'],
            'with_breakfast' => (bool) $data['with_breakfast'],
            'special_request' => $data['special_request'] ?? null,
            'promo_code' => $data['promo_code'] ?? null,
        ]);
        $fingerprintData = $data;
        unset($fingerprintData['request_id'], $fingerprintData['expected_total']);
        ksort($fingerprintData);
        $fingerprint = hash('sha256', json_encode($fingerprintData, JSON_THROW_ON_ERROR));

        return DB::transaction(function () use ($data, $fingerprint) {
            RoomType::query()->lockForUpdate()->findOrFail($data['room_type_id']);
            if (! empty($data['request_id'])) {
                $existing = Reservation::where('request_id', $data['request_id'])->lockForUpdate()->first();
                if ($existing) {
                    if (! hash_equals($existing->request_fingerprint, $fingerprint)) {
                        throw ValidationException::withMessages(['request_id' => 'Permintaan ini sudah dipakai untuk data reservasi yang berbeda.']);
                    }

                    return $existing->load('nights');
                }
            }
            $quote = $this->pricing->calculate($data, lock: true);
            if (! $quote['inventory_complete']) {
                throw ValidationException::withMessages(['check_in' => 'Stok kamar belum dibuka untuk seluruh tanggal menginap.']);
            }
            if (! $quote['can_book']) {
                throw ValidationException::withMessages(['room_count' => 'Kamar tidak cukup tersedia untuk tanggal dan jumlah yang dipilih.']);
            }
            if (isset($data['expected_total']) && (int) $data['expected_total'] !== $quote['total_amount']) {
                throw ValidationException::withMessages(['expected_total' => 'Harga telah berubah. Periksa harga terbaru sebelum mengirim ulang.']);
            }
            unset($data['expected_total']);
            $reservation = Reservation::create([
                ...$data,
                'request_fingerprint' => $fingerprint,
                'booking_code' => 'IPB-'.now()->format('Ymd').'-'.Str::upper((string) Str::ulid()),
                'room_type_name' => $quote['room_type']->name,
                'status' => ReservationStatus::Pending,
                'currency' => 'IDR',
                'room_total' => $quote['room_total'],
                'breakfast_total' => $quote['breakfast_total'],
                'discount_amount' => $quote['discount_amount'],
                'total_amount' => $quote['total_amount'],
                'hold_expires_at' => now()->addMinutes(30),
            ]);
            $reservation->nights()->createMany(array_map(fn ($night) => [
                'room_availability_id' => $night['room_availability_id'],
                'room_count' => $night['room_count'],
                'nightly_price' => $night['nightly_price'],
                'breakfast_total' => $night['breakfast_total'],
            ], $quote['nights']));

            return $reservation->load('nights');
        }, attempts: 3);
    }
}
