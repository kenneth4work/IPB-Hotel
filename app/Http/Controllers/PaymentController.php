<?php

namespace App\Http\Controllers;

use App\Enums\PaymentStatus;
use App\Models\PaymentTransaction;
use App\Models\Reservation;
use App\Payments\PaymentGateway;
use App\Payments\PaymentNotification;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class PaymentController extends Controller
{
    /** Tamu menekan "Bayar Sekarang": buat tagihan lalu kirim URL halaman bayar ke frontend. */
    public function store(string $bookingCode, PaymentService $payments): JsonResponse
    {
        abort_unless($payments->enabled(), 503, 'Pembayaran online belum aktif.');
        $reservation = Reservation::where('booking_code', $bookingCode)->firstOrFail();
        $payment = $payments->checkout($reservation);

        return response()->json(['payment' => [
            'reference' => $payment->reference,
            'checkout_url' => $payment->checkout_url,
            'expires_at' => $payment->expires_at?->toIso8601String(),
        ]])->header('Cache-Control', 'no-store');
    }

    /** Notifikasi server-ke-server dari provider; satu-satunya jalur yang menandai reservasi lunas. */
    public function webhook(Request $request, PaymentGateway $gateway, PaymentService $payments): Response
    {
        abort_unless($gateway->verifyWebhook($request), 401);
        $payment = $payments->apply($gateway->parseWebhook($request));
        abort_unless($payment, 404);

        return response()->noContent();
    }

    /** Halaman tujuan setelah tamu kembali dari halaman bayar. */
    public function finish(PaymentTransaction $payment): View
    {
        return view('payments.status', ['payment' => $payment, 'reservation' => $payment->reservation]);
    }

    /** Simulator driver fake: pengganti halaman bayar Xendit saat pengembangan lokal. */
    public function simulator(PaymentTransaction $payment, PaymentGateway $gateway): View
    {
        $this->ensureSimulator($payment, $gateway);

        return view('payments.simulate', ['payment' => $payment, 'reservation' => $payment->reservation]);
    }

    public function simulate(Request $request, PaymentTransaction $payment, PaymentGateway $gateway, PaymentService $payments): RedirectResponse
    {
        $this->ensureSimulator($payment, $gateway);
        $result = $request->validate(['result' => ['required', Rule::in(['paid', 'expired'])]])['result'];
        $payments->apply(new PaymentNotification(
            reference: $payment->reference,
            status: PaymentStatus::from($result),
            amount: $payment->amount,
            paymentMethod: $result === 'paid' ? 'SIMULATOR' : null,
        ));

        return redirect()->route('payments.finish', $payment->reference);
    }

    private function ensureSimulator(PaymentTransaction $payment, PaymentGateway $gateway): void
    {
        abort_unless($gateway->name() === 'fake' && $gateway->enabled() && $payment->provider === 'fake', 404);
    }
}
