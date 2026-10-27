<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->uuid('request_id')->nullable()->unique();
            $table->string('request_fingerprint', 64)->nullable();
            $table->string('promo_code', 40)->nullable();
            $table->unsignedBigInteger('discount_amount')->default(0);
        });
    }

    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropUnique(['request_id']);
            $table->dropColumn(['request_id', 'request_fingerprint', 'promo_code', 'discount_amount']);
        });
    }
};
