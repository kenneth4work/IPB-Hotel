<?php

namespace Tests\Feature;

use App\Models\RoomType;
use App\Services\RoomInventoryService;
use Database\Seeders\RoomTypeSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class BookingEndpointTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->travelTo(now()->setDate(2026, 11, 1)->startOfDay());
        $this->seed(RoomTypeSeeder::class);
    }

    private function selection(): array
    {
        return [
            'room_type_id' => RoomType::where('slug', 'deluxe')->value('id'),
            'check_in' => '2026-11-02', 'check_out' => '2026-11-04',
            'room_count' => 1, 'guest_count' => 2, 'bed_type' => 'queen',
            'with_breakfast' => true, 'promo_code' => 'IPB2026',
        ];
    }

    private function stock(int $rooms = 2): void
    {
        app(RoomInventoryService::class)->set(RoomType::findOrFail($this->selection()['room_type_id']), '2026-11-02', '2026-11-04', $rooms);
    }

    private function payload(): array
    {
        return [...$this->selection(), 'request_id' => (string) Str::uuid(),
            'guest_name' => 'Test Guest', 'guest_email' => 'guest@example.test',
            'guest_phone' => '081234567890', 'expected_total' => 1830000];
    }

    public function test_catalog_uses_database_prices_and_hides_inactive_types(): void
    {
        RoomType::where('slug', 'deluxe')->update(['base_price' => 925000]);
        RoomType::where('slug', 'suite')->update(['is_active' => false]);
        $this->getJson('/booking/room-types')->assertOk()->assertJsonCount(5, 'room_types')
            ->assertJsonFragment(['slug' => 'deluxe', 'base_price' => 925000]);
    }

    public function test_quote_calculates_promo_on_rooms_and_breakfast_per_total_guest(): void
    {
        $this->stock(3);
        $selection = [...$this->selection(), 'room_count' => 2, 'guest_count' => 3, 'total_amount' => 1];
        $this->postJson('/booking/quote', $selection)->assertOk()
            ->assertJsonPath('quote.room_total', 3400000)
            ->assertJsonPath('quote.discount_amount', 340000)
            ->assertJsonPath('quote.breakfast_total', 450000)
            ->assertJsonPath('quote.total_amount', 3510000)
            ->assertJsonPath('quote.can_book', true);
        $this->assertDatabaseCount('reservations', 0);
    }

    public function test_missing_stock_is_reported_without_creating_a_hold(): void
    {
        $this->postJson('/booking/quote', $this->selection())->assertOk()
            ->assertJsonPath('quote.can_book', false)->assertJsonPath('quote.available_rooms', 0);
        $this->postJson('/reservations', $this->payload())->assertUnprocessable()->assertJsonValidationErrors('check_in');
        $this->assertDatabaseCount('reservations', 0);
    }

    public function test_form_submission_creates_server_code_and_persists_authoritative_totals(): void
    {
        $this->stock();
        $response = $this->postJson('/reservations', [...$this->payload(), 'total_amount' => 1, 'booking_code' => 'FAKE', 'status' => 'confirmed'])
            ->assertCreated()->assertJsonPath('reservation.total_amount', 1830000)
            ->assertJsonPath('reservation.discount_amount', 170000)
            ->assertJsonPath('reservation.status', 'pending');
        $code = $response->json('reservation.booking_code');
        $this->assertMatchesRegularExpression('/^IPB-20261101-[0-9A-Z]{26}$/', $code);
        $this->assertDatabaseHas('reservations', ['booking_code' => $code, 'guest_email' => 'guest@example.test', 'total_amount' => 1830000]);
        $this->assertDatabaseCount('reservation_nights', 2);
        $this->assertDatabaseCount('payment_transactions', 0);
        $this->assertArrayNotHasKey('request_fingerprint', $response->json('reservation'));
    }

    public function test_retrying_the_same_request_returns_the_existing_booking(): void
    {
        $this->stock(1);
        $payload = $this->payload();
        $first = $this->postJson('/reservations', $payload)->assertCreated()->json('reservation.booking_code');
        $this->postJson('/reservations', $payload)->assertOk()->assertJsonPath('reservation.booking_code', $first);
        $this->assertDatabaseCount('reservations', 1);
        $this->assertDatabaseCount('reservation_nights', 2);
    }

    public function test_request_id_cannot_be_reused_for_different_guest_details(): void
    {
        $this->stock();
        $payload = $this->payload();
        $this->postJson('/reservations', $payload)->assertCreated();
        $this->postJson('/reservations', [...$payload, 'guest_email' => 'other@example.test'])
            ->assertUnprocessable()->assertJsonValidationErrors('request_id');
    }

    public function test_changed_price_requires_a_new_quote_before_a_hold_is_created(): void
    {
        $this->stock();
        RoomType::where('slug', 'deluxe')->update(['base_price' => 900000]);
        $this->postJson('/reservations', $this->payload())->assertUnprocessable()->assertJsonValidationErrors('expected_total');
        $this->assertDatabaseCount('reservations', 0);
    }

    public function test_stock_is_checked_again_at_submission_after_a_successful_quote(): void
    {
        $this->stock(1);
        $this->postJson('/booking/quote', $this->selection())->assertOk()->assertJsonPath('quote.can_book', true);
        $this->postJson('/reservations', $this->payload())->assertCreated();
        $this->postJson('/reservations', $this->payload())->assertUnprocessable()->assertJsonValidationErrors('room_count');
        $this->assertDatabaseCount('reservations', 1);
    }

    public function test_unknown_promos_and_invalid_guest_details_are_rejected(): void
    {
        $this->stock();
        $this->postJson('/booking/quote', [...$this->selection(), 'promo_code' => 'FAKE'])->assertUnprocessable()->assertJsonValidationErrors('promo_code');
        $this->postJson('/reservations', [...$this->payload(), 'guest_email' => 'invalid', 'guest_phone' => 'abcdefghijk'])
            ->assertUnprocessable()->assertJsonValidationErrors(['guest_email', 'guest_phone']);
        $this->assertDatabaseCount('reservations', 0);
    }

    public function test_guest_details_and_request_id_are_required_for_submission(): void
    {
        $this->postJson('/reservations', $this->selection())->assertUnprocessable()->assertJsonValidationErrors(['request_id', 'expected_total']);
    }
}
