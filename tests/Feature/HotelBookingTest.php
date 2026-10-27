<?php

namespace Tests\Feature;

use App\Enums\PaymentStatus;
use App\Enums\ReservationStatus;
use App\Models\Reservation;
use App\Models\RoomAvailability;
use App\Models\RoomType;
use App\Services\ReservationService;
use App\Services\RoomAvailabilityService;
use App\Services\RoomInventoryService;
use Database\Seeders\RoomTypeSeeder;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class HotelBookingTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->travelTo(now()->setDate(2026, 11, 1)->startOfDay());
        $this->seed(RoomTypeSeeder::class);
    }

    private function room(): RoomType
    {
        return RoomType::where('slug', 'deluxe')->firstOrFail();
    }

    private function stock(int $rooms = 2, int $blocked = 0): void
    {
        app(RoomInventoryService::class)->set($this->room(), '2026-11-02', '2026-11-04', $rooms, $blocked);
    }

    private function book(array $overrides = []): Reservation
    {
        return app(ReservationService::class)->hold(array_replace([
            'room_type_id' => $this->room()->id,
            'check_in' => '2026-11-02',
            'check_out' => '2026-11-04',
            'room_count' => 1,
            'guest_count' => 2,
            'guest_name' => 'Test Guest',
            'guest_email' => 'guest@example.test',
            'guest_phone' => '081234567890',
            'bed_type' => 'queen',
            'with_breakfast' => true,
        ], $overrides));
    }

    private function remaining(): int
    {
        return app(RoomAvailabilityService::class)->forStay($this->room(), '2026-11-02', '2026-11-04')['available_rooms'];
    }

    public function test_seed_is_repeatable_and_preserves_edited_rates_without_inventing_stock(): void
    {
        $this->room()->update(['base_price' => 999000]);
        $this->seed(RoomTypeSeeder::class);
        $this->assertDatabaseCount('room_types', 6);
        $this->assertSame(999000, $this->room()->base_price);
        $this->assertDatabaseCount('room_availabilities', 0);
        $this->assertSame(0, $this->remaining());
    }

    public function test_booking_snapshots_nightly_rates_and_ignores_client_supplied_totals(): void
    {
        $this->stock(3);
        RoomAvailability::where('stay_date', '2026-11-03')->update(['nightly_price' => 900000]);
        $booking = $this->book(['room_count' => 2, 'guest_count' => 3, 'total_amount' => 1, 'status' => 'confirmed']);
        $this->assertSame(3500000, $booking->room_total);
        $this->assertSame(450000, $booking->breakfast_total);
        $this->assertSame(3950000, $booking->total_amount);
        $this->assertSame(ReservationStatus::Pending, $booking->status);
        $this->assertCount(2, $booking->nights);
        $this->assertTrue($booking->hold_expires_at->equalTo(now()->addMinutes(30)));
        $this->assertSame(1, $this->remaining());
        $this->room()->update(['base_price' => 1]);
        $this->assertSame(3950000, $booking->fresh()->total_amount);
    }

    public function test_sold_out_night_rolls_back_the_entire_reservation(): void
    {
        $this->stock();
        RoomAvailability::where('stay_date', '2026-11-03')->update(['total_rooms' => 0]);
        try {
            $this->book();
            $this->fail('Sold-out night was accepted.');
        } catch (ValidationException $exception) {
            $this->assertArrayHasKey('room_count', $exception->errors());
        }
        $this->assertDatabaseCount('reservations', 0);
        $this->assertDatabaseCount('reservation_nights', 0);
    }

    public function test_blocked_rooms_and_pending_holds_prevent_overselling(): void
    {
        $this->stock(2, 1);
        $this->book();
        $this->assertSame(0, $this->remaining());
        $this->expectException(ValidationException::class);
        $this->book();
    }

    public function test_expired_pending_holds_release_inventory_at_the_expiry_boundary(): void
    {
        $this->stock(1);
        $first = $this->book();
        $this->travelTo($first->hold_expires_at);
        $this->assertSame(1, $this->remaining());
        $second = $this->book();
        $this->assertNotSame($first->booking_code, $second->booking_code);
        $this->assertSame(0, $this->remaining());
    }

    public function test_confirmed_reservation_keeps_stock_after_payment_hold_expiry(): void
    {
        $this->stock(1);
        $booking = $this->book();
        $booking->update(['status' => ReservationStatus::Confirmed, 'confirmed_at' => now()]);
        $this->travelTo($booking->hold_expires_at->addMinute());
        $this->assertSame(0, $this->remaining());
        $booking->update(['status' => ReservationStatus::Cancelled, 'cancelled_at' => now()]);
        $this->assertSame(1, $this->remaining());
    }

    public function test_checkout_day_can_be_booked_by_another_guest(): void
    {
        $this->stock(1);
        $this->book(['check_out' => '2026-11-03']);
        $this->book(['check_in' => '2026-11-03']);
        $this->assertDatabaseCount('reservations', 2);
    }

    public function test_inventory_reduction_cannot_remove_committed_capacity(): void
    {
        $this->stock(1);
        $this->book();
        $this->expectException(ValidationException::class);
        app(RoomInventoryService::class)->set($this->room(), '2026-11-02', '2026-11-04', 0);
    }

    public function test_missing_inventory_is_closed_for_booking(): void
    {
        $this->expectException(ValidationException::class);
        $this->book();
    }

    public function test_inventory_can_be_updated_without_duplicate_dates(): void
    {
        $this->stock(2);
        $this->stock(3, 1);
        $this->assertDatabaseCount('room_availabilities', 2);
        $this->assertSame(2, $this->remaining());
    }

    public function test_inactive_room_types_cannot_be_reserved(): void
    {
        $this->stock();
        $this->room()->update(['is_active' => false]);
        $this->assertSame(0, $this->remaining());
        $this->expectException(ValidationException::class);
        $this->book();
    }

    public function test_bed_choices_are_checked_against_the_selected_room_type(): void
    {
        $this->stock();
        $this->expectException(ValidationException::class);
        $this->book(['bed_type' => 'king']);
    }

    public function test_guest_capacity_is_validated_on_the_server(): void
    {
        $this->stock();
        $this->expectException(ValidationException::class);
        $this->book(['guest_count' => 3]);
    }

    public function test_invalid_dates_raise_validation_errors(): void
    {
        $this->expectException(ValidationException::class);
        app(RoomAvailabilityService::class)->dates('not-a-date', '2026-11-04');
    }

    public function test_payment_attempts_keep_history_without_confirming_a_booking(): void
    {
        $this->stock();
        $booking = $this->book();
        $failed = $booking->payments()->create(['provider' => 'sandbox', 'amount' => $booking->total_amount, 'status' => PaymentStatus::Failed]);
        $retry = $booking->payments()->create(['provider' => 'sandbox', 'amount' => $booking->total_amount]);
        $this->assertNotSame($failed->reference, $retry->reference);
        $this->assertSame(PaymentStatus::Pending, $retry->fresh()->status);
        $this->assertSame(ReservationStatus::Pending, $booking->fresh()->status);
        $this->assertCount(2, $booking->payments);
        $this->assertSame($booking->id, $retry->reservation->id);
    }

    public function test_duplicate_gateway_transaction_ids_are_rejected(): void
    {
        $this->stock();
        $booking = $this->book();
        $attributes = ['provider' => 'sandbox', 'provider_transaction_id' => 'gateway-123', 'amount' => $booking->total_amount];
        $booking->payments()->create($attributes);
        $this->expectException(QueryException::class);
        $booking->payments()->create($attributes);
    }

    public function test_database_restricts_deleting_financial_history(): void
    {
        $this->stock();
        $booking = $this->book();
        $booking->payments()->create(['provider' => 'sandbox', 'amount' => $booking->total_amount]);
        $this->expectException(QueryException::class);
        $booking->delete();
    }
}
