<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Mengizinkan halaman di-embed dalam iframe (mis. Simple Browser / Live Preview VS Code)
 * HANYA saat APP_ENV=local dan FRAME_PREVIEW_ENABLED=true. Di environment lain tidak melakukan apa pun,
 * sehingga proteksi clickjacking dari SecurityHeaders tetap berlaku.
 */
class AllowLocalFramePreview
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (! app()->isLocal() || ! config('security.frame_preview.enabled')) {
            return $response;
        }

        // "ALLOWALL" bukan nilai resmi X-Frame-Options (browser mengabaikannya / tidak konsisten),
        // jadi header dihapus dan izin framing diatur lewat CSP frame-ancestors.
        $response->headers->remove('X-Frame-Options');

        $ancestors = implode(' ', config('security.frame_preview.ancestors', ["'self'"]));
        $csp = $response->headers->get('Content-Security-Policy');

        $csp = $csp && preg_match('/frame-ancestors[^;]*/i', $csp)
            ? preg_replace('/frame-ancestors[^;]*/i', "frame-ancestors {$ancestors}", $csp)
            : trim(($csp ? rtrim($csp, '; ').'; ' : '')."frame-ancestors {$ancestors}");

        $response->headers->set('Content-Security-Policy', $csp);

        return $response;
    }
}
