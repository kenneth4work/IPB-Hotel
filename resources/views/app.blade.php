<!doctype html>
<html lang="id" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script>
      // Default mode terang. Mode gelap hanya jika pengunjung pernah memilihnya (lihat ThemeContext.tsx);
      // dipasang sebelum render agar tidak berkedip.
      (function () {
        var dark = false;
        try { dark = localStorage.getItem('ipb_hotel_theme_preference') === 'dark'; } catch (e) {}
        if (dark) document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
      })();
    </script>
    <title>IPB Convention Hotel - Di Jantung Kota Bogor</title>
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png?v=2" />
    <link rel="icon" type="image/png" sizes="512x512" href="/images/favicon-512.png?v=2" />
    <link rel="apple-touch-icon" href="/images/favicon-180.png?v=2" />
    <meta name="description" content="Website resmi IPB Convention Hotel Bogor - Di Jantung Kota Bogor. Pilihan akomodasi dan convention bergengsi di kawasan Botani Square." />
    <meta property="og:title" content="IPB Convention Hotel - Di Jantung Kota Bogor" />
    <meta property="og:description" content="Website resmi IPB Convention Hotel Bogor - Di Jantung Kota Bogor. Pilihan akomodasi dan convention bergengsi di kawasan Botani Square." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    @if (request()->routeIs('home'))
      {{-- Foto hero dipasang lewat CSS background oleh React; preload agar unduhan mulai sebelum JS selesai. --}}
      <link rel="preload" as="image" href="{{ Vite::asset('src/assets/images/suite-1.jpg') }}" fetchpriority="high" />
    @endif
    @viteReactRefresh
    @vite('src/main.tsx')
    <x-inertia::head />
  </head>
  <body class="bg-[#FDFBF7] text-slate-800 antialiased selection:bg-[#C5A880]/30 selection:text-slate-900">
    <x-inertia::app />
  </body>
</html>

