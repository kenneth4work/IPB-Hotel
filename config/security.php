<?php

return [

    /*
    | Proxy/tunnel yang dipercaya (ngrok, load balancer) agar URL asset & redirect memakai
    | https dan host publik. Kosong = tidak ada. "*" = semua; isi hanya jika server memang
    | hanya bisa dicapai lewat proxy, karena header X-Forwarded-For dipakai untuk rate limit.
    */
    'trusted_proxies' => env('TRUSTED_PROXIES'),

    /*
    | Izin iframe untuk preview lokal (VS Code Simple Browser / Live Preview).
    | Hanya aktif jika APP_ENV=local. Catatan: wildcard "*" pada frame-ancestors
    | TIDAK mencakup skema non-http seperti vscode-webview:, jadi skema itu harus ditulis eksplisit.
    */
    'frame_preview' => [
        'enabled' => env('FRAME_PREVIEW_ENABLED', true),

        'ancestors' => array_values(array_filter(array_map('trim', explode(' ', env(
            'FRAME_PREVIEW_ANCESTORS',
            "'self' vscode-webview: vscode-file: http://localhost:* http://127.0.0.1:* http://*.test https://*.test"
        ))))),
    ],

];
