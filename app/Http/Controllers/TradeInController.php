<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class TradeInController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('TradeIn', [
            'telegramConfigured' => filled(config('services.telegram.bot_token'))
                && filled(config('services.telegram.chat_id')),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'phone' => ['required', 'string', 'max:40'],
            'vehicle' => ['required', 'string', 'max:160'],
            'year' => ['required', 'integer', 'min:1970', 'max:'.(now()->year + 1)],
            'mileage' => ['required', 'integer', 'min:0', 'max:2000000'],
            'condition' => ['required', 'in:excellent,good,fair,needs_repair'],
            'expected_price' => ['nullable', 'numeric', 'min:0', 'max:10000000'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $botToken = config('services.telegram.bot_token');
        $chatId = config('services.telegram.chat_id');

        if (blank($botToken) || blank($chatId)) {
            return back()->withErrors([
                'telegram' => 'Online valuation requests are temporarily unavailable. Please call us directly.',
            ]);
        }

        $messageLines = [
            '<b>G4 AUTO CARE</b> - New trade-in valuation request',
            '------------------------------------',
            '<b>CUSTOMER</b>',
            'Name: '.$this->escapeTelegramText($validated['name']),
            'Phone: '.$this->escapeTelegramText($validated['phone']),
            '',
            '<b>VEHICLE</b>',
            'Vehicle: '.$this->escapeTelegramText($validated['vehicle']),
            'Year: '.$validated['year'],
            'Mileage: '.number_format((int) $validated['mileage']).' km',
            'Condition: '.$this->escapeTelegramText(str_replace('_', ' ', $validated['condition'])),
        ];

        if (filled($validated['expected_price'] ?? null)) {
            $messageLines[] = 'Expected price: $'.number_format((float) $validated['expected_price'], 2);
        }

        if (filled($validated['notes'] ?? null)) {
            $messageLines[] = 'Additional details: '.$this->escapeTelegramText($validated['notes']);
        }

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
            Log::warning('Telegram trade-in notification could not connect.');

            return back()->withErrors([
                'telegram' => 'We could not send your request. Please try again or call us directly.',
            ]);
        }

        if (! $response->successful() || $response->json('ok') !== true) {
            Log::warning('Telegram rejected a trade-in notification.', ['status' => $response->status()]);

            return back()->withErrors([
                'telegram' => 'We could not send your request. Please try again or call us directly.',
            ]);
        }

        return back()->with('success', 'Your valuation request has been sent. Our team will call you soon.');
    }

    private function escapeTelegramText(string $value): string
    {
        return htmlspecialchars(trim(strip_tags($value)), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }
}
