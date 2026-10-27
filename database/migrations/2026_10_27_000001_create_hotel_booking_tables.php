<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('room_types', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->unsignedSmallInteger('size_sqm')->nullable();
            $table->unsignedSmallInteger('max_guests');
            $table->unsignedBigInteger('base_price');
            $table->unsignedBigInteger('breakfast_price')->default(75000);
            $table->json('bed_types');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('room_availabilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_type_id')->constrained()->restrictOnDelete();
            $table->date('stay_date');
            $table->unsignedSmallInteger('total_rooms');
            $table->unsignedSmallInteger('blocked_rooms')->default(0);
            $table->unsignedBigInteger('nightly_price')->nullable();
            $table->timestamps();
            $table->unique(['room_type_id', 'stay_date']);
        });

        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('booking_code', 40)->unique();
            $table->foreignId('room_type_id')->constrained()->restrictOnDelete();
            $table->string('room_type_name');
            $table->string('guest_name');
            $table->string('guest_email');
            $table->string('guest_phone', 30);
            $table->date('check_in');
            $table->date('check_out');
            $table->unsignedSmallInteger('room_count');
            $table->unsignedSmallInteger('guest_count');
            $table->string('bed_type', 20);
            $table->boolean('with_breakfast')->default(false);
            $table->text('special_request')->nullable();
            $table->string('status', 30)->default('pending');
            $table->char('currency', 3)->default('IDR');
            $table->unsignedBigInteger('room_total');
            $table->unsignedBigInteger('breakfast_total')->default(0);
            $table->unsignedBigInteger('total_amount');
            $table->dateTime('hold_expires_at')->nullable();
            $table->dateTime('confirmed_at')->nullable();
            $table->dateTime('cancelled_at')->nullable();
            $table->timestamps();
            $table->index(['status', 'hold_expires_at']);
            $table->index(['room_type_id', 'check_in', 'check_out']);
        });

        Schema::create('reservation_nights', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained()->restrictOnDelete();
            $table->foreignId('room_availability_id')->constrained()->restrictOnDelete();
            $table->unsignedSmallInteger('room_count');
            $table->unsignedBigInteger('nightly_price');
            $table->unsignedBigInteger('breakfast_total')->default(0);
            $table->timestamps();
            $table->unique(['reservation_id', 'room_availability_id']);
        });

        Schema::create('payment_transactions', function (Blueprint $table) {
            $table->id();
            $table->uuid('reference')->unique();
            $table->foreignId('reservation_id')->constrained()->restrictOnDelete();
            $table->string('provider', 40);
            $table->string('provider_transaction_id', 150)->nullable();
            $table->string('payment_method', 60)->nullable();
            $table->string('status', 30)->default('pending');
            $table->unsignedBigInteger('amount');
            $table->char('currency', 3)->default('IDR');
            $table->dateTime('expires_at')->nullable();
            $table->dateTime('paid_at')->nullable();
            $table->dateTime('failed_at')->nullable();
            $table->dateTime('refunded_at')->nullable();
            $table->timestamps();
            $table->unique(['provider', 'provider_transaction_id']);
            $table->index(['reservation_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_transactions');
        Schema::dropIfExists('reservation_nights');
        Schema::dropIfExists('reservations');
        Schema::dropIfExists('room_availabilities');
        Schema::dropIfExists('room_types');
    }
};
