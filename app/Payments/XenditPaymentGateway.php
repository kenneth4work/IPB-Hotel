<?php

namespace App\Payments;

use App\Enums\PaymentStatus;
use App\Models\PaymentTransaction;
use App\Models\Reservation;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

/**
 * Xendit Invoice API. Halaman invoice Xendit menampilkan semua metode yang aktif
 * di dashboard (Virtual Account, QRIS, e-wallet, kartu), jadi tidak perlu integrasi
 * per metode. Aktifkan dengan PAYMENT_GATEWAY=xendit serta XENDIT_SECRET_KEY dan
 * XENDIT_CALLBACK_TOKEN di .env, lalu daftarkan URL webhook di dashboard Xendit.
 */
class XenditPaymentGateway implements PaymentGateway
{
    public function __construct(
        private string $secretKey,
        private string $callbackToken,
        private string $baseUrl = 'https://api.xendit.co',
    ) {}

    public function name(): string
    {
        return 'xendit';
    }

    public function enabled(): bool
    {
        return $this->secretKey !== '' && $this->callbackToken !== '';
    }

    public function createInvoice(Reservation $reservation, PaymentTransaction $payment): PaymentInvoice
    {
        // Invoice berakhir bersamaan dengan masa tahan kamar agar tamu tidak bisa membayar kamar yang sudah dilepas.
        $seconds = (int) max(60, now()->diffInSeconds($reservation->hold_expires_at));
        $finishUrl = route('payments.finish', $payment->reference);

        $invoice = Http::withBasicAuth($this->secretKey, '')
            ->acceptJson()
            ->timeout(15)
            ->post(rtrim($this->baseUrl, '/').'/v2/invoices', [
                'external_id' => $payment->reference,
                'amount' => $payment->amount,
                'currency' => $payment->currency,
                'description' => "Reservasi {$reservation->booking_code} - {$reservation->room_type_name}",
                'payer_email' => $reservation->guest_email,
                'invoice_duration' => $seconds,
                'success_redirect_url' => $finishUrl,
                'failure_redirect_url' => $finishUrl,
            ])
            ->throw()
            ->json();

        return new PaymentInvoice($invoice['id'], $invoice['invoice_url'], CarbonImmutable::parse($invoice['expiry_date']));
    }

    /** Xendit mengirim token verifikasi dashboard di header x-callback-token. */
    public function verifyWebhook(Request $request): bool
    {
        return $this->callbackToken !== ''
            && hash_equals($this->callbackToken, (string) $request->header('x-callback-token'));
    }

    public function parseWebhook(Request $request): PaymentNotification
    {
        $status = match ($request->input('status')) {
            'PAID', 'SETTLED' => PaymentStatus::Paid,
            'EXPIRED' => PaymentStatus::Expired,
            default => PaymentStatus::Pending,
        };

        return new PaymentNotification(
            reference: (string) $request->input('external_id'),
            status: $status,
            amount: $request->filled('amount') ? (int) $request->input('amount') : null,
            providerTransactionId: $request->input('id'),
            paymentMethod: $request->input('payment_channel') ?? $request->input('payment_method'),
            paidAt: $request->filled('paid_at') ? CarbonImmutable::parse($request->input('paid_at')) : null,
        );
    }
}
