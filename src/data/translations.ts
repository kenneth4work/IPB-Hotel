export type Language = 'id' | 'en';

export interface TranslationDictionary {
  navbar: {
    rooms: string;
    gallery: string;
    location: string;
    reviews: string;
    call: string;
    bookNow: string;
    whatsapp: string;
    switchLang: string;
    topAddress: string;
    topAddressShort: string;
    checkInCheckOut: string;
    reservationWa: string;
  };
  hero: {
    badge: string;
    badgeChip: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
    tagline: string;
    ctaRooms: string;
    ctaContact: string;
    ctaWa: string;
    ratingText: string;
    highlights: {
      location: string;
      locationDesc: string;
      amenities: string;
      amenitiesDesc: string;
      dining: string;
      diningDesc: string;
    };
    stats: {
      roomsTitle: string;
      roomsDesc: string;
      locationTitle: string;
      locationDesc: string;
      miceTitle: string;
      miceDesc: string;
      checkinTitle: string;
      checkinDesc: string;
    };
  };
  rooms: {
    badge: string;
    title: string;
    subtitle: string;
    startingFrom: string;
    perNight: string;
    viewDetails: string;
    bookViaWa: string;
    allRooms: string;
    allRoomsLink: string;
    infoTitle: string;
    infoDesc: string;
    groupBooking: string;
    amenityLabels: Record<string, string>;
    descriptions: Record<string, string>;
    badges: Record<string, string>;
    capacities: Record<string, string>;
    bedTypes: Record<string, string>;
  };
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
    categories: {
      all: string;
      rooms: string;
      facilities: string;
      dining: string;
      meeting: string;
    };
    items: Record<string, { title: string; category: string }>;
    closeAria: string;
    prevAria: string;
    nextAria: string;
  };
  location: {
    badge: string;
    title: string;
    subtitle: string;
    addressLabel: string;
    openInMaps: string;
    landmarksTitle: string;
    transportTitle: string;
    infoTitle: string;
    phoneLabel: string;
    instagramLabel: string;
    hoursLabel: string;
    conventionPill: string;
    valetPill: string;
    mapComplexTitle: string;
    mapBotanicalTag: string;
    directionsHint: string;
    landmarks: Record<string, { name: string; time: string; desc: string }>;
  };
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    overallRating: string;
    verifiedGuests: string;
    filterAll: string;
    scoreText: string;
    recommendationText: string;
    items: Record<string, { quote: string; datePlatform: string }>;
  };
  specialOffer: {
    badge: string;
    title: string;
    subtitle: string;
    codeLabel: string;
    claimOffer: string;
    tag: string;
    feature1: string;
    feature2: string;
    feature3: string;
    bookNow: string;
    contactUs: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    officeTitle: string;
    quickWaTitle: string;
    quickWaDesc: string;
    chatWaButton: string;
    formBadge: string;
    formTitle: string;
    formSubtitle: string;
    formName: string;
    formNamePlaceholder: string;
    formEmail: string;
    formPhone: string;
    formSubject: string;
    formRoomType: string;
    formDate: string;
    formRoom: string;
    formMessage: string;
    formMessagePlaceholder: string;
    formSubmit: string;
    sendingMessage: string;
    contactInfoTitle: string;
    privacyNote: string;
    subjects: {
      room: string;
      meeting: string;
      event: string;
      general: string;
    };
    successTitle: string;
    successDescPrefix: string;
    successDescMid: string;
    successDescSuffix: string;
    sendViaWa: string;
    sendAnother: string;
    errorRequired: string;
  };
  footer: {
    aboutTitle: string;
    aboutDesc: string;
    tagline: string;
    rooms: string;
    quickLinks: string;
    contactUs: string;
    contact: string;
    copyright: string;
    hoursAccess: string;
    frontDesk: string;
    concierge: string;
    allRightsReserved: string;
    viewAllRooms: string;
    backToTop: string;
  };
  modal: {
    roomDetailTitle: string;
    size: string;
    capacity: string;
    bedType: string;
    facilities: string;
    description: string;
    close: string;
    bookThisRoom: string;
    photoCounterText: string;
    ofText: string;
    bookingGuarantee: string;
    bookingGuaranteeDesc: string;
    fullAmenities: string;
    freeWifi: string;
    bookPrefix: string;
    bookSuffix: string;
    keyboardHint: string;
    roomSizeLabel: string;
    quickBook: string;
    defaultCapacity: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  id: {
    navbar: {
      rooms: 'Pilihan Kamar',
      gallery: 'Galeri',
      location: 'Lokasi Strategis',
      reviews: 'Ulasan Tamu',
      call: 'Telepon',
      bookNow: 'Pesan Sekarang',
      whatsapp: 'WhatsApp Official',
      switchLang: 'Ubah ke Bahasa Inggris (EN)',
      topAddress: 'Jl. Padjajaran Raya (Samping Mall Botani Square)',
      topAddressShort: 'Botani Square, Bogor',
      checkInCheckOut: 'Check-in: 14:00 · Check-out: 12:00',
      reservationWa: 'Reservasi via WhatsApp'
    },
    hero: {
      badge: 'Boutique Hotel & Convention · Bogor',
      badgeChip: 'Kenyamanan Bintang di Kawasan Botani Square',
      titleMain: 'Pengalaman Menginap Istimewa di',
      titleHighlight: 'Pusat Kota Bogor',
      subtitle: 'Tersedia 83 kamar dengan 4 tipe pilihan, dirancang untuk kenyamanan maksimal dengan sentuhan modern dan alami. Menjadi pilihan utama akomodasi bisnis, keluarga, dan kegiatan MICE di Kota Bogor.',
      tagline: 'Tempat Menginap Nyaman & Pusat Konvensi Prestisius di Kota Hujan',
      ctaRooms: 'Lihat Pilihan Kamar',
      ctaContact: 'Konsultasi & Reservasi',
      ctaWa: 'BOOKING VIA WHATSAPP',
      ratingText: 'Sangat Memuaskan · 1.200+ Tamu Terverifikasi',
      highlights: {
        location: 'Lokasi Prime Sentral',
        locationDesc: 'Langkah langsung ke Botani Square Mall & Tol Jagorawi',
        amenities: 'Fasilitas Konvensi Unggul',
        amenitiesDesc: 'Ballroom & ruang meeting berkapasitas hingga 1.000 delegasi',
        dining: 'Kuliner Nusantara & Internasional',
        diningDesc: 'Santap lezat resto berbintang dengan menu pilihan koki berpengalaman'
      },
      stats: {
        roomsTitle: '83 Kamar Pilihan',
        roomsDesc: 'Suite, Executive, Deluxe & Standard',
        locationTitle: 'Akses Botani Square',
        locationDesc: 'Jembatan langsung ke mall & lifestyle',
        miceTitle: 'Kawasan IICC',
        miceDesc: 'Pusat MICE & konvensi bergengsi',
        checkinTitle: 'Check-in Nyaman',
        checkinDesc: 'Check-in: 14:00 · Check-out: 12:00'
      }
    },
    rooms: {
      badge: 'AKOMODASI & PILIHAN KAMAR',
      title: 'Pilihan Kamar & Suite Eksklusif',
      subtitle: 'Setiap kamar dirancang dengan sentuhan kontemporer berkelas untuk memastikan istirahat berkualitas Anda di Kota Hujan.',
      startingFrom: 'MULAI DARI',
      perNight: '/ malam',
      viewDetails: 'Detail Kamar',
      bookViaWa: 'PESAN KAMAR INI',
      allRooms: 'Semua Tipe Kamar',
      allRoomsLink: 'Lihat Seluruh 83 Kamar →',
      infoTitle: 'Informasi Tambahan Reservasi',
      infoDesc: 'Tarif kamar sudah termasuk sarapan (sesuai paket), akses WiFi kencang, dan pajak pemerintah. Waktu check-in 14:00 WIB & check-out 12:00 WIB.',
      groupBooking: 'Pemesanan Grup / Meeting Room →',
      amenityLabels: {
        'Ruang Tamu': 'Ruang Tamu Terpisah',
        'Ranjang King': 'Ranjang King Size',
        'Smart TV': 'Smart TV 43"',
        'Bathtub & Mini Bar': 'Bathtub & Mini Bar',
        'Lounge Area': 'Lounge Area Eksklusif',
        'Smart TV 50"': 'Smart TV 50"',
        'Mesin Kopi & Teh': 'Mesin Kopi & Teh',
        'Meja Kerja': 'Meja Kerja Ergonomis',
        'Balkon Pribadi': 'Balkon Pribadi',
        'Ranjang Queen': 'Ranjang Queen Size',
        'TV Layar Datar': 'TV Layar Datar',
        'AC Dingin': 'AC Dingin & Sunyi',
        'Pemandangan Kota': 'Pemandangan Kota',
        'Ranjang Queen / Twin': 'Ranjang Queen / Twin',
        'Water Heater': 'Water Heater & Shower',
        'Ranjang Double': 'Ranjang Double',
        'WiFi Kencang': 'WiFi Kecepatan Tinggi',
        'Living Room': 'Ruang Tamu Terpisah',
        'King Bed': 'Ranjang King Size',
        'Queen Bed': 'Ranjang Queen Size',
        'Double Bed': 'Ranjang Double',
        'Mini Bar': 'Mini Bar & Kulkas',
        'Work Desk': 'Meja Kerja Ergonomis',
        'Balkon': 'Balkon Pribadi',
        'TV': 'TV Layar Datar',
        'AC': 'AC Dingin & Sunyi',
        'City View': 'Pemandangan Kota',
        'WiFi': 'WiFi Kecepatan Tinggi'
      },
      descriptions: {
        'suite': 'Kamar termewah dengan ruang tamu terpisah, ranjang King berukuran besar, meja santai, dan kamar mandi dengan bathtub.',
        'grand-executive': 'Kamar eksekutif ekstra luas dengan lounge area eksklusif, ranjang King premium, dan fasilitas penunjang bisnis modern.',
        'executive': 'Dirancang khusus bagi profesional dan pelaku bisnis dengan meja kerja nyaman serta pemandangan menawan.',
        'deluxe': 'Pilihan favorit untuk pelancong santai dengan pemandangan lanskap kota dan interior kontemporer.',
        'superior': 'Kenyamanan optimal dengan sentuhan interior hangat kontemporer, pilihan kasur Queen atau Twin, serta suasana tenang yang menenangkan.',
        'standard': 'Kamar modern yang fungsional dan terjangkau dengan koneksi WiFi kencang untuk kenyamanan menginap.'
      },
      badges: {
        'suite': 'SUITE',
        'grand-executive': 'GRAND EXECUTIVE',
        'executive': 'EXECUTIVE',
        'deluxe': 'DELUXE',
        'superior': 'SUPERIOR',
        'standard': 'STANDARD'
      },
      capacities: {
        'suite': '2 Dewasa + 1 Anak',
        'grand-executive': '2 Dewasa',
        'executive': '2 Dewasa',
        'deluxe': '2 Dewasa',
        'superior': '2 Dewasa',
        'standard': '1 - 2 Dewasa'
      },
      bedTypes: {
        'suite': 'King Bed (200x200)',
        'grand-executive': 'King Bed (180x200)',
        'executive': 'King Bed (180x200)',
        'deluxe': 'Queen Bed (160x200)',
        'superior': 'Queen / Twin Bed',
        'standard': 'Double Bed / Twin Bed'
      }
    },
    gallery: {
      badge: 'DOKUMENTASI VISUAL',
      title: 'Potret Keindahan Hotel Kami',
      subtitle: 'Jelajahi sudut kenyamanan, estetika arsitektur, dan suasana hangat yang menanti kedatangan Anda.',
      categories: {
        all: 'Semua Koleksi',
        rooms: 'Kamar & Suite',
        facilities: 'Fasilitas & Lobi',
        dining: 'Restoran & Bar',
        meeting: 'Meeting & Event'
      },
      items: {
        'gal-1': {
          title: 'Grand Lobby & Hospitality Lounge',
          category: 'Lobby & Area Publik'
        },
        'gal-2': {
          title: 'IICC Grand Ballroom & Convention',
          category: 'MICE & Acara'
        },
        'gal-3': {
          title: 'Terrace Dining & Restoran Nusantara',
          category: 'Kuliner & Resto'
        },
        'gal-4': {
          title: 'Kenyamanan Suite & Kamar Tamu',
          category: 'Akomodasi'
        },
        'gal-5': {
          title: 'Akses Terintegrasi Mall Botani Square',
          category: 'Lokasi & Eksterior'
        },
        'gal-6': {
          title: 'Rooftop',
          category: 'Fasilitas Kerja'
        }
      },
      closeAria: 'Tutup Galeri',
      prevAria: 'Foto Sebelumnya',
      nextAria: 'Foto Berikutnya'
    },
    location: {
      badge: 'AKSESIBILITAS UTAMA',
      title: 'Lokasi Strategis di Jantung Kota Bogor',
      subtitle: 'Terhubung langsung dengan akses transportasi utama dan destinasi wisata favorit di Kota Bogor.',
      addressLabel: 'Alamat Hotel:',
      openInMaps: 'BUKA DI GOOGLE MAPS',
      landmarksTitle: 'Destinasi Sekitar Hotel',
      transportTitle: 'Konektivitas Transportasi',
      infoTitle: 'Informasi Akses & Kontak',
      phoneLabel: 'Telepon Reservasi',
      instagramLabel: 'Instagram Resmi',
      hoursLabel: 'Waktu Kedatangan & Keberangkatan',
      conventionPill: 'Pusat Konvensi & Akomodasi',
      valetPill: 'Valet & Parkir Tersedia',
      mapComplexTitle: 'Kawasan Mall Botani Square & IICC',
      mapBotanicalTag: '🌿 5 Menit ke Kebun Raya Bogor',
      directionsHint: 'Dapatkan petunjuk rute navigasi instan menggunakan Google Maps / Waze.',
      landmarks: {
        'Mall Botani Square': {
          name: 'Mall Botani Square',
          time: '1 Menit',
          desc: 'Akses langsung melalui jembatan penghubung hotel'
        },
        'IPB International Convention Center (IICC)': {
          name: 'IPB International Convention Center (IICC)',
          time: '1 Menit',
          desc: 'Terintegrasi langsung di satu kawasan gedung'
        },
        'Kebun Raya Bogor': {
          name: 'Kebun Raya Bogor',
          time: '5 Menit',
          desc: 'Ikon paru-paru hijau Kota Hujan dan Istana Kepresidenan'
        },
        'Terminal DAMRI Bandara Soekarno-Hatta': {
          name: 'Terminal DAMRI Bandara Soekarno-Hatta',
          time: '2 Menit',
          desc: 'Kemudahan transportasi langsung ke dan dari bandara'
        },
        'Gerbang Tol Baranangsiang (Jagorawi)': {
          name: 'Gerbang Tol Baranangsiang (Jagorawi)',
          time: '3 Menit',
          desc: 'Akses tol bebas hambatan menuju Jakarta dan sekitarnya'
        }
      }
    },
    reviews: {
      badge: 'TESTIMONI ASLI',
      title: 'Apa Kata Tamu Kami',
      subtitle: 'Kepuasan dan kenyamanan Anda adalah prioritas utama setiap layanan kami.',
      overallRating: 'Skor Keseluruhan',
      verifiedGuests: 'Ulasan dari tamu yang telah menginap',
      filterAll: 'Semua Ulasan',
      scoreText: 'Skor Kepuasan Tamu: 4.8 / 5.0 dari 1.200+ ulasan terverifikasi',
      recommendationText: 'Terpilih sebagai salah satu akomodasi bisnis paling direkomendasikan di Bogor',
      items: {
        'review-1': {
          quote: 'Kamar sangat nyaman dan bersih. Lokasi sangat strategis, langsung terhubung ke mall. Staf hotel ramah dan responsif. Pasti akan menginap lagi!',
          datePlatform: 'Maret 2026 · Google'
        },
        'review-2': {
          quote: 'Sangat cocok untuk acara seminar dan pertemuan bisnis. Fasilitas lengkap, akses ke IICC sangat mudah. Sarapan enak dan bervariasi.',
          datePlatform: 'Februari 2026 · Booking.com'
        },
        'review-3': {
          quote: 'Hotel yang bagus dengan harga terjangkau. Kamar Suite sangat luas dan nyaman untuk keluarga. Akan saya rekomendasikan kepada teman-teman.',
          datePlatform: 'Januari 2026 · TripAdvisor'
        }
      }
    },
    specialOffer: {
      badge: 'PENAWARAN SPESIAL',
      tag: 'PENAWARAN SPESIAL',
      title: 'Pesan Sekarang & Dapatkan Penawaran Terbaik',
      subtitle: 'Nikmati potongan harga eksklusif untuk pemesanan langsung melalui website kami. Termasuk sarapan gratis untuk 2 orang.',
      codeLabel: 'Gunakan Kode Promo:',
      claimOffer: 'Klaim Promo via WhatsApp',
      feature1: 'Gratis Sarapan Buffet 2 Orang',
      feature2: 'Garansi Tarif Terbaik Langsung',
      feature3: 'Bebas Biaya Reservasi Tersembunyi',
      bookNow: 'PESAN SEKARANG',
      contactUs: 'HUBUNGI KAMI'
    },
    contact: {
      badge: 'LAYANAN BANTUAN 24/7',
      title: 'Kami Siap Membantu Anda',
      subtitle: 'Punya pertanyaan mengenai sewa ballroom, reservasi kamar, atau paket pertemuan? Tim kami siap melayani Anda.',
      officeTitle: 'Kantor Reservasi & Layanan',
      quickWaTitle: 'Respon Cepat',
      quickWaDesc: 'Konsultasi langsung via WhatsApp Hotel Officer',
      chatWaButton: 'Chat WA',
      formBadge: 'FORMULIR PERTANYAAN RESMI',
      formTitle: 'Kirim Pesan',
      formSubtitle: 'Kirimkan detail kebutuhan Anda dan kami akan menghubungi Anda sesegera mungkin.',
      formName: 'Nama Lengkap',
      formNamePlaceholder: 'Masukkan nama lengkap Anda',
      formEmail: 'Email',
      formPhone: 'Nomor WhatsApp / Telepon',
      formSubject: 'Keperluan',
      formRoomType: 'Pilihan Tipe Kamar',
      formDate: 'Tanggal Menginap / Acara',
      formRoom: 'Tipe Kamar / Kebutuhan',
      formMessage: 'Pesan Tambahan atau Pertanyaan',
      formMessagePlaceholder: 'Tulis pesan Anda di sini...',
      formSubmit: 'KIRIM PESAN',
      sendingMessage: 'MENGIRIM PESAN...',
      contactInfoTitle: 'Kontak Langsung',
      privacyNote: 'Data Anda terlindungi dan hanya digunakan untuk keperluan reservasi IPB Convention Hotel.',
      subjects: {
        room: 'Pemesanan Kamar',
        meeting: 'Ruang Pertemuan (Meeting Room)',
        event: 'Acara / Konvensi (Event / Convention)',
        general: 'Informasi Umum'
      },
      successTitle: 'Pesan Anda Telah Diterima!',
      successDescPrefix: 'Terima kasih',
      successDescMid: '. Tim reservasi kami akan segera meninjau permohonan',
      successDescSuffix: 'Anda.',
      sendViaWa: 'KIRIM SEBAGAI CHAT WHATSAPP',
      sendAnother: 'Kirim Pesan Lain',
      errorRequired: 'Mohon lengkapi seluruh formulir sebelum mengirim pesan.'
    },
    footer: {
      aboutTitle: 'IPB Hotel & Convention',
      aboutDesc: 'Hotel konvensi terkemuka di Kota Bogor yang terhubung langsung dengan Mall Botani Square dan IPB International Convention Center (IICC).',
      tagline: 'Tempat Menginap Nyaman & Pusat Konvensi Prestisius di Kota Hujan',
      rooms: 'Pilihan Kamar',
      quickLinks: 'Navigasi Cepat',
      contactUs: 'Pusat Informasi & Bantuan',
      contact: 'Kontak Resmi',
      copyright: 'Hak Cipta Dilindungi. IPB Hotel & Convention Center Bogor.',
      hoursAccess: 'Waktu & Akses',
      frontDesk: 'Front Desk 24 Jam',
      concierge: 'Layanan Concierge & Keamanan',
      allRightsReserved: 'Seluruh hak cipta dilindungi.',
      viewAllRooms: 'Lihat Seluruh 83 Kamar →',
      backToTop: 'Kembali ke atas'
    },
    modal: {
      roomDetailTitle: 'Spesifikasi & Fasilitas Kamar',
      size: 'Ukuran Kamar',
      capacity: 'Kapasitas',
      bedType: 'Tipe Tempat Tidur',
      facilities: 'Fasilitas Unggulan',
      description: 'Tentang Kamar',
      close: 'Tutup',
      bookThisRoom: 'Lanjutkan Pemesanan Kamar Ini',
      photoCounterText: 'Foto',
      ofText: 'dari',
      bookingGuarantee: 'Jaminan Pemesanan:',
      bookingGuaranteeDesc: 'Konfirmasi cepat via WhatsApp Hotel Officer resmi. Check-in mulai 14:00 WIB, check-out maksimal 12:00 WIB.',
      fullAmenities: 'Kamar Mandi & Amenities Lengkap',
      freeWifi: 'Free High-Speed WiFi & Air Mineral',
      bookPrefix: 'PESAN',
      bookSuffix: 'SEKARANG',
      keyboardHint: 'Gunakan tombol panah keyboard atau usap layar untuk navigasi',
      roomSizeLabel: 'Ukuran Kamar:',
      quickBook: 'Pesan',
      defaultCapacity: '2 Dewasa'
    }
  },
  en: {
    navbar: {
      rooms: 'Room Options',
      gallery: 'Gallery',
      location: 'Prime Location',
      reviews: 'Guest Reviews',
      call: 'Call Us',
      bookNow: 'Book Now',
      whatsapp: 'Official WhatsApp',
      switchLang: 'Switch to Indonesian (ID)',
      topAddress: 'Jl. Padjajaran Raya (Next to Botani Square Mall)',
      topAddressShort: 'Botani Square, Bogor',
      checkInCheckOut: 'Check-in: 14:00 · Check-out: 12:00',
      reservationWa: 'Reservation via WhatsApp'
    },
    hero: {
      badge: 'Boutique Hotel & Convention · Bogor',
      badgeChip: 'Premier Hospitality in Botani Square Area',
      titleMain: 'An Extraordinary Stay in the',
      titleHighlight: 'Heart of Bogor City',
      subtitle: 'Featuring 83 elegantly appointed rooms across 4 curated types, designed for supreme relaxation with modern and natural touches. The prime destination for business, leisure, and MICE events in Bogor.',
      tagline: 'Comfortable Stays & Prestigious Convention Center in the Rain City',
      ctaRooms: 'Explore Rooms',
      ctaContact: 'Inquiry & Reservation',
      ctaWa: 'BOOK VIA WHATSAPP',
      ratingText: 'Exceptional Rating · 1,200+ Verified Guests',
      highlights: {
        location: 'Prime Central Location',
        locationDesc: 'Direct steps to Botani Square Mall & Jagorawi Toll Gate',
        amenities: 'Superior Convention Facilities',
        amenitiesDesc: 'Ballroom & meeting venues hosting up to 1,000 delegates',
        dining: 'Indonesian & International Dining',
        diningDesc: 'Savor exquisite dishes prepared by experienced master chefs'
      },
      stats: {
        roomsTitle: '83 Selected Rooms',
        roomsDesc: 'Suite, Executive, Deluxe & Standard',
        locationTitle: 'Botani Square Access',
        locationDesc: 'Direct link to mall & lifestyle',
        miceTitle: 'IICC Convention Area',
        miceDesc: 'Prestigious MICE & event venue',
        checkinTitle: 'Convenient Check-in',
        checkinDesc: 'Check-in: 14:00 · Check-out: 12:00'
      }
    },
    rooms: {
      badge: 'ACCOMMODATIONS & ROOM TYPES',
      title: 'Exclusive Rooms & Suites',
      subtitle: 'Every room is crafted with refined contemporary aesthetics to ensure a relaxing and restorative stay in the Rain City.',
      startingFrom: 'STARTING FROM',
      perNight: '/ night',
      viewDetails: 'Room Details',
      bookViaWa: 'BOOK THIS ROOM',
      allRooms: 'All Room Types',
      allRoomsLink: 'View All 83 Rooms →',
      infoTitle: 'Additional Reservation Information',
      infoDesc: 'Room rates include breakfast (as per package), high-speed Wi-Fi, and government taxes. Check-in from 14:00 & check-out by 12:00.',
      groupBooking: 'Group Booking / Meeting Hall Inquiry →',
      amenityLabels: {
        'Ruang Tamu': 'Separate Living Room',
        'Ranjang King': 'King Size Bed',
        'Smart TV': '43" Smart TV',
        'Bathtub & Mini Bar': 'Bathtub & Mini Bar',
        'Lounge Area': 'Executive Lounge Area',
        'Smart TV 50"': '50" Smart TV',
        'Mesin Kopi & Teh': 'Coffee & Tea Maker',
        'Meja Kerja': 'Ergonomic Work Desk',
        'Balkon Pribadi': 'Private Balcony',
        'Ranjang Queen': 'Queen Size Bed',
        'TV Layar Datar': 'Flat Screen TV',
        'AC Dingin': 'Whisper-Quiet AC',
        'Pemandangan Kota': 'Panoramic City View',
        'Ranjang Queen / Twin': 'Queen or Twin Beds',
        'Water Heater': 'Hot & Cold Shower',
        'Ranjang Double': 'Double Bed',
        'WiFi Kencang': 'High-Speed Wi-Fi',
        'Living Room': 'Separate Living Room',
        'King Bed': 'King Size Bed',
        'Queen Bed': 'Queen Size Bed',
        'Double Bed': 'Double Bed',
        'Mini Bar': 'Mini Bar & Fridge',
        'Work Desk': 'Work Desk',
        'Balkon': 'Private Balcony',
        'TV': 'Flat Screen TV',
        'AC': 'Whisper-Quiet AC',
        'City View': 'Panoramic City View',
        'WiFi': 'High-Speed Wi-Fi'
      },
      descriptions: {
        'suite': 'Our most luxurious suite featuring a separate living room, grand King bed, plush lounge area, and an ensuite bathroom with bathtub.',
        'grand-executive': 'Spacious executive room featuring an exclusive lounge area, premium King bed, and comprehensive modern business amenities.',
        'executive': 'Specifically curated for professionals and corporate guests, complete with an ergonomic work desk and panoramic city vistas.',
        'deluxe': 'A favorite choice for leisure travelers, showcasing dynamic urban views and tasteful contemporary design.',
        'superior': 'Optimal comfort enriched by warm contemporary decor, Queen or Twin bed options, and a tranquil ambiance.',
        'standard': 'A functional and cost-effective modern room with high-speed Wi-Fi, perfect for a cozy and restful stay.'
      },
      badges: {
        'suite': 'SUITE',
        'grand-executive': 'GRAND EXECUTIVE',
        'executive': 'EXECUTIVE',
        'deluxe': 'DELUXE',
        'superior': 'SUPERIOR',
        'standard': 'STANDARD'
      },
      capacities: {
        'suite': '2 Adults + 1 Child',
        'grand-executive': '2 Adults',
        'executive': '2 Adults',
        'deluxe': '2 Adults',
        'superior': '2 Adults',
        'standard': '1 - 2 Adults'
      },
      bedTypes: {
        'suite': 'King Bed (200x200)',
        'grand-executive': 'King Bed (180x200)',
        'executive': 'King Bed (180x200)',
        'deluxe': 'Queen Bed (160x200)',
        'superior': 'Queen / Twin Bed',
        'standard': 'Double Bed / Twin Bed'
      }
    },
    gallery: {
      badge: 'VISUAL GALLERY',
      title: 'Moments of Hotel Elegance',
      subtitle: 'Discover our welcoming corners, tasteful architecture, and warm atmosphere awaiting your arrival.',
      categories: {
        all: 'All Collections',
        rooms: 'Rooms & Suites',
        facilities: 'Facilities & Lobby',
        dining: 'Restaurant & Bar',
        meeting: 'Meetings & Events'
      },
      items: {
        'gal-1': {
          title: 'Grand Lobby & Hospitality Lounge',
          category: 'Lobby & Public Areas'
        },
        'gal-2': {
          title: 'IICC Grand Ballroom & Convention',
          category: 'MICE & Events'
        },
        'gal-3': {
          title: 'Terrace Dining & Archipelago Restaurant',
          category: 'Dining & Restaurant'
        },
        'gal-4': {
          title: 'Suite Comfort & Guest Rooms',
          category: 'Accommodations'
        },
        'gal-5': {
          title: 'Integrated Botani Square Mall Access',
          category: 'Location & Exterior'
        },
        'gal-6': {
          title: 'Rooftop',
          category: 'Work Facilities'
        }
      },
      closeAria: 'Close Gallery',
      prevAria: 'Previous Photo',
      nextAria: 'Next Photo'
    },
    location: {
      badge: 'ULTIMATE ACCESSIBILITY',
      title: 'Strategic Location in Central Bogor',
      subtitle: 'Seamlessly connected to major transport links and iconic Bogor tourism landmarks.',
      addressLabel: 'Hotel Address:',
      openInMaps: 'OPEN IN GOOGLE MAPS',
      landmarksTitle: 'Nearby Landmarks',
      transportTitle: 'Transit & Connectivity',
      infoTitle: 'Access & Contact Information',
      phoneLabel: 'Reservation Phone',
      instagramLabel: 'Official Instagram',
      hoursLabel: 'Check-in & Check-out Schedule',
      conventionPill: 'Convention & Accommodation Center',
      valetPill: 'Valet & Parking Available',
      mapComplexTitle: 'Botani Square Mall & IICC Complex',
      mapBotanicalTag: '🌿 5 Mins to Bogor Botanical Gardens',
      directionsHint: 'Get instant turn-by-turn navigation directions via Google Maps or Waze.',
      landmarks: {
        'Mall Botani Square': {
          name: 'Botani Square Mall',
          time: '1 Min',
          desc: 'Direct covered bridge walkway connection from the hotel'
        },
        'IPB International Convention Center (IICC)': {
          name: 'IPB International Convention Center (IICC)',
          time: '1 Min',
          desc: 'Directly integrated within the same building complex'
        },
        'Kebun Raya Bogor': {
          name: 'Bogor Botanical Gardens',
          time: '5 Mins',
          desc: 'Iconic lush heritage park and Presidential Palace'
        },
        'Terminal DAMRI Bandara Soekarno-Hatta': {
          name: 'Airport DAMRI Bus Terminal',
          time: '2 Mins',
          desc: 'Direct and scheduled express transit to/from airport'
        },
        'Gerbang Tol Baranangsiang (Jagorawi)': {
          name: 'Baranangsiang Toll Gate (Jagorawi)',
          time: '3 Mins',
          desc: 'Direct expressway access to and from Greater Jakarta'
        }
      }
    },
    reviews: {
      badge: 'GENUINE FEEDBACK',
      title: 'What Our Guests Say',
      subtitle: 'Your comfort and satisfaction remain the heart of our hospitality philosophy.',
      overallRating: 'Overall Rating Score',
      verifiedGuests: 'Verified reviews from staying guests',
      filterAll: 'All Reviews',
      scoreText: 'Guest Satisfaction Score: 4.8 / 5.0 from 1,200+ verified reviews',
      recommendationText: 'Voted among the most recommended business hotels in Bogor',
      items: {
        'review-1': {
          quote: 'The room was spotless and very comfortable. Super strategic location directly connected to the mall. Friendly and helpful staff. Will definitely stay again!',
          datePlatform: 'March 2026 · Google'
        },
        'review-2': {
          quote: 'Perfect venue for seminars and corporate conventions. Comprehensive facilities and seamless access to IICC. Delicious breakfast buffet.',
          datePlatform: 'February 2026 · Booking.com'
        },
        'review-3': {
          quote: 'Great hotel with affordable rates. The Suite Room was expansive and pleasant for my family. Highly recommended to friends and colleagues!',
          datePlatform: 'January 2026 · TripAdvisor'
        }
      }
    },
    specialOffer: {
      badge: 'SPECIAL LIMITED OFFER',
      tag: 'SPECIAL LIMITED OFFER',
      title: 'Book Direct & Secure Exclusive Benefits',
      subtitle: 'Enjoy exclusive rates and seasonal privileges when booking directly with our team. Includes complimentary buffet breakfast for 2 guests.',
      codeLabel: 'Use Promo Code:',
      claimOffer: 'Claim Offer via WhatsApp',
      feature1: 'Complimentary Buffet Breakfast for 2',
      feature2: 'Guaranteed Best Direct Rates',
      feature3: 'No Hidden Booking Fees',
      bookNow: 'BOOK NOW',
      contactUs: 'CONTACT US'
    },
    contact: {
      badge: '24/7 HOSPITALITY DESK',
      title: 'We Are Here to Assist You',
      subtitle: 'Have questions regarding meeting hall rentals, room bookings, or corporate event packages? Our team is always ready.',
      officeTitle: 'Reservations & Concierge',
      quickWaTitle: 'Quick Response',
      quickWaDesc: 'Instant consultation via WhatsApp Hotel Officer',
      chatWaButton: 'Chat WA',
      formBadge: 'OFFICIAL INQUIRY FORM',
      formTitle: 'Send a Message',
      formSubtitle: 'Submit your requirements and our reservation team will follow up promptly.',
      formName: 'Full Name',
      formNamePlaceholder: 'Enter your full name',
      formEmail: 'Email Address',
      formPhone: 'WhatsApp / Phone Number',
      formSubject: 'Subject / Inquiry Type',
      formRoomType: 'Room Type Selection',
      formDate: 'Stay / Event Date',
      formRoom: 'Room Type / Requirement',
      formMessage: 'Additional Notes or Inquiries',
      formMessagePlaceholder: 'Write your message or specific requirements here...',
      formSubmit: 'SEND MESSAGE',
      sendingMessage: 'SENDING MESSAGE...',
      contactInfoTitle: 'Direct Contacts',
      privacyNote: 'Your data is confidential and strictly used for official IPB Convention Hotel reservations.',
      subjects: {
        room: 'Room Reservation',
        meeting: 'Meeting Room',
        event: 'Event / Convention',
        general: 'General Inquiry'
      },
      successTitle: 'Your Message Has Been Received!',
      successDescPrefix: 'Thank you',
      successDescMid: '. Our guest services team is reviewing your',
      successDescSuffix: 'inquiry.',
      sendViaWa: 'FORWARD VIA WHATSAPP',
      sendAnother: 'Send Another Message',
      errorRequired: 'Please complete all required fields before submitting.'
    },
    footer: {
      aboutTitle: 'IPB Hotel & Convention',
      aboutDesc: 'Premier convention hotel in Bogor City, directly connected to Botani Square Mall and IPB International Convention Center (IICC).',
      tagline: 'Comfortable Stays & Prestigious Convention Center in the Rain City',
      rooms: 'Room Options',
      quickLinks: 'Quick Links',
      contactUs: 'Help & Information Center',
      contact: 'Official Contacts',
      copyright: 'All Rights Reserved. IPB Hotel & Convention Center Bogor.',
      hoursAccess: 'Hours & Access',
      frontDesk: '24/7 Front Desk',
      concierge: 'Concierge & Security Services',
      allRightsReserved: 'All rights reserved.',
      viewAllRooms: 'View All 83 Rooms →',
      backToTop: 'Back to top'
    },
    modal: {
      roomDetailTitle: 'Room Specifications & Amenities',
      size: 'Room Size',
      capacity: 'Capacity',
      bedType: 'Bed Configuration',
      facilities: 'Key Amenities',
      description: 'Room Overview',
      close: 'Close',
      bookThisRoom: 'Proceed to Book This Room',
      photoCounterText: 'Photo',
      ofText: 'of',
      bookingGuarantee: 'Booking Guarantee:',
      bookingGuaranteeDesc: 'Fast confirmation via official Hotel WhatsApp Officer. Check-in from 14:00, check-out by 12:00.',
      fullAmenities: 'Ensuite Bathroom & Full Amenities',
      freeWifi: 'Free High-Speed WiFi & Bottled Water',
      bookPrefix: 'BOOK',
      bookSuffix: 'NOW',
      keyboardHint: 'Use keyboard arrow keys or swipe screen to navigate',
      roomSizeLabel: 'Room Size:',
      quickBook: 'Book',
      defaultCapacity: '2 Adults'
    }
  }
};
