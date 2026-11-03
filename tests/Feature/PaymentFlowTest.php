<?php

namespace Tests\Feature;

use App\Enums\PaymentStatus;
use App\Enums\ReservationStatus;
use App\Models\PaymentTransaction;
use App\Models\Reservation;
use App\Models\RoomType;
use App\Services\RoomInventoryService;
use Database\Seeders\RoomTypeSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Tests\TestCase;

class PaymentFlowTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->travelTo(now()->setDate(2026, 11, 1)->startOfDay());
        $this->seed(RoomTypeSeeder::class);
        app(RoomInventoryService::class)->set($this->room(), '2026-11-02', '2026-11-04', 2);
    }

    private function room(): RoomType
    {
        return RoomType::where('slug', 'deluxe')->firstOrFail();
    }

    private function book(int $rooms = 1): Reservation
    {
        $this->postJson('/reservations', [
            'room_type_id' => $this->room()->id, 'check_in' => '2026-11-02', 'check_out' => '2026-11-04',
            'room_count' => $rooms, 'guest_count' => 2, 'bed_type' => 'queen', 'with_breakfast' => false,
            'promo_code' => null, 'request_id' => (string) Str::uuid(), 'expected_total' => 1700000 * $rooms,
            'guest_name' => 'Test Guest', 'guest_email' => 'guest@example.test', 'guest_phone' => '081234567890',
            'terms_accepted' => true,
        ])->assertCreated();

        return Reservation::latest('id')->firstOrFail();
    }

    private function useXendit(): void
    {
        config([
            'booking.payment_gateway' => 'xendit',
            'services.xendit.secret_key' => 'xnd_development_test',
            'services.xendit.callback_token' => 'callback-secret',
        ]);
    }

    public function test_availability_lists_remaining_rooms_for_every_room_type(): void
    {
        $this->book();
        $response = $this->getJson('/booking/availability?check_in=2026-11-02&check_out=2026-11-04')->assertOk();
        $deluxe = collect($response->json('room_types'))->firstWhere('slug', 'deluxe');
        $this->assertSame(1, $deluxe['available_rooms']);
        $this->assertSame(1700000, $deluxe['stay_price_per_room']);
        // Tipe lain belum diberi stok, jadi tidak boleh terlihat tersedia.
        $this->assertSame(0, collect($response->json('room_types'))->firstWhere('slug', 'standard')['available_rooms']);
        // Check-out tanggal 4 tidak memakai stok malam tanggal 4.
        app(RoomInventoryService::class)->set($this->room(), '2026-11-04', '2026-11-05', 1);
        $this->getJson('/booking/availability?check_in=2026-11-04&check_out=2026-11-05')
            ->assertJsonFragment(['slug' => 'deluxe', 'available_rooms' => 1]);
    }

    public function test_availability_ignores_expired_holds_and_validates_dates(): void
    {
        $this->book(2);
        $this->getJson('/booking/availability?check_in=2026-11-02&check_out=2026-11-04')
            ->assertJsonFragment(['slug' => 'deluxe', 'available_rooms' => 0]);
        $this->travel(31)->minutes();
        $this->getJson('/booking/availability?check_in=2026-11-02&check_out=2026-11-04')
            ->assertJsonFragment(['slug' => 'deluxe', 'available_rooms' => 2]);
        $this->getJson('/booking/availability?check_in=2026-11-04&check_out=2026-11-02')->assertUnprocessable();
    }

    public function test_local_simulator_confirms_the_reservation(): void
    {
        $reservation = $this->book();
        $this->getJson('/booking/room-types')->assertJsonPath('payment.enabled', true);
        $url = $this->postJson("/reservations/{$reservation->booking_code}/payment")->assertOk()->json('payment.checkout_url');
        // Klik ulang memakai tagihan yang sama.
        $this->assertSame($url, $this->postJson("/reservations/{$reservation->booking_code}/payment")->json('payment.checkout_url'));
        $payment = PaymentTransaction::sole();
        $this->get($url)->assertOk()->assertSee('Simulasikan lunas');
        $this->post($url, ['result' => 'paid'])->assertRedirect(route('payments.finish', $payment->reference));
        $this->assertSame(PaymentStatus::Paid, $payment->fresh()->status);
        $this->assertSame(ReservationStatus::Confirmed, $reservation->fresh()->status);
        $this->get(route('payments.finish', $payment->reference))->assertOk()->assertSee('Reservasi terkonfirmasi')->assertDontSee('guest@example.test');
        // Stok tetap terpakai setelah masa tahan berakhir karena reservasi sudah lunas.
        $this->travel(2)->hours();
        $this->getJson('/booking/availability?check_in=2026-11-02&check_out=2026-11-04')
            ->assertJsonFragment(['slug' => 'deluxe', 'available_rooms' => 1]);
    }

    public function test_simulated_expiry_keeps_the_reservation_pending(): void
    {
        $reservation = $this->book();
        $url = $this->postJson("/reservations/{$reservation->booking_code}/payment")->json('payment.checkout_url');
        $this->post($url, ['result' => 'expired']);
        $this->assertSame(PaymentStatus::Expired, PaymentTransaction::sole()->status);
        $this->assertSame(ReservationStatus::Pending, $reservation->fresh()->status);
    }

    public function test_payment_cannot_start_after_the_hold_expires(): void
    {
        $reservation = $this->book();
        $this->travel(31)->minutes();
        $this->postJson("/reservations/{$reservation->booking_code}/payment")->assertUnprocessable()->assertJsonValidationErrors('booking_code');
        $this->assertDatabaseCount('payment_transactions', 0);
    }

    public function test_payments_are_disabled_when_the_gateway_is_off(): void
    {
        config(['booking.payment_gateway' => 'none']);
        $reservation = $this->book();
        $this->getJson('/booking/room-types')->assertJsonPath('payment.enabled', false);
        $this->postJson("/reservations/{$reservation->booking_code}/payment")->assertStatus(503);
    }

    public function test_simulator_is_unavailable_with_a_real_gateway(): void
    {
        $reservation = $this->book();
        $payment = $reservation->payments()->create(['provider' => 'fake', 'amount' => $reservation->total_amount]);
        $this->useXendit();
        $this->get(route('payments.simulate', $payment->reference))->assertNotFound();
    }

    public function test_xendit_invoice_is_created_and_paid_webhook_confirms(): void
    {
        $this->useXendit();
        Http::fake(['api.xendit.co/v2/invoices' => Http::response([
            'id' => 'inv_123', 'invoice_url' => 'https://checkout.xendit.co/web/inv_123', 'expiry_date' => '2026-11-01T00:30:00+07:00',
        ])]);
        $reservation = $this->book();
        $this->postJson("/reservations/{$reservation->booking_code}/payment")->assertOk()
            ->assertJsonPath('payment.checkout_url', 'https://checkout.xendit.co/web/inv_123');
        $payment = PaymentTransaction::sole();
        Http::assertSent(fn ($request) => $request['external_id'] === $payment->reference
            && $request['amount'] === 1700000
            && $request['invoice_duration'] === 1800
            && $request->hasHeader('Authorization', 'Basic '.base64_encode('xnd_development_test:')));

        $body = ['id' => 'inv_123', 'external_id' => $payment->reference, 'status' => 'PAID', 'amount' => 1700000, 'payment_channel' => 'BCA', 'paid_at' => '2026-11-01T00:05:00+07:00'];
        $this->postJson('/payments/webhook', $body)->assertUnauthorized();
        $this->postJson('/payments/webhook', $body, ['x-callback-token' => 'wrong'])->assertUnauthorized();
        $this->postJson('/payments/webhook', $body, ['x-callback-token' => 'callback-secret'])->assertNoContent();
        // Webhook ulang tidak mengubah apa pun.
        $this->postJson('/payments/webhook', [...$body, 'status' => 'EXPIRED'], ['x-callback-token' => 'callback-secret'])->assertNoContent();

        $payment->refresh();
        $this->assertSame(PaymentStatus::Paid, $payment->status);
        $this->assertSame('BCA', $payment->payment_method);
        $this->assertSame(ReservationStatus::Confirmed, $reservation->fresh()->status);
    }

    public function test_webhook_rejects_wrong_amounts_and_unknown_invoices(): void
    {
        $this->useXendit();
        Http::fake(['*' => Http::response(['id' => 'inv_9', 'invoice_url' => 'https://checkout.xendit.co/web/inv_9', 'expiry_date' => '2026-11-01T00:30:00+07:00'])]);
        $reservation = $this->book();
        $this->postJson("/reservations/{$reservation->booking_code}/payment");
        $headers = ['x-callback-token' => 'callback-secret'];
        $this->postJson('/payments/webhook', ['external_id' => PaymentTransaction::sole()->reference, 'status' => 'PAID', 'amount' => 1000], $headers)->assertUnprocessable();
        $this->postJson('/payments/webhook', ['external_id' => (string) Str::uuid(), 'status' => 'PAID'], $headers)->assertNotFound();
        $this->assertSame(ReservationStatus::Pending, $reservation->fresh()->status);
    }

    public function test_late_payment_is_recorded_but_left_for_staff_review(): void
    {
        $this->useXendit();
        Http::fake(['*' => Http::response(['id' => 'inv_7', 'invoice_url' => 'https://checkout.xendit.co/web/inv_7', 'expiry_date' => '2026-11-01T00:30:00+07:00'])]);
        $reservation = $this->book();
        $this->postJson("/reservations/{$reservation->booking_code}/payment");
        $this->postJson('/payments/webhook', [
            'external_id' => PaymentTransaction::sole()->reference, 'status' => 'PAID', 'amount' => 1700000, 'paid_at' => '2026-11-01T01:00:00+07:00',
        ], ['x-callback-token' => 'callback-secret'])->assertNoContent();
        $this->assertSame(PaymentStatus::Paid, PaymentTransaction::sole()->status);
        $this->assertSame(ReservationStatus::Pending, $reservation->fresh()->status);
    }

    public function test_gateway_errors_mark_the_attempt_failed(): void
    {
        $this->useXendit();
        Http::fake(['*' => Http::response(['error_code' => 'INVALID_API_KEY'], 401)]);
        $reservation = $this->book();
        $this->postJson("/reservations/{$reservation->booking_code}/payment")->assertUnprocessable()->assertJsonValidationErrors('payment');
        $this->assertSame(PaymentStatus::Failed, PaymentTransaction::sole()->status);
    }
}
