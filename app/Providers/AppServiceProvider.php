<?php

namespace App\Providers;

use App\Payments\FakePaymentGateway;
use App\Payments\PaymentGateway;
use App\Payments\XenditPaymentGateway;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Driver pembayaran dipilih dari config('booking.payment_gateway').
        $this->app->bind(PaymentGateway::class, fn ($app) => match (config('booking.payment_gateway')) {
            'xendit' => new XenditPaymentGateway(
                (string) config('services.xendit.secret_key'),
                (string) config('services.xendit.callback_token'),
                (string) config('services.xendit.base_url'),
            ),
            'fake' => new FakePaymentGateway(enabled: ! $app->isProduction()),
            default => new FakePaymentGateway(enabled: false),
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
