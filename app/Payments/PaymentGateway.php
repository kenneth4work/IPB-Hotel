<?php

namespace App\Payments;

use App\Models\PaymentTransaction;
use App\Models\Reservation;
use Illuminate\Http\Request;

/**
 * Kontrak semua penyedia pembayaran. PaymentService hanya mengenal interface ini,
 * jadi mengganti driver lokal ke Xendit cukup lewat PAYMENT_GATEWAY di .env.
 */
interface PaymentGateway
{
    /** Nama yang disimpan di kolom payment_transactions.provider. */
    public function name(): string;

    /** False jika driver belum boleh dipakai, misalnya API key belum diisi. */
    public function enabled(): bool;

    /** Membuat tagihan di provider dan mengembalikan URL halaman bayar. */
    public function createInvoice(Reservation $reservation, PaymentTransaction $payment): PaymentInvoice;

    /** Memastikan notifikasi webhook benar-benar dikirim provider. */
    public function verifyWebhook(Request $request): bool;

    /** Menerjemahkan isi webhook provider ke format internal. */
    public function parseWebhook(Request $request): PaymentNotification;
}
