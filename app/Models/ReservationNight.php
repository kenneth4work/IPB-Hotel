<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReservationNight extends Model
{
    protected $fillable = ['reservation_id', 'room_availability_id', 'room_count', 'nightly_price', 'breakfast_total'];

    protected function casts(): array
    {
        return ['room_count' => 'integer', 'nightly_price' => 'integer', 'breakfast_total' => 'integer'];
    }

    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }

    public function availability(): BelongsTo
    {
        return $this->belongsTo(RoomAvailability::class, 'room_availability_id');
    }
}
