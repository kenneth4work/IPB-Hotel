<?php

namespace App\Payments;

use App\Enums\PaymentStatus;
use Carbon\CarbonImmutable;

/** Status pembayaran dari provider yang sudah diterjemahkan ke format internal. */
final readonly class PaymentNotification
{
    public function __construct(
        public string $reference,
        public PaymentStatus $status,
        public ?int $amount = null,
        public ?string $providerTransactionId = null,
        public ?string $paymentMethod = null,
        public ?CarbonImmutable $paidAt = null,
    ) {}
}
