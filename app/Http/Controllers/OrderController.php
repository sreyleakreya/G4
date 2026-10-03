<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function showCheckout(Request $request): Response
    {
        $rawItems = $request->query('items');
        $decodedItems = is_string($rawItems) ? json_decode($rawItems, true) : null;
        $purchaseItems = [];

        if (is_array($decodedItems)) {
            foreach (array_slice($decodedItems, 0, 5) as $item) {
                if (
                    ! is_array($item)
                    || ! is_string($item['name'] ?? null)
                    || ! is_numeric($item['price'] ?? null)
                ) {
                    continue;
                }

                $purchaseItems[] = [
                    'id' => is_scalar($item['id'] ?? null) ? (string) $item['id'] : '',
                    'name' => trim($item['name']),
                    'price' => (float) $item['price'],
                    'quantity' => max(1, min(20, (int) ($item['quantity'] ?? 1))),
                ];
            }
        }

        return Inertia::render('Checkout', [
            'purchaseItems' => $purchaseItems,
            'telegramConfigured' => filled(config('services.telegram.bot_token'))
                && filled(config('services.telegram.chat_id')),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {        if (! auth()->check()) {
            return redirect()->route('register')->with('status', 'Please create an account to complete your vehicle request.');
        }
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'phone' => ['required', 'string', 'max:40'],
            'email' => ['required', 'email', 'max:255'],
            'address' => ['required', 'string', 'max:500'],
            'items' => ['nullable', 'array', 'max:5'],
            'items.*.id' => ['nullable', 'string', 'max:80'],
            'items.*.name' => ['required', 'string', 'max:255'],
            'items.*.price' => ['required', 'numeric', 'min:0', 'max:10000000'],
            'items.*.quantity' => ['required', 'integer', 'min:1', 'max:20'],
            'message' => ['required_without:items', 'nullable', 'string', 'max:1000'],
        ]);

        $botToken = config('services.telegram.bot_token');
        $chatId = config('services.telegram.chat_id');

        if (blank($botToken) || blank($chatId)) {
            return back()->withErrors([
                'telegram' => 'Telegram order delivery is not configured. Please contact us by phone.',
            ]);
        }

        $messageLines = [
            '<b>G4 AUTO CARE</b> - New purchase request',
            '------------------------------------',
            '<b>CUSTOMER</b>',
            'Customer: '.$this->singleLine($validated['name']),
            'Phone: '.$this->singleLine($validated['phone']),
            'Email: '.$this->singleLine($validated['email']),
            'Delivery location: '.$this->singleLine($validated['address']),
            '',
            '<b>ORDER DETAILS</b>',
        ];

        $estimatedTotal = 0;

        foreach ($validated['items'] ?? [] as $item) {
            $unitPrice = (float) $item['price'];
            $lineTotal = $unitPrice * (int) $item['quantity'];
            $estimatedTotal += $lineTotal;

            $messageLines[] = 'Vehicle: <b>'.$this->singleLine($item['name']).'</b>';
            $messageLines[] = 'Quantity: '.$item['quantity'];
            $messageLines[] = 'Listed unit price: $'.number_format($unitPrice, 2);
            $messageLines[] = 'Listed line total: $'.number_format($lineTotal, 2);
        }

        if (count($validated['items'] ?? []) > 0) {
            $messageLines[] = '------------------------------------';
            $messageLines[] = 'Estimated total (confirm with customer): $'.number_format($estimatedTotal, 2);
        }

        if (filled($validated['message'] ?? null)) {
            $messageLines[] = 'Additional details: '.$this->singleLine($validated['message']);
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
            Log::warning('Telegram purchase notification could not connect.');

            return back()->withErrors([
                'telegram' => 'Telegram could not be reached. Your request was not sent; please try again.',
            ]);
        }

        if (! $response->successful() || $response->json('ok') !== true) {
            Log::warning('Telegram rejected a purchase notification.', ['status' => $response->status()]);

            return back()->withErrors([
                'telegram' => 'Telegram could not accept your request. Please try again or contact us by phone.',
            ]);
        }

        return back();
    }

    public function userOrders(): Response
    {
        return Inertia::render('Account');
    }

    private function singleLine(string $value): string
    {
        return htmlspecialchars(
            trim(preg_replace('/[\r\n]+/', ' ', strip_tags($value)) ?? ''),
            ENT_QUOTES | ENT_SUBSTITUTE,
            'UTF-8',
        );
    }
}
