<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request as HttpRequest;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class CheckoutTest extends TestCase
{
    use RefreshDatabase;

    public function test_checkout_displays_selected_vehicle_and_telegram_delivery_status(): void
    {
        config([
            'services.telegram.bot_token' => null,
            'services.telegram.chat_id' => null,
        ]);

        $items = [[
            'id' => 'm1',
            'name' => 'Honda ADV 160cc 2024',
            'price' => 4300,
            'quantity' => 1,
        ]];

        $response = $this->get('/checkout?items='.urlencode(json_encode($items)));

        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Checkout')
            ->where('purchaseItems.0.name', 'Honda ADV 160cc 2024')
            ->where('purchaseItems.0.price', 4300)
            ->where('telegramConfigured', false));
    }

    public function test_purchase_request_is_sent_to_the_configured_telegram_chat(): void
    {
        $user = \App\Models\User::factory()->create();

        config([
            'services.telegram.bot_token' => 'test-bot-token',
            'services.telegram.chat_id' => '123456789',
        ]);

        Http::preventStrayRequests();
        Http::fake([
            'api.telegram.org/*' => Http::response(['ok' => true]),
        ]);

        $response = $this->actingAs($user)->post('/checkout', $this->validPurchaseRequest());

        $response->assertRedirect();
        Http::assertSent(fn (HttpRequest $request) => $request['chat_id'] === '123456789'
            && $request['parse_mode'] === 'HTML'
            && str_contains($request['text'], '<b>G4 AUTO CARE</b>')
            && str_contains($request['text'], 'Honda ADV 160cc 2024')
                && str_contains($request['text'], 'Quantity: 2')
                && str_contains($request['text'], 'Listed line total: $8,600.00')
            && str_contains($request['text'], 'Toyota Prius Option 4')
            && str_contains($request['text'], 'Estimated total (confirm with customer): $35,400.00')
            && str_contains($request['text'], 'Delivery location: Phnom Penh, Cambodia')
        );
    }

    public function test_purchase_request_fails_clearly_when_telegram_is_not_configured(): void
    {
        $user = \App\Models\User::factory()->create();

        config([
            'services.telegram.bot_token' => null,
            'services.telegram.chat_id' => null,
        ]);

        Http::preventStrayRequests();

        $response = $this->actingAs($user)->post('/checkout', $this->validPurchaseRequest());

        $response->assertSessionHasErrors('telegram');
        Http::assertNothingSent();
    }

    public function test_guests_are_redirected_to_register_before_completing_checkout(): void
    {
        $response = $this->from('/checkout?items=' . urlencode(json_encode([[
            'id' => 'm1',
            'name' => 'Honda ADV 160cc 2024',
            'price' => 4300,
            'quantity' => 1,
        ]])))->post('/checkout', $this->validPurchaseRequest());

        $response->assertRedirect(route('register'));
        $this->assertEquals('Please create an account to complete your vehicle request.', session('status'));
    }

    private function validPurchaseRequest(): array
    {
        return [
            'name' => 'Test <Customer>',
            'phone' => '+85512345678',
            'email' => 'customer@example.com',
            'address' => 'Phnom Penh, Cambodia',
            'items' => [[
                'id' => 'm1',
                'name' => 'Honda ADV 160cc 2024',
                'price' => 4300,
                'quantity' => 2,
            ], [
                'id' => 'c1',
                'name' => 'Toyota Prius Option 4',
                'price' => 26800,
                'quantity' => 1,
            ]],
            'message' => '',
        ];
    }
}
