import { Language } from './translations';

export type LegalPageId = 'privacy' | 'terms' | 'refund' | 'cookies';

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface LegalDocument {
  title: string;
  sections: LegalSection[];
}

// Ubah ke false hanya setelah seluruh teks {{...}} terisi dan ditinjau penasihat hukum.
export const LEGAL_DRAFT = true;

export const LEGAL_ROUTES: Record<LegalPageId, string> = {
  privacy: '/kebijakan-privasi',
  terms: '/syarat-ketentuan',
  refund: '/kebijakan-refund',
  cookies: '/kebijakan-cookie',
};

export const LEGAL_UI: Record<Language, {
  privacy: string;
  terms: string;
  refund: string;
  cookies: string;
  cookieSettings: string;
  lastUpdated: string;
  lastUpdatedValue: string;
  draftNotice: string;
  bannerTitle: string;
  bannerText: string;
  accept: string;
  reject: string;
  mapTitle: string;
  mapText: string;
  mapLoad: string;
  mapOpen: string;
  consentPrefix: string;
  consentAnd: string;
  consentMiddle: string;
  consentSuffix: string;
  consentError: string;
  sensitiveHint: string;
}> = {
  id: {
    privacy: 'Kebijakan Privasi',
    terms: 'Syarat & Ketentuan',
    refund: 'Kebijakan Refund',
    cookies: 'Kebijakan Cookie',
    cookieSettings: 'Pengaturan Cookie',
    lastUpdated: 'Terakhir diperbarui:',
    lastUpdatedValue: '{{tanggal berlaku}}',
    draftNotice: 'Draf - dokumen ini belum final. Bagian yang ditandai masih menunggu konfirmasi hotel dan tinjauan penasihat hukum.',
    bannerTitle: 'Pilihan Cookie',
    bannerText: 'Cookie penting selalu aktif agar situs dan reservasi berjalan. Peta Google hanya dimuat jika Anda setuju, karena Google dapat memproses data seperti alamat IP Anda.',
    accept: 'Izinkan Google Maps',
    reject: 'Hanya Cookie Penting',
    mapTitle: 'Peta belum dimuat',
    mapText: 'Peta interaktif berasal dari Google dan dapat menyimpan cookie serta menerima alamat IP Anda.',
    mapLoad: 'Izinkan & Muat Peta',
    mapOpen: 'Buka di Google Maps',
    consentPrefix: 'Saya menyetujui',
    consentAnd: 'dan',
    consentMiddle: ', serta telah membaca',
    consentSuffix: '.',
    consentError: 'Anda perlu menyetujui ketentuan ini untuk melanjutkan.',
    sensitiveHint: 'Jangan cantumkan data sensitif seperti informasi kesehatan, kecuali memang diperlukan untuk menginap.',
  },
  en: {
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    refund: 'Refund Policy',
    cookies: 'Cookie Policy',
    cookieSettings: 'Cookie Settings',
    lastUpdated: 'Last updated:',
    lastUpdatedValue: '{{effective date}}',
    draftNotice: 'Draft - this document is not final. Highlighted items await hotel confirmation and legal review.',
    bannerTitle: 'Cookie Choices',
    bannerText: 'Essential cookies are always on so the site and bookings work. Google Maps only loads if you agree, because Google may process data such as your IP address.',
    accept: 'Allow Google Maps',
    reject: 'Essential Cookies Only',
    mapTitle: 'Map not loaded',
    mapText: 'The interactive map comes from Google, which may set cookies and receive your IP address.',
    mapLoad: 'Allow & Load Map',
    mapOpen: 'Open in Google Maps',
    consentPrefix: 'I agree to the',
    consentAnd: 'and',
    consentMiddle: ', and I have read the',
    consentSuffix: '.',
    consentError: 'You need to accept these terms to continue.',
    sensitiveHint: 'Please do not include sensitive data such as health information unless it is needed for your stay.',
  },
};

