# IPB Convention Hotel

Laravel 13, Inertia 3, React 19, TypeScript, dan Tailwind CSS 4.

## Kebutuhan

- PHP 8.3–8.5 dengan ekstensi Laravel dan `pdo_mysql` (lokal saat setup: PHP 8.4.7).
- Composer 2.
- Node.js 20.19+ atau 22.12+ dan npm.
- MySQL untuk tahap penyimpanan data reservasi.

## Setup

```sh
composer setup
composer dev
```

Buka http://localhost:8000. Vite hanya menyediakan aset dan hot reload;
akses aplikasi melalui server Laravel, bukan port Vite.

`composer setup` memasang dependency, membuat `.env` jika belum ada,
menghasilkan application key, dan membangun frontend. Jalankan hanya pada
instalasi baru karena perintah ini menghasilkan ulang application key.

Untuk instalasi manual:

```sh
composer install
cp .env.example .env
php artisan key:generate
npm ci
npm run build
php artisan serve
```

## Database

`.env.example` menggunakan koneksi MySQL dengan nama database `ipb_hotel`.
Isi `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD`
di `.env` sesuai server lokal. Setelah database tersedia:

```sh
php artisan migrate
```

Halaman awal memakai session dan cache berbasis file, serta queue `sync`,
sehingga dapat dijalankan sebelum MySQL terhubung. Migrasi bawaan Laravel
tersedia; skema kamar, reservasi, dan pembayaran belum dibuat.

## Struktur

- `routes/web.php`: route Laravel; `/` merender halaman Inertia `Home`.
- `resources/views/app.blade.php`: HTML, metadata, dan pemuatan aset Vite.
- `src/main.tsx`: entry point Inertia dan React.
- `src/pages/Home.tsx`: halaman yang memakai `src/App.tsx` lama.
- `src/components`, `src/data`, `src/assets`: tampilan dan konten yang ada.
- `public`: aset statis dan entry point Laravel.

Form reservasi dan inquiry masih menggunakan simulasi frontend dan WhatsApp.
Tahap ini belum menyimpan booking atau memproses pembayaran.

## Verifikasi

```sh
composer test
npm run lint
npm run build
```

Document root hosting harus mengarah ke `public/`. Pada deployment, gunakan
`APP_DEBUG=false`, isi environment server, dan jalankan build frontend.
