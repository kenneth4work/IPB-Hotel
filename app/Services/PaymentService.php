<?php

namespace App\Services;

use App\Enums\PaymentStatus;
use App\Enums\ReservationStatus;
use App\Models\PaymentTransaction;
use App\Models\Reservation;
use App\Payments\PaymentGateway;
use App\Payments\PaymentNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Throwable;

class PaymentService
{
    public function __construct(private PaymentGateway $gateway) {}

    public function enabled(): bool
    {
        return $this->gateway->enabled();
    }

    /**
     * Membuat (atau memakai ulang) tagihan untuk reservasi pending yang masih ditahan.
     * Panggilan ke provider dilakukan di luar transaksi agar kunci database tidak
     * tertahan selama menunggu jaringan.
     */
    public function checkout(Reservation $reservation): PaymentTransaction
    {
        $payment = DB::transaction(function () use ($reservation) {
            $reservation = Reservation::lockForUpdate()->findOrFail($reservation->id);
            if ($reservation->status !== ReservationStatus::Pending || $reservation->hold_expires_at->isPast()) {
                throw ValidationException::withMessages(['booking_code' => 'Reservasi ini tidak lagi menunggu pembayaran. Silakan buat reservasi baru.']);
            }

            // Tagihan yang masih berlaku dipakai lagi agar klik berulang tidak membuat invoice ganda.
            $open = $reservation->payments()
                ->where('provider', $this->gateway->name())
                ->where('status', PaymentStatus::Pending->value)
                ->whereNotNull('checkout_url')
                ->where('expires_at', '>', now())
                ->latest('id')
                ->first();

            return $open ?? $reservation->payments()->create([
                'provider' => $this->gateway->name(),
                'amount' => $reservation->total_amount,
                'currency' => $reservation->currency,
            ]);
        });

        if ($payment->checkout_url) {
            return $payment;
        }

        try {
            $invoice = $this->gateway->createInvoice($reservation->fresh(), $payment);
        } catch (Throwable $e) {
            $payment->update(['status' => PaymentStatus::Failed, 'failed_at' => now()]);
            Log::error('Gagal membuat tagihan pembayaran', ['reference' => $payment->reference, 'error' => $e->getMessage()]);
            throw ValidationException::withMessages(['payment' => 'Layanan pembayaran sedang tidak dapat dihubungi. Coba lagi beberapa saat lagi.']);
        }

        $payment->update([
            'provider_transaction_id' => $invoice->providerTransactionId,
            'checkout_url' => $invoice->checkoutUrl,
            'expires_at' => $invoice->expiresAt,
        ]);

        return $payment;
    }

    /**
     * Menerapkan status dari provider. Aman dipanggil berulang (webhook bisa dikirim
     * lebih dari sekali): status akhir tidak berubah lagi.
     */
    public function apply(PaymentNotification $notification): ?PaymentTransaction
    {
        return DB::transaction(function () use ($notification) {
            $payment = PaymentTransaction::where('reference', $notification->reference)->lockForUpdate()->first();
            if (! $payment || $notification->status === PaymentStatus::Pending || $payment->status !== PaymentStatus::Pending) {
                return $payment;
            }

            if ($notification->amount !== null && $notification->amount !== $payment->amount) {
                Log::warning('Nominal webhook tidak sama dengan tagihan', ['reference' => $payment->reference, 'amount' => $notification->amount]);
                throw ValidationException::withMessages(['amount' => 'Nominal pembayaran tidak sesuai.']);
            }

            if ($notification->status !== PaymentStatus::Paid) {
                $payment->update([
                    'status' => $notification->status,
                    'failed_at' => $notification->status === PaymentStatus::Failed ? now() : null,
                ]);

                return $payment;
            }

            $paidAt = $notification->paidAt ?? now()->toImmutable();
            $payment->update([
                'status' => PaymentStatus::Paid,
                'paid_at' => $paidAt,
                'provider_transaction_id' => $notification->providerTransactionId ?? $payment->provider_transaction_id,
                'payment_method' => $notification->paymentMethod,
            ]);

            // Lunas dalam masa tahan: kamar dikonfirmasi. Di luar itu stok mungkin sudah dijual
            // ke tamu lain, jadi reservasi dibiarkan untuk ditinjau staf (konfirmasi manual atau refund).
            $reservation = Reservation::lockForUpdate()->findOrFail($payment->reservation_id);
            if ($reservation->status === ReservationStatus::Pending && $paidAt->lte($reservation->hold_expires_at)) {
                $reservation->update(['status' => ReservationStatus::Confirmed, 'confirmed_at' => now()]);
            } else {
                Log::warning('Pembayaran diterima untuk reservasi yang perlu ditinjau', [
                    'booking_code' => $reservation->booking_code,
                    'reference' => $payment->reference,
                    'reservation_status' => $reservation->status->value,
                ]);
            }

            return $payment;
        });
    }
}
