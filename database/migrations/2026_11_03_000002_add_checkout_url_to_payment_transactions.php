<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payment_transactions', function (Blueprint $table) {
            // URL halaman bayar provider, dipakai ulang selama tagihan belum kedaluwarsa.
            $table->string('checkout_url', 2048)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('payment_transactions', function (Blueprint $table) {
            $table->dropColumn('checkout_url');
        });
    }
};