export const LEGAL_PAGES: Record<Language, Record<LegalPageId, LegalDocument>> = {
  id: {
    privacy: {
      title: 'Kebijakan Privasi',
      sections: [
        {
          heading: 'Siapa kami',
          paragraphs: ['Website ini dikelola oleh {{nama badan hukum pengelola hotel}}, {{alamat terdaftar}}, sebagai pengendali data pribadi untuk reservasi yang dibuat di sini.'],
        },
        {
          heading: 'Data yang kami kumpulkan',
          bullets: [
            'Data kontak: nama lengkap, alamat email, dan nomor WhatsApp.',
            'Data reservasi: tanggal menginap, tipe kamar, tipe kasur, jumlah tamu dan kamar, pilihan sarapan, total biaya, dan kode booking.',
            'Permintaan khusus yang Anda tulis sendiri.',
            'Catatan persetujuan: waktu dan versi kebijakan yang Anda setujui.',
            'Data teknis yang diperlukan untuk keamanan, seperti cookie sesi.',
          ],
        },
        {
          heading: 'Tujuan dan dasar pemrosesan',
          bullets: [
            'Memproses dan mengelola reservasi Anda, sebagai pelaksanaan perjanjian dengan Anda.',
            'Menghubungi Anda terkait reservasi tersebut.',
            'Memenuhi kewajiban hukum, misalnya pencatatan keuangan dan pajak.',
            'Menampilkan Google Maps, hanya berdasarkan persetujuan Anda.',
          ],
          paragraphs: ['Kami tidak mengirim materi pemasaran melalui formulir reservasi dan tidak menjual data pribadi Anda.'],
        },
        {
          heading: 'Pihak yang dapat menerima data',
          bullets: [
            'Penyedia hosting dan infrastruktur website: {{nama penyedia dan lokasi server}}.',
            'WhatsApp (Meta), jika Anda memilih mengirim konfirmasi reservasi melalui WhatsApp. Rincian reservasi dikirim dari akun Anda sendiri.',
            'Google, jika Anda mengizinkan pemuatan Google Maps.',
            'Instansi berwenang, jika diwajibkan oleh hukum.',
          ],
        },
        {
          heading: 'Lama penyimpanan',
          paragraphs: ['Data reservasi disimpan selama {{masa retensi}}, kecuali hukum mewajibkan penyimpanan lebih lama.'],
        },
        {
          heading: 'Hak Anda',
          paragraphs: ['Sesuai Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi, Anda dapat meminta informasi, akses, dan salinan data Anda, memperbaiki atau menghapusnya, serta menarik persetujuan atau mengajukan keberatan atas pemrosesan tertentu. Sebagian hak dapat dibatasi oleh ketentuan hukum.'],
        },
        {
          heading: 'Keamanan',
          paragraphs: ['Kami menerapkan langkah teknis dan organisasi yang wajar untuk melindungi data pribadi. Tidak ada sistem yang sepenuhnya bebas risiko; jika terjadi kegagalan pelindungan data, kami akan memberi tahu sesuai ketentuan hukum.'],
        },
        {
          heading: 'Kontak',
          paragraphs: ['Untuk pertanyaan atau permintaan terkait data pribadi, hubungi {{email/kontak privasi}}.'],
        },
      ],
    },
    terms: {
      title: 'Syarat & Ketentuan',
      sections: [
        {
          heading: 'Ruang lingkup',
          paragraphs: ['Ketentuan ini berlaku untuk reservasi melalui website ini, yang dikelola oleh {{nama badan hukum pengelola hotel}}.'],
        },
        {
          heading: 'Proses reservasi',
          bullets: [
            'Reservasi yang dikirim berstatus menunggu konfirmasi dan belum merupakan pemesanan yang terkonfirmasi.',
            'Kamar ditahan selama 30 menit sejak reservasi tersimpan. Jika belum dikonfirmasi hotel dalam waktu tersebut, kamar dapat dipesan tamu lain.',
            'Anda bertanggung jawab atas kebenaran data yang dikirim.',
          ],
        },
        {
          heading: 'Harga dan pembayaran',
          bullets: [
            'Harga ditampilkan dalam Rupiah dan dihitung ulang oleh sistem saat reservasi dikirim.',
            'Website ini belum memproses pembayaran online. Metode dan batas waktu pembayaran: {{metode dan tenggat pembayaran}}.',
            'Status pajak dan biaya layanan: {{konfirmasi harga nett}}.',
          ],
        },
        {
          heading: 'Menginap',
          bullets: [
            'Check-in mulai pukul 14:00 WIB dan check-out paling lambat pukul 12:00 WIB.',
            'Persyaratan saat check-in: {{identitas, usia minimum, deposit}}.',
            'Aturan properti: {{merokok, hewan peliharaan, tamu tambahan, kerusakan}}.',
          ],
        },
        {
          heading: 'Pembatalan dan perubahan',
          paragraphs: ['Pembatalan, perubahan, dan refund mengikuti Kebijakan Refund.'],
        },
        {
          heading: 'Tanggung jawab',
          paragraphs: ['{{Batas tanggung jawab hotel, ditinjau penasihat hukum}}. Ketentuan ini tidak mengurangi hak konsumen menurut peraturan perundang-undangan.'],
        },
        {
          heading: 'Hukum dan penyelesaian sengketa',
          paragraphs: ['Ketentuan ini tunduk pada hukum Republik Indonesia. Keluhan dapat disampaikan ke {{kontak pengaduan}}. Mekanisme penyelesaian sengketa: {{forum penyelesaian}}.'],
        },
      ],
    },
    refund: {
      title: 'Kebijakan Refund & Pembatalan',
      sections: [
        {
          heading: 'Sebelum reservasi dikonfirmasi',
          paragraphs: ['Reservasi yang belum dikonfirmasi hotel menahan kamar selama 30 menit. Website ini tidak mengambil pembayaran online, sehingga tidak ada dana yang ditarik melalui website.'],
        },
        {
          heading: 'Pembatalan',
          bullets: [
            'Batas waktu pembatalan gratis: {{jumlah hari/jam sebelum check-in}}.',
            'Biaya pembatalan setelah batas tersebut: {{besaran biaya}}.',
            'Cara membatalkan: {{saluran pembatalan}}.',
          ],
        },
        {
          heading: 'Tidak hadir (no-show) dan keluar lebih awal',
          bullets: ['Tamu tidak hadir: {{biaya no-show}}.', 'Keluar lebih awal: {{ketentuan}}.'],
        },
        {
          heading: 'Perubahan reservasi',
          paragraphs: ['Perubahan tanggal atau tipe kamar: {{ketentuan perubahan}}. Perubahan bergantung pada ketersediaan kamar dan dapat mengubah total biaya.'],
        },
        {
          heading: 'Pengembalian dana',
          bullets: ['Metode pengembalian: {{metode}}.', 'Waktu proses: {{jumlah hari kerja}}.', 'Tarif atau promo khusus: {{ketentuan tarif non-refundable, jika ada}}.'],
        },
        {
          heading: 'Jika hotel tidak dapat menyediakan kamar',
          paragraphs: ['{{Bentuk pengembalian dana atau penggantian dari hotel}}.'],
        },
      ],
    },
    cookies: {
      title: 'Kebijakan Cookie',
      sections: [
        {
          heading: 'Yang kami gunakan',
          paragraphs: ['Website ini tidak memakai cookie iklan atau analitik. Penyimpanan di perangkat Anda terbatas pada hal berikut.'],
        },
        {
          heading: 'Cookie penting (selalu aktif)',
          bullets: [
            'Cookie sesi: menjaga sesi kunjungan Anda selama reservasi. Berakhir setelah sekitar 2 jam tidak aktif.',
            'XSRF-TOKEN: melindungi formulir dari permintaan palsu. Masa berlaku mengikuti sesi.',
          ],
        },
        {
          heading: 'Penyimpanan preferensi',
          bullets: [
            'ipb_hotel_language_preference (localStorage): menyimpan bahasa pilihan Anda.',
            'ipb_hotel_theme_preference (localStorage): menyimpan pilihan mode terang atau gelap Anda.',
            'ipb_hotel_cookie_consent (localStorage): menyimpan pilihan cookie Anda.',
          ],
        },
        {
          heading: 'Pihak ketiga (dengan persetujuan)',
          paragraphs: ['Google Maps hanya dimuat setelah Anda mengizinkannya. Setelah itu Google dapat menerima alamat IP Anda dan menyimpan cookie sesuai kebijakan privasi Google.'],
        },
        {
          heading: 'Mengubah pilihan',
          paragraphs: ['Anda dapat mengubah pilihan kapan saja melalui tautan Pengaturan Cookie di bagian bawah halaman. Anda juga dapat menghapus cookie melalui pengaturan browser.'],
        },
      ],
    },
  },
  en: {
    privacy: {
      title: 'Privacy Policy',
      sections: [
        {
          heading: 'Who we are',
          paragraphs: ['This website is operated by {{legal entity operating the hotel}}, {{registered address}}, as the personal data controller for reservations made here.'],
        },
        {
          heading: 'Data we collect',
          bullets: [
            'Contact data: full name, email address, and WhatsApp number.',
            'Reservation data: stay dates, room type, bed type, number of guests and rooms, breakfast choice, total cost, and booking code.',
            'Any special request you choose to write.',
            'Consent record: the time and version of the policies you accepted.',
            'Technical data needed for security, such as session cookies.',
          ],
        },
        {
          heading: 'Purposes and legal basis',
          bullets: [
            'Processing and managing your reservation, as performance of our agreement with you.',
            'Contacting you about that reservation.',
            'Meeting legal obligations, such as financial and tax records.',
            'Showing Google Maps, only with your consent.',
          ],
          paragraphs: ['We do not send marketing through the reservation form and we do not sell your personal data.'],
        },
        {
          heading: 'Who may receive data',
          bullets: [
            'Website hosting and infrastructure providers: {{provider name and server location}}.',
            'WhatsApp (Meta), if you choose to send your reservation confirmation by WhatsApp. The details are sent from your own account.',
            'Google, if you allow Google Maps to load.',
            'Competent authorities, where required by law.',
          ],
        },
        {
          heading: 'How long we keep data',
          paragraphs: ['Reservation data is kept for {{retention period}}, unless the law requires longer retention.'],
        },
        {
          heading: 'Your rights',
          paragraphs: ['Under Indonesian Law No. 27 of 2022 on Personal Data Protection, you may request information, access, and a copy of your data, correct or delete it, and withdraw consent or object to certain processing. Some rights may be limited by law.'],
        },
        {
          heading: 'Security',
          paragraphs: ['We apply reasonable technical and organizational measures to protect personal data. No system is free of risk; if a personal data protection failure occurs, we will notify you as required by law.'],
        },
        {
          heading: 'Contact',
          paragraphs: ['For questions or requests about personal data, contact {{privacy email/contact}}.'],
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      sections: [
        {
          heading: 'Scope',
          paragraphs: ['These terms apply to reservations made through this website, operated by {{legal entity operating the hotel}}.'],
        },
        {
          heading: 'Reservation process',
          bullets: [
            'A submitted reservation awaits confirmation and is not yet a confirmed booking.',
            'Rooms are held for 30 minutes after the reservation is saved. If the hotel has not confirmed it by then, the rooms may be booked by other guests.',
            'You are responsible for the accuracy of the data you submit.',
          ],
        },
        {
          heading: 'Prices and payment',
          bullets: [
            'Prices are shown in Rupiah and recalculated by the system when a reservation is submitted.',
            'This website does not process online payments yet. Payment methods and deadline: {{payment methods and deadline}}.',
            'Tax and service charge status: {{confirm nett pricing}}.',
          ],
        },
        {
          heading: 'Your stay',
          bullets: [
            'Check-in is from 14:00 WIB and check-out is by 12:00 WIB.',
            'Check-in requirements: {{ID, minimum age, deposit}}.',
            'House rules: {{smoking, pets, extra guests, damage}}.',
          ],
        },
        {
          heading: 'Cancellations and changes',
          paragraphs: ['Cancellations, changes, and refunds follow the Refund Policy.'],
        },
        {
          heading: 'Liability',
          paragraphs: ['{{Hotel liability limits, subject to legal review}}. These terms do not reduce your consumer rights under the law.'],
        },
        {
          heading: 'Governing law and disputes',
          paragraphs: ['These terms are governed by the laws of the Republic of Indonesia. Complaints can be sent to {{complaints contact}}. Dispute resolution: {{dispute forum}}.'],
        },
      ],
    },
    refund: {
      title: 'Refund & Cancellation Policy',
      sections: [
        {
          heading: 'Before a reservation is confirmed',
          paragraphs: ['A reservation not yet confirmed by the hotel holds rooms for 30 minutes. This website does not take online payments, so no funds are charged through it.'],
        },
        {
          heading: 'Cancellation',
          bullets: [
            'Free cancellation deadline: {{days/hours before check-in}}.',
            'Cancellation fee after the deadline: {{fee amount}}.',
            'How to cancel: {{cancellation channel}}.',
          ],
        },
        {
          heading: 'No-shows and early departure',
          bullets: ['No-show: {{no-show fee}}.', 'Early departure: {{terms}}.'],
        },
        {
          heading: 'Changing a reservation',
          paragraphs: ['Date or room type changes: {{change terms}}. Changes depend on availability and may change the total cost.'],
        },
        {
          heading: 'Refunds',
          bullets: ['Refund method: {{method}}.', 'Processing time: {{number of working days}}.', 'Special rates or promotions: {{non-refundable rate terms, if any}}.'],
        },
        {
          heading: 'If the hotel cannot provide a room',
          paragraphs: ['{{Refund or replacement offered by the hotel}}.'],
        },
      ],
    },
    cookies: {
      title: 'Cookie Policy',
      sections: [
        {
          heading: 'What we use',
          paragraphs: ['This website does not use advertising or analytics cookies. Storage on your device is limited to the items below.'],
        },
        {
          heading: 'Essential cookies (always on)',
          bullets: [
            'Session cookie: keeps your visit session during a reservation. Expires after about 2 hours of inactivity.',
            'XSRF-TOKEN: protects forms against forged requests. Lasts as long as the session.',
          ],
        },
        {
          heading: 'Preference storage',
          bullets: [
            'ipb_hotel_language_preference (localStorage): remembers your language.',
            'ipb_hotel_theme_preference (localStorage): remembers your light or dark mode choice.',
            'ipb_hotel_cookie_consent (localStorage): remembers your cookie choice.',
          ],
        },
        {
          heading: 'Third parties (with consent)',
          paragraphs: ['Google Maps only loads after you allow it. Google may then receive your IP address and set cookies under its own privacy policy.'],
        },
        {
          heading: 'Changing your choice',
          paragraphs: ['You can change your choice at any time through the Cookie Settings link at the bottom of the page. You can also delete cookies in your browser settings.'],
        },
      ],
    },
  },
};
