from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, Preformatted, KeepTogether
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4

BASE = Path(__file__).resolve().parents[1]
OUT = BASE / 'output/pdf/panduan-setup-ipb-hotel.pdf'
FONTS = Path('/System/Library/Fonts/Supplemental')
for name, filename in [('Body','Arial.ttf'),('Bold','Arial Bold.ttf'),('Mono','Courier New Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(FONTS / filename)))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='Bold', italic='Body', boldItalic='Bold')
GREEN=colors.HexColor('#163F32'); GOLD=colors.HexColor('#9B743F'); INK=colors.HexColor('#24332D'); LIGHT=colors.HexColor('#EFF5F1'); BORDER=colors.HexColor('#D6E1D9')
styles={
 'title':ParagraphStyle('title',fontName='Bold',fontSize=23,leading=28,textColor=GREEN,spaceAfter=14),
 'h':ParagraphStyle('h',fontName='Bold',fontSize=12,leading=16,textColor=GREEN,spaceBefore=12,spaceAfter=6),
 'p':ParagraphStyle('p',fontName='Body',fontSize=10,leading=14.5,textColor=INK,spaceAfter=8),
 'small':ParagraphStyle('small',fontName='Body',fontSize=8.5,leading=12,textColor=INK,spaceAfter=6),
 'code':ParagraphStyle('code',fontName='Mono',fontSize=8.5,leading=11.3,textColor=INK,backColor=LIGHT,borderColor=BORDER,borderWidth=.5,borderPadding=10,spaceBefore=4,spaceAfter=12),
 'label':ParagraphStyle('label',fontName='Bold',fontSize=8.5,leading=12,textColor=GOLD,spaceAfter=7),
}
story=[]
def p(text, small=False): story.append(Paragraph(text,styles['small' if small else 'p']))
def h(text): story.append(Paragraph(text,styles['h']))
def code(text):
    t=Table([[Preformatted(text,styles['code'])]],colWidths=[A4[0]-88])
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),LIGHT),('BOX',(0,0),(-1,-1),.5,BORDER),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
    story.extend([t,Spacer(1,10)])
def note(text):
    t=Table([[Paragraph(text,styles['small'])]],colWidths=[A4[0]-88])
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),colors.HexColor('#FBF5E9')),('BOX',(0,0),(-1,-1),.5,colors.HexColor('#DFCFB5')),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),4)]));story.extend([t,Spacer(1,10)])
def page(n,title,subtitle):
    if story:story.append(PageBreak())
    story.append(Paragraph(f'PANDUAN TIM / {n:02d}',styles['label']))
    story.append(Paragraph(title,styles['title']))
    p(subtitle)
