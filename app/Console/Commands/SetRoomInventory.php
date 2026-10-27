<?php

namespace App\Console\Commands;

use App\Models\RoomType;
use App\Services\RoomInventoryService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;

class SetRoomInventory extends Command
{
    protected $signature = 'hotel:inventory {room_type : Slug tipe kamar} {check_in : Tanggal awal YYYY-MM-DD} {check_out : Tanggal akhir eksklusif YYYY-MM-DD} {--rooms= : Total kamar dijual per malam} {--blocked=0 : Kamar diblokir per malam} {--price= : Harga IDR per kamar per malam; kosong memakai harga dasar}';

    protected $description = 'Mengatur stok kamar dan tarif per tanggal tanpa menghapus reservasi aktif';

    public function handle(RoomInventoryService $inventory): int
    {
        $data = Validator::make($this->options(), [
            'rooms' => ['required', 'integer', 'min:0', 'max:65535'],
            'blocked' => ['required', 'integer', 'min:0', 'lte:rooms'],
            'price' => ['nullable', 'integer', 'min:0'],
        ])->validate();
        $roomType = RoomType::where('slug', $this->argument('room_type'))->firstOrFail();
        $inventory->set($roomType, $this->argument('check_in'), $this->argument('check_out'), (int) $data['rooms'], (int) $data['blocked'], isset($data['price']) ? (int) $data['price'] : null);
        $this->info('Stok kamar berhasil disimpan.');

        return self::SUCCESS;
    }
}
