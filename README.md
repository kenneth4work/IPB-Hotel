# IPB Convention Hotel

Laravel 13, Inertia 3, React 19, TypeScript, dan Tailwind CSS 4.

## Kebutuhan

- PHP 8.4.1–8.5 (sesuai composer.lock; framework Laravel 13 mendukung mulai 8.3) dengan ekstensi Laravel dan `pdo_mysql` (lokal saat setup: PHP 8.4.7).
- Composer 2.
- Node.js 20.19+ atau 22.12+ dan npm.
- SQLite untuk pengembangan lokal sementara; MySQL untuk deployment dengan pemesanan bersamaan.

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

Konfigurasi lokal sementara memakai SQLite di `database/database.sqlite`.
`.env` berisi path absolut ke file tersebut; file database dan `.env` diabaikan Git.
Untuk instalasi baru, buat file kosong `database/database.sqlite`, lalu jalankan:

```sh
php artisan migrate
php artisan db:seed --class=RoomTypeSeeder
```

Enam tipe kamar tersedia melalui seeder. Stok per tanggal perlu diisi sesuai
alokasi hotel, sehingga tidak ada jumlah kamar yang dibuat secara otomatis.
Lihat [panduan database](docs/database.md) untuk perintah pengisian stok.

Untuk beralih ke MySQL, ubah `DB_CONNECTION=mysql`, isi `DB_HOST`, `DB_PORT`,
`DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` di `.env`, lalu jalankan
`php artisan config:clear`, migrasi, dan seeder pada database MySQL yang baru.
Data SQLite tidak otomatis dipindahkan. Gunakan MySQL untuk produksi; penguncian
baris pada service reservasi ditujukan untuk MySQL/InnoDB.

Session dan cache tetap berbasis file; queue memakai `sync`.

## Struktur

- `routes/web.php`: route Laravel; `/` merender halaman Inertia `Home`.
- `resources/views/app.blade.php`: HTML, metadata, dan pemuatan aset Vite.
- `src/main.tsx`: entry point Inertia dan React.
- `src/pages/Home.tsx`: halaman yang memakai `src/App.tsx` lama.
- `src/components`, `src/data`, `src/assets`: tampilan dan konten yang ada.
- `public`: aset statis dan entry point Laravel.

Form reservasi memuat tipe kamar dari database dan meminta quote ke backend.
Harga, promo, biaya sarapan, kode booking, serta hold stok diproses server.
Submit menyimpan reservasi pending beserta rincian malam. WhatsApp dipakai untuk
menghubungi hotel; inquiry kontak masih memakai alur WhatsApp. Gateway pembayaran
belum diintegrasikan. Panduan Windows tersedia di `output/pdf/panduan-setup-ipb-hotel.pdf`.

Endpoint web dengan session/CSRF:
- `GET /booking/room-types`: katalog tipe kamar aktif.
- `POST /booking/quote`: harga dan ketersediaan; tidak menahan stok.
- `POST /reservations`: simpan hold; wajib `request_id` UUID dan `expected_total`.

Permintaan ulang dengan UUID dan data yang sama mengembalikan booking yang sudah
tersimpan. UUID yang sama untuk data berbeda ditolak. Harga dan stok dicek ulang
saat submit; jika harga berubah, tamu harus memeriksa harga terbaru.

## Verifikasi

```sh
composer test
npm run lint
npm run build
```

Document root hosting harus mengarah ke `public/`. Pada deployment, gunakan
`APP_DEBUG=false`, isi environment server, dan jalankan build frontend.
