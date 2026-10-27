<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class PaymentTransaction extends Model
{
    protected $fillable = ['reference', 'reservation_id', 'provider', 'provider_transaction_id', 'payment_method', 'status', 'amount', 'currency', 'expires_at', 'paid_at', 'failed_at', 'refunded_at'];

    protected function casts(): array
    {
        return ['status' => PaymentStatus::class, 'amount' => 'integer', 'expires_at' => 'immutable_datetime', 'paid_at' => 'immutable_datetime', 'failed_at' => 'immutable_datetime', 'refunded_at' => 'immutable_datetime'];
    }

    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }

    protected static function booted(): void
    {
        static::creating(function (self $payment): void {
            $payment->reference ??= (string) Str::uuid();
        });
    }
}
