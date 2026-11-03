<?php

namespace App\Payments;

use Carbon\CarbonImmutable;

/** Hasil pembuatan tagihan di provider. */
final readonly class PaymentInvoice
{
    public function __construct(
        public string $providerTransactionId,
        public string $checkoutUrl,
        public CarbonImmutable $expiresAt,
    ) {}
}
