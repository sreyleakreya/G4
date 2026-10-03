<?php

namespace Tests\Feature;

use Illuminate\Http\Client\Request as HttpRequest;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class TradeInTest extends TestCase
{
    public function test_trade_in_page_explains_if_telegram_delivery_is_configured(): void
    {
        config([
            'services.telegram.bot_token' => null,
            'services.telegram.chat_id' => null,
        ]);

        $this->get('/trade-in')->assertInertia(fn (AssertableInertia $page) => $page
            ->component('TradeIn')
            ->where('telegramConfigured', false));
    }

    public function test_trade_in_valuation_request_is_sent_to_the_configured_telegram_chat(): void
    {
        config([
            'services.telegram.bot_token' => 'test-bot-token',
            'services.telegram.chat_id' => '123456789',
        ]);

        Http::preventStrayRequests();
        Http::fake([
            'api.telegram.org/*' => Http::response(['ok' => true]),
        ]);

        $response = $this->post('/trade-in', $this->validTradeInRequest());

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Your valuation request has been sent. Our team will call you soon.');
        Http::assertSent(fn (HttpRequest $request) => $request['chat_id'] === '123456789'
            && $request['parse_mode'] === 'HTML'
            && str_contains($request['text'], 'Toyota Camry 2.0')
            && str_contains($request['text'], '68,000 km')
            && str_contains($request['text'], 'Expected price: $12,500.00')
            && str_contains($request['text'], 'well maintained'));
    }

    public function test_trade_in_request_reports_that_telegram_is_not_configured(): void
    {
        config([
            'services.telegram.bot_token' => null,
            'services.telegram.chat_id' => null,
        ]);

        Http::preventStrayRequests();

        $response = $this->from('/trade-in')->post('/trade-in', $this->validTradeInRequest());

        $response->assertSessionHasErrors('telegram');
        Http::assertNothingSent();
    }

    public function test_trade_in_request_requires_complete_valid_vehicle_details(): void
    {
        Http::preventStrayRequests();

        $response = $this->from('/trade-in')->post('/trade-in', [
            'name' => '',
            'phone' => '',
            'vehicle' => '',
            'year' => 1800,
            'mileage' => -1,
            'condition' => 'unknown',
        ]);

        $response->assertSessionHasErrors(['name', 'phone', 'vehicle', 'year', 'mileage', 'condition']);
        Http::assertNothingSent();
    }

    private function validTradeInRequest(): array
    {
        return [
            'name' => 'Sokha Chan',
            'phone' => '012 345 678',
            'vehicle' => 'Toyota Camry 2.0',
            'year' => 2019,
            'mileage' => 68000,
            'condition' => 'good',
            'expected_price' => 12500,
            'notes' => 'Recently serviced and well maintained.',
        ];
    }
}
