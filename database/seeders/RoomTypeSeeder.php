<?php

namespace Database\Seeders;

use App\Models\RoomType;
use Illuminate\Database\Seeder;

class RoomTypeSeeder extends Seeder
{
    public function run(): void
    {
        // Initial rates follow RESERVATION_ROOMS, not the separate marketing cards.
        $types = [
            ['standard', 'Standard Room', 19, 2, 600000, ['queen', 'twin']],
            ['superior', 'Superior Room', 20, 2, 700000, ['queen', 'twin']],
            ['deluxe', 'Deluxe Room', 22, 2, 850000, ['queen']],
            ['executive', 'Executive Room', 24, 2, 900000, ['king']],
            ['grand-executive', 'Grand Executive Room', 28, 2, 1050000, ['king']],
            ['suite', 'Executive Suite Room', 36, 3, 1500000, ['king']],
        ];

        foreach ($types as [$slug, $name, $size, $capacity, $price, $beds]) {
            RoomType::firstOrCreate(['slug' => $slug], [
                'name' => $name,
                'size_sqm' => $size,
                'max_guests' => $capacity,
                'base_price' => $price,
                'breakfast_price' => 75000,
                'bed_types' => $beds,
            ]);
        }
    }
}
