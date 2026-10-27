<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoomAvailability extends Model
{
    protected function stayDate(): Attribute
    {
        return Attribute::make(set: fn ($value) => CarbonImmutable::parse($value)->toDateString());
    }

    protected $fillable = ['room_type_id', 'stay_date', 'total_rooms', 'blocked_rooms', 'nightly_price'];

    protected function casts(): array
    {
        return ['stay_date' => 'immutable_date', 'total_rooms' => 'integer', 'blocked_rooms' => 'integer', 'nightly_price' => 'integer'];
    }

    public function roomType(): BelongsTo
    {
        return $this->belongsTo(RoomType::class);
    }

    public function reservationNights(): HasMany
    {
        return $this->hasMany(ReservationNight::class);
    }
}
