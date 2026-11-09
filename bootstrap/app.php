<?php

use App\Http\Middleware\AllowLocalFramePreview;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SecurityHeaders;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [HandleInertiaRequests::class, SecurityHeaders::class]);
        // Global (di luar grup web) agar berjalan SETELAH SecurityHeaders pada response; no-op selain APP_ENV=local.
        $middleware->append(AllowLocalFramePreview::class);
        // Provider pembayaran tidak punya token CSRF; webhook diverifikasi lewat callback token.
        $middleware->validateCsrfTokens(except: ['payments/webhook']);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
    })->create();
