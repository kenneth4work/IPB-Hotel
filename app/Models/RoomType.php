<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoomType extends Model
{
    protected $fillable = ['slug', 'name', 'description', 'size_sqm', 'max_guests', 'base_price', 'breakfast_price', 'bed_types', 'is_active'];

    protected function casts(): array
    {
        return ['bed_types' => 'array', 'is_active' => 'boolean', 'base_price' => 'integer', 'breakfast_price' => 'integer'];
    }

    public function availabilities(): HasMany
    {
        return $this->hasMany(RoomAvailability::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
