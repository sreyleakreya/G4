<?php

namespace App\Http\Controllers;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contact', [
            'telegramConfigured' => filled(config('services.telegram.bot_token'))
                && filled(config('services.telegram.chat_id')),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        $botToken = config('services.telegram.bot_token');
        $chatId = config('services.telegram.chat_id');

        if (blank($botToken) || blank($chatId)) {
            return back()->withErrors([
                'telegram' => 'Message sending is temporarily unavailable. Please call us directly.',
            ]);
        }

        $messageLines = [
            '<b>G4 AUTO CARE</b> - New contact message',
            '------------------------------------',
            '<b>Customer:</b> '.$this->escapeTelegramText($validated['name']),
            '<b>Email:</b> '.$this->escapeTelegramText($validated['email']),
            '<b>Message:</b>',
            $this->escapeTelegramText($validated['message']),
        ];

        try {
            $response = Http::withOptions([
                'verify' => config('services.telegram.ca_bundle') ?: true,
            ])->asForm()
                ->connectTimeout(3)
                ->timeout(8)
                ->post("https://api.telegram.org/bot{$botToken}/sendMessage", [
                    'chat_id' => $chatId,
                    'text' => implode("\n", $messageLines),
                    'parse_mode' => 'HTML',
                ]);
        } catch (ConnectionException) {
            Log::warning('Telegram contact notification could not connect.');

            return back()->withErrors([
                'telegram' => 'We could not send your message. Please try again or call us directly.',
            ]);
        }

        if (! $response->successful() || $response->json('ok') !== true) {
            Log::warning('Telegram rejected a contact notification.', ['status' => $response->status()]);

            return back()->withErrors([
                'telegram' => 'We could not send your message. Please try again or call us directly.',
            ]);
        }

        return back()->with('success', 'Your message has been sent to our team. We will be in touch soon.');
    }

    private function escapeTelegramText(string $value): string
    {
        return htmlspecialchars(trim(strip_tags($value)), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }
}
