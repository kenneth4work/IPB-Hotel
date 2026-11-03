<?php

namespace App\Payments;

use App\Models\PaymentTransaction;
use App\Models\Reservation;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use LogicException;

/**
 * Driver lokal untuk menguji alur bayar tanpa akun Xendit. Halaman bayarnya adalah
 * simulator di /payments/{reference}/simulate. Tidak pernah aktif di production.
 */
class FakePaymentGateway implements PaymentGateway
{
    public function __construct(private bool $enabled) {}

    public function name(): string
    {
        return 'fake';
    }

    public function enabled(): bool
    {
        return $this->enabled;
    }

    public function createInvoice(Reservation $reservation, PaymentTransaction $payment): PaymentInvoice
    {
        return new PaymentInvoice(
            'fake-'.$payment->reference,
            route('payments.simulate', $payment->reference),
            CarbonImmutable::instance($reservation->hold_expires_at),
        );
    }

    /** Simulator memanggil PaymentService langsung, jadi webhook tidak dipakai. */
    public function verifyWebhook(Request $request): bool
    {
        return false;
    }

    public function parseWebhook(Request $request): PaymentNotification
    {
        throw new LogicException('Driver fake tidak menerima webhook.');
    }
}
