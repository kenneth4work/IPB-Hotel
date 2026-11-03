<?php

return [
    'promo_code' => 'IPB2026',
    'promo_discount_percent' => 10,
    // Naikkan setiap kali isi S&K, refund, atau privasi berubah.
    'policy_version' => '2026-11-draft',
    // fake = simulator lokal (tidak pernah aktif di production), xendit = Xendit Invoice, none = nonaktif.
    'payment_gateway' => env('PAYMENT_GATEWAY', env('APP_ENV') === 'production' ? 'none' : 'fake'),
];
