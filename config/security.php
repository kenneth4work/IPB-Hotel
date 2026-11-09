<?php

return [

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
