<?php

namespace Tests\Feature;

use Illuminate\Http\Client\Request as HttpRequest;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class ContactTest extends TestCase
{
    public function test_contact_page_explains_if_telegram_delivery_is_configured(): void
    {
        config([
            'services.telegram.bot_token' => null,
            'services.telegram.chat_id' => null,
        ]);

        $this->get('/contact')->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Contact')
            ->where('telegramConfigured', false));
    }

    public function test_contact_message_is_sent_to_the_configured_telegram_chat(): void
    {
        config([
            'services.telegram.bot_token' => 'test-bot-token',
            'services.telegram.chat_id' => '123456789',
        ]);

        Http::preventStrayRequests();
        Http::fake([
            'api.telegram.org/*' => Http::response(['ok' => true]),
        ]);

        $response = $this->post('/contact', [
            'name' => 'Sokha Chan',
            'email' => 'sokha@example.com',
            'message' => 'I would like to book a test drive.',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Your message has been sent to our team. We will be in touch soon.');
        Http::assertSent(fn (HttpRequest $request) => $request['chat_id'] === '123456789'
            && $request['parse_mode'] === 'HTML'
            && str_contains($request['text'], 'Sokha Chan')
            && str_contains($request['text'], 'sokha@example.com')
            && str_contains($request['text'], 'I would like to book a test drive.'));
    }

    public function test_contact_message_is_not_reported_as_sent_when_telegram_is_unavailable(): void
    {
        config([
            'services.telegram.bot_token' => null,
            'services.telegram.chat_id' => null,
        ]);

        Http::preventStrayRequests();

        $response = $this->from('/contact')->post('/contact', [
            'name' => 'Sokha Chan',
            'email' => 'sokha@example.com',
            'message' => 'I would like to book a test drive.',
        ]);

        $response->assertSessionHasErrors('telegram');
        Http::assertNothingSent();
    }

    public function test_contact_message_requires_valid_contact_details(): void
    {
        Http::preventStrayRequests();

        $response = $this->from('/contact')->post('/contact', [
            'name' => '',
            'email' => 'not-an-email',
            'message' => '',
        ]);

        $response->assertSessionHasErrors(['name', 'email', 'message']);
        Http::assertNothingSent();
    }
}
