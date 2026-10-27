<?php

namespace App\Models;

use App\Enums\ReservationStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reservation extends Model
{
    protected $fillable = ['request_id', 'request_fingerprint', 'promo_code', 'discount_amount', 'booking_code', 'room_type_id', 'room_type_name', 'guest_name', 'guest_email', 'guest_phone', 'check_in', 'check_out', 'room_count', 'guest_count', 'bed_type', 'with_breakfast', 'special_request', 'status', 'currency', 'room_total', 'breakfast_total', 'total_amount', 'hold_expires_at', 'confirmed_at', 'cancelled_at'];

    protected function casts(): array
    {
        return ['discount_amount' => 'integer', 'status' => ReservationStatus::class, 'check_in' => 'immutable_date', 'check_out' => 'immutable_date', 'with_breakfast' => 'boolean', 'hold_expires_at' => 'immutable_datetime', 'confirmed_at' => 'immutable_datetime', 'cancelled_at' => 'immutable_datetime', 'room_total' => 'integer', 'breakfast_total' => 'integer', 'total_amount' => 'integer'];
    }

    public function roomType(): BelongsTo
    {
        return $this->belongsTo(RoomType::class);
    }

    public function nights(): HasMany
    {
        return $this->hasMany(ReservationNight::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(PaymentTransaction::class);
    }
}