def table(rows,widths):
    data=[[Paragraph(escape(str(x)), styles['small']) for x in row] for row in rows]
    t=Table(data,colWidths=widths,hAlign='LEFT',repeatRows=1)
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),LIGHT),('VALIGN',(0,0),(-1,-1),'TOP'),('LINEBELOW',(0,0),(-1,0),.8,GREEN),('LINEBELOW',(0,1),(-1,-1),.3,BORDER),('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),5)]))
    story.extend([t,Spacer(1,9)])

page(1,'Menjalankan IPB Hotel\nversi Laravel','Panduan Windows + Laragon untuk anggota tim yang masih memakai versi React/Vite lama. Disusun 27 Oktober 2026.')
note('<b>Sebelum mulai:</b> perubahan Laravel berada di branch <b>feature/laravel13-react</b> dan pada saat panduan disusun belum tersedia di remote GitHub. Maintainer perlu commit serta push branch itu terlebih dahulu. Pull dari <b>main</b> saja masih dapat menghasilkan versi React lama.')
h('Apa yang berubah?')
p('Website tetap memakai React 19, tetapi sekarang dijalankan melalui Laravel 13 dan Inertia 3. Laravel menyimpan reservasi, memvalidasi stok, menghitung harga, serta membuat kode booking. Tampilan tidak lagi dibuka sebagai index.html atau melalui server Vite saja.')
table([['Bagian','Versi / pilihan','Fungsi'],['Backend','Laravel 13','Routing, validasi, harga, booking'],['Frontend','React 19 + Inertia 3 + Vite 7','Tampilan dan hot reload'],['PHP','8.5 disarankan; minimal 8.4.1 untuk lock saat ini','Menjalankan dependency proyek'],['Database lokal','SQLite sementara atau MySQL Laragon','Penyimpanan data hotel'],['Node.js','24 LTS disarankan','Build aset; versi engine sesuai package.json']], [92,190,225])
h('Pilihan tercepat')
p('<b>SQLite:</b> tidak memerlukan server MySQL, username, atau password. Cocok untuk mulai bekerja lokal. <b>MySQL:</b> gunakan service MySQL Laragon jika ingin lingkungan yang lebih dekat dengan produksi.')
h('Urutan kerja')
p('Siapkan alat Windows -> amankan perubahan lama -> ambil branch Laravel -> composer install dan npm ci -> buat .env -> pilih database -> migrate dan seed -> jalankan Laravel + Vite.')
p('Payment gateway belum terhubung. Reservasi yang tersimpan masih berstatus pending dan stok ditahan selama 30 menit. Stok nyata per tanggal belum otomatis dibuat.',small=True)

page(2,'Siapkan Windows dan Laragon','Gunakan terminal PowerShell di folder proyek. Jika memakai terminal Laragon berbasis CMD, buka PowerShell di lokasi yang sama agar perintah panduan ini sesuai.')
h('1. Instal alat yang diperlukan')
p('<b>Laragon:</b> instal dari situs resmi, misalnya di C:\\laragon. Pilih PHP yang sesuai melalui menu versi PHP pada instalasi Laragon. PHP 8.5 stabil disarankan; PHP 8.4.1 atau lebih baru pada seri 8.4 juga sesuai dengan lockfile saat ini.')
p('<b>Composer 2:</b> instal Composer untuk Windows dan arahkan ke php.exe milik PHP Laragon yang dipilih. Setelah instalasi atau pergantian PATH, tutup dan buka kembali terminal.')
p('<b>Node.js 24 LTS + npm:</b> instal dari situs Node.js. Instal juga <b>Git for Windows</b> jika perintah git belum tersedia. Untuk database MySQL, aktifkan service yang disediakan Laragon.')
h('2. Pastikan terminal memakai alat yang benar')
code('where.exe php\nphp -v\nphp --ini\ncomposer --version\nnode -v\nnpm -v\ngit --version')
p('Jika PHP yang muncul masih versi lama, perbaiki pilihan versi Laragon / PATH. Versi PHP terminal dan web server bisa berbeda; periksa keduanya jika memakai domain .test.')
h('3. Periksa ekstensi PHP')
code('php -m')
p('Pastikan ekstensi kebutuhan Laravel tersedia, termasuk ctype, curl, dom, fileinfo, filter, hash, mbstring, openssl, pcre, PDO, session, tokenizer, xml dan zip. SQLite memerlukan <b>pdo_sqlite</b> / sqlite3; MySQL memerlukan <b>pdo_mysql</b>. Edit php.ini yang ditunjukkan php --ini, lalu mulai ulang service/terminal bila perlu.',small=True)
note('<b>Tidak perlu membuat proyek Laravel baru.</b> composer install akan memasang framework ke folder vendor dari composer.lock. Jangan jalankan laravel new, composer create-project, atau Laragon Quick app di atas folder IPB-Hotel yang sudah ada. Laravel installer global tidak wajib.')

page(3,'Ambil versi kode yang benar','Repository: https://github.com/kenneth4work/IPB-Hotel. Contoh nama folder di bawah: C:\\laragon\\www\\IPB-Hotel.')
h('A. Jika sudah punya folder proyek lama')
code('Set-Location C:\\laragon\\www\\IPB-Hotel\ngit status\ngit branch --show-current\ngit remote -v')
p('Jika ada file berubah, simpan lebih dulu pada branch pribadi atau stash. Perintah berikut menyimpan perubahan tracked dan file baru. File ignored seperti .env tidak ikut stash; salin .env lama secara pribadi jika perlu.')
code('git stash push -u -m "backup lokal sebelum migrasi Laravel"\ngit fetch origin\ngit branch -r')
p('Setelah branch remote origin/feature/laravel13-react tersedia, gunakan salah satu:')
code('# Jika branch lokal belum ada:\ngit switch --track origin/feature/laravel13-react\n\n# Jika branch lokal sudah ada:\ngit switch feature/laravel13-react\ngit pull --ff-only origin feature/laravel13-react')
p('Jangan langsung stash pop ke versi baru: review dahulu karena file bootstrap, package.json, dan struktur proyek telah berubah. Stash tetap tersimpan dan dapat diperiksa dengan git stash list / git stash show -p.',small=True)
h('B. Jika belum pernah clone')
code('Set-Location C:\\laragon\\www\ngit clone --branch feature/laravel13-react https://github.com/kenneth4work/IPB-Hotel.git\nSet-Location IPB-Hotel')
note('Jika remote branch belum ditemukan, hentikan langkah checkout dan minta maintainer mempublikasikan branch tersebut. Jika migrasi sudah digabung ke main, gunakan main sesuai arahan tim. Jangan menghapus folder lama atau memakai reset --hard untuk memaksa update.')
p('Di versi yang benar harus ada artisan, composer.json, composer.lock, routes, app dan database/migrations. index.html lama bukan entry point aplikasi Laravel.',small=True)

page(4,'Pasang dependency dan database','Jalankan langkah ini dari root proyek, yaitu folder yang berisi artisan dan composer.json.')
h('1. Pasang Laravel dari lockfile dan dependency React')
code('composer install\ncomposer check-platform-reqs\nnpm ci')
p('Gunakan install/ci, bukan composer update atau npm update, agar versi paket mengikuti lockfile tim. Folder vendor dan node_modules tidak perlu dikirim teman lain dan tidak masuk Git.')
h('2. Buat .env hanya jika belum ada')
code('if (-not (Test-Path .env)) {\n    Copy-Item .env.example .env\n}')
p('Jika .env lama berasal dari React/AI Studio, sesuaikan dengan template pada halaman berikut. Hapus konfigurasi DB_URL lama yang menunjuk ke database lain. Jangan menyalin APP_KEY atau password dari komputer teman.')
h('3. Buat file SQLite tanpa menimpa file yang sudah ada')
code('if (-not (Test-Path database/database.sqlite)) {\n    New-Item database/database.sqlite -ItemType File\n}')
p('Isi .env seperti halaman 5. Path file SQLite Windows harus sesuai folder di komputermu. Gunakan slash / agar mudah dibaca dotenv.')
h('4. Inisialisasi key dan skema')
code('# Hanya jika APP_KEY masih kosong pada instalasi baru:\nphp artisan key:generate\n\nphp artisan config:clear\nphp artisan migrate\nphp artisan db:seed --class=RoomTypeSeeder\nphp artisan migrate:status')
note('Jangan generate ulang APP_KEY yang sudah terpakai. Jangan jalankan migrate:fresh, migrate:refresh, atau db:wipe pada database yang berisi data yang ingin disimpan. migrate biasa hanya menerapkan migrasi yang belum dijalankan.')
p('Seed membuat enam tipe kamar tanpa akun admin fiktif, nomor kamar, atau stok harian. Seed boleh diulang dan tidak menimpa tarif tipe kamar yang sudah diedit.',small=True)

page(5,'Contoh .env untuk SQLite','Template minimum yang bisa dipakai lokal. Ganti DB_DATABASE jika lokasi foldermu berbeda. APP_KEY dibiarkan kosong sampai menjalankan php artisan key:generate.')
SQLITE_ENV='''APP_NAME="IPB Convention Hotel"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

APP_LOCALE=id
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=id_ID
APP_MAINTENANCE_DRIVER=file
BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_LEVEL=debug

DB_CONNECTION=sqlite
DB_DATABASE="C:/laragon/www/IPB-Hotel/database/database.sqlite"
DB_FOREIGN_KEYS=true

SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

CACHE_STORE=file
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=local
BROADCAST_CONNECTION=log

MAIL_MAILER=log
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

VITE_APP_NAME="${APP_NAME}"'''
code(SQLITE_ENV)
p('DB_HOST, DB_PORT, DB_USERNAME dan DB_PASSWORD tidak dibutuhkan oleh SQLite. Jangan biarkan DB_URL aktif menunjuk ke server lama. Setelah mengedit .env, jalankan php artisan config:clear dan restart php artisan serve.',small=True)
note('.env dan database.sqlite tidak ikut Git. APP_DEBUG=true hanya untuk lokal; deployment publik harus memakai APP_DEBUG=false. Setiap komputer membuat key dan database lokalnya sendiri.')

page(6,'Alternatif: MySQL lewat Laragon','Gunakan halaman ini jika ingin mengganti SQLite dengan MySQL. Aplikasi Laravel tetap dapat dijalankan melalui php artisan serve.')
h('1. Nyalakan MySQL dan buat database')
p('Buka Laragon, jalankan service MySQL (atau Start All), lalu buka database manager yang tersedia. Pastikan host, port, username dan password sesuai instalasimu. Jangan menganggap semua instalasi memakai password kosong.')
p('Jalankan SQL berikut pada server MySQL yang benar:')
code('CREATE DATABASE ipb_hotel\n  CHARACTER SET utf8mb4\n  COLLATE utf8mb4_unicode_ci;')
h('2. Ganti blok DB di .env halaman 5')
MYSQL_ENV='''DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ipb_hotel
DB_USERNAME=root
DB_PASSWORD="ISI_PASSWORD_MYSQL_LOKAL"'''
code(MYSQL_ENV)
p('Ganti placeholder password dengan password sebenarnya di file lokal. Jika akun lokal memang tanpa password, gunakan DB_PASSWORD= saja. Jika port bukan 3306 atau user bukan root, sesuaikan. Jangan commit nilai asli atau mengirimkannya lewat chat.')
h('3. Terapkan skema pada database MySQL')
code('php artisan config:clear\nphp artisan migrate\nphp artisan db:seed --class=RoomTypeSeeder\nphp artisan migrate:status')
note('Mengganti koneksi tidak memindahkan isi SQLite ke MySQL. Database MySQL akan memiliki data terpisah. Migrasi membuat struktur; seed membuat tipe kamar. Pemindahan data reservasi yang sudah ada perlu dikerjakan tersendiri.')
h('Opsional: memakai domain Laragon .test')
p('Jika menggunakan http://ipb-hotel.test, arahkan document root virtual host ke <b>C:/laragon/www/IPB-Hotel/public</b>, bukan root proyek. Sesuaikan APP_URL, lalu reload Laragon. Jangan mengakses atau menyajikan .env lewat web server. Cara termudah untuk setup awal tetap URL 127.0.0.1:8000.',small=True)

page(7,'Jalankan dan cek alur reservasi','Frontend dibuka melalui Laravel. Server Vite hanya menyiapkan aset dan hot reload, bukan URL utama aplikasi.')
h('Pilihan A: pengembangan dengan hot reload')
code('# Dari root proyek:\ncomposer dev')
p('Perintah ini menjalankan Laravel dan Vite bersama. Biarkan terminal aktif. Jika ingin memisahkan proses, gunakan dua terminal:')
code('# Terminal 1:\nphp artisan serve --host=127.0.0.1 --port=8000\n\n# Terminal 2:\nnpm run dev')
h('Pilihan B: menjalankan hasil build')
code('npm run build\nphp artisan serve --host=127.0.0.1 --port=8000')
p('Buka <b>http://127.0.0.1:8000</b>. Jika baru berganti dari Vite ke mode build dan aplikasi masih meminta server Vite yang sudah mati, hapus public/hot yang tertinggal, lalu muat ulang halaman.')
h('Isi stok agar form dapat menerima booking')
p('Tanpa stok tanggal, form menampilkan kamar belum tersedia dan tombol booking tidak aktif. Contoh berikut hanya untuk data pengembangan yang disetujui tim; ganti tanggal dan jumlahnya dengan alokasi yang benar. Tanggal akhir tidak ikut dihitung.')
code('php artisan hotel:inventory deluxe 2026-11-01 2026-11-08 --rooms=2\nphp artisan hotel:inventory suite 2026-11-01 2026-11-08 --rooms=1')
p('Sesuaikan tanggal agar tidak di masa lalu. Jangan membuat stok percobaan pada database produksi. Seed tidak otomatis menambahkan stok untuk semua tanggal.',small=True)
h('Perilaku yang perlu terlihat')
p('Form memuat kamar dari database; estimasi dan promo dihitung backend; submit menyimpan reservasi pending dan rincian malam; kode IPB dibuat server; stok di-hold 30 menit. Quote tidak menahan stok. Jika harga berubah sebelum submit, tamu diminta memeriksa harga lagi. Pembayaran online belum diaktifkan.')

page(8,'Update berikutnya dan aturan tim','Lakukan update pada branch yang disepakati. Simpan data lokal dan perubahan kode sebelum menarik update.')
h('Rutinitas mengambil update')
code('git status\ngit fetch origin\ngit pull --ff-only origin feature/laravel13-react\ncomposer install\nnpm ci\nphp artisan config:clear\nphp artisan migrate\nphp artisan db:seed --class=RoomTypeSeeder\nnpm run build')
p('Jika git status tidak bersih, commit pada branch pribadi atau stash lebih dulu seperti halaman 3. Jika pull --ff-only gagal karena riwayat bercabang, minta review merge/rebase; jangan langsung melakukan reset --hard. Tidak perlu key:generate pada update rutin.')
h('Pengecekan sebelum mengirim perubahan')
code('composer test\nnpm run lint\nnpm run build\ngit status')
p('Tes default menggunakan SQLite in-memory terpisah dari database.sqlite lokal. Perhatikan konfigurasi phpunit.xml dan jangan menunjuk database testing ke database operasional.')
h('Apa yang dibagikan melalui Git?')
table([['Ikut Git','Tidak ikut Git'],['Kode PHP/React, migrations, seeders, routes','.env berisi key/password asli'],['composer.json + composer.lock','vendor dan node_modules'],['package.json + package-lock.json','database.sqlite dan data operasional'],['.env.example tanpa secret','public/build, public/hot, cache dan log lokal']], [253,254])
h('Catatan bagi maintainer sebelum temanmu mengikuti panduan')
p('Panduan dan perubahan backend harus masuk commit lalu dipush ke branch yang disebutkan. Sampai itu dilakukan, perintah pull dari komputer teman tidak akan mengambil perubahan lokal ini. Jika nama branch berubah atau sudah merge ke main, beri tahu tim agar langkah checkout disesuaikan.')

page(9,'Jika menemui kendala','Mulai dari pesan error pertama. Cocokkan terminal PHP, file .env, driver database, dan branch Git sebelum mengubah dependency.')
table([['Gejala','Tindakan'],['artisan / composer.json tidak ada','Root folder atau branch salah. Periksa git branch -r dan branch migrasi.'],['PHP version / platform requirement gagal','Pilih PHP 8.5 atau PHP >=8.4.1 yang cocok. Cek where.exe php dan php --ini. Jangan gunakan --ignore-platform-reqs.'],['could not find driver','Aktifkan pdo_sqlite atau pdo_mysql pada PHP terminal yang dipakai; restart proses.'],['SQLite file does not exist','Buat file kosong dan perbaiki path absolut DB_DATABASE; jangan menimpa file berisi data.'],['Access denied / connection refused MySQL','Periksa service Laragon, port, user, password dan .env. Jalankan config:clear.'],['Vite manifest not found / halaman tanpa aset','Jalankan npm ci lalu npm run build, atau biarkan npm run dev aktif. Akses port Laravel.'],['No application encryption key','APP_KEY kosong: jalankan key:generate pada instalasi baru saja.'],['419 / session expired','Muat ulang halaman dan gunakan origin yang sama. Periksa APP_URL dan cookie. Jangan mencampur localhost, 127.0.0.1 dan domain .test.'],['Tombol booking nonaktif / stok tidak tersedia','Isi stok untuk seluruh malam; periksa kapasitas tamu, tipe kasur, dan pesan harga/ketersediaan.'],['429 / terlalu banyak percobaan','Tunggu satu menit sebelum mencoba lagi.'],['Port 8000 terpakai','Hentikan server duplikat atau pilih --port=8001 dan sesuaikan APP_URL.']], [165,342])
h('Referensi resmi')
for title,url in [
 ('Laravel 13: instalasi dan kebutuhan lingkungan','https://laravel.com/docs/13.x/installation'),
 ('Laravel 13: versi PHP framework','https://laravel.com/docs/13.x/releases'),
 ('Composer: instalasi Windows','https://getcomposer.org/doc/00-intro.md#installation-windows'),
 ('Node.js: unduhan LTS','https://nodejs.org/en/download'),
 ('Laragon: dokumentasi dan service lokal','https://laragon.org/docs/quick-start'),
 ('Laragon: virtual host / pretty URLs','https://laragon.org/docs/pretty-urls'),
]:p(f'<a href="{url}" color="#163F32">{escape(title)}</a>',small=True)
p('Acuan proyek: composer.lock, package.json, .env.example, README.md, docs/database.md, routes/web.php dan service reservasi. Status kode berlaku saat panduan dibuat; periksa update tim sebelum setup.',small=True)

def footer(canvas,doc):
    canvas.saveState();w,h=A4
    canvas.setStrokeColor(BORDER);canvas.line(44,39,w-44,39)
    canvas.setFont('Body',8);canvas.setFillColor(GREEN)
    canvas.drawString(44,25,'IPB HOTEL / PANDUAN SETUP LOKAL')
    canvas.drawRightString(w-44,25,f'{doc.page} / 9  |  27 Oktober 2026')
    canvas.restoreState()
OUT.parent.mkdir(parents=True,exist_ok=True)
doc=SimpleDocTemplate(str(OUT),pagesize=A4,rightMargin=44,leftMargin=44,topMargin=42,bottomMargin=54,title='Panduan Setup Lokal IPB Hotel - Laravel, Laragon, SQLite dan MySQL',author='Tim IPB Hotel')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
(BASE/'docs/env.sqlite.windows.example').write_text(SQLITE_ENV+'\n')
(BASE/'docs/env.mysql.windows.example').write_text(SQLITE_ENV.replace('DB_CONNECTION=sqlite\nDB_DATABASE="C:/laragon/www/IPB-Hotel/database/database.sqlite"\nDB_FOREIGN_KEYS=true',MYSQL_ENV)+'\n')
print(OUT)
