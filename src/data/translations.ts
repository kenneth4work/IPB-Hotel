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
  about: {
    title: string;
    intro: string;
    detail: string;
    imageAlt: string;
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
    directionsBtn: string;
    listTitle: string;
    listSubtitle: string;
    nearbyPlaces: string;
    nearestAirport: string;
    transportHub: string;
    entertainment: string;
    others: string;
    landmarks: Record<string, { name: string; time: string; desc: string }>;
  };
  reviews: {
    title: string;
    subtitle: string;
    overallRating: string;
    verifiedGuests: string;
    filterAll: string;
    scoreText: string;
    prevAria: string;
    nextAria: string;
    items: Record<string, { quote: string; datePlatform: string }>;
  };
  faq: {
    title: string;
    subtitle: string;
    seeAll: string;
    items: { question: string; answer: string }[];
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
  reservation: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    checkInLabel: string;
    checkOutLabel: string;
    durationLabel: string;
    nightSingular: string;
    nightPlural: string;
    guestsLabel: string;
    roomsLabel: string;
    adultsSuffix: string;
    roomsSuffix: string;
    selectRoomCard: string;
    selectRoomDropdown: string;
    selectedBadge: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailError: string;
    phoneLabel: string;
    phonePlaceholder: string;
    phoneError: string;
    specialRequestLabel: string;
    specialRequestPlaceholder: string;
    summaryTitle: string;
    summarySubtitle: string;
    roomTypeLabel: string;
    ratePerNight: string;
    totalStay: string;
    totalNights: string;
    taxServiceLabel: string;
    taxServiceIncluded: string;
    totalEstimate: string;
    btnSubmit: string;
    submitting: string;
    guaranteeText: string;
    successTitle: string;
    successSubtitle: string;
    bookingCodeLabel: string;
    guestNameLabel: string;
    bookingDetails: string;
    forwardWaBtn: string;
    makeNewBooking: string;
    validationAlert: string;
    bedPreferenceTitle: string;
    bedPreferenceDesc: string;
    bedTypeLabel: string;
    queenBedTitle: string;
    queenBedDesc: string;
    kingBedTitle: string;
    kingBedDesc: string;
    twinBedTitle: string;
    twinBedDesc: string;
    breakfastOptionTitle: string;
    breakfastOptionDesc: string;
    breakfastLabel: string;
    withBreakfastTitle: string;
    withBreakfastDesc: string;
    withBreakfastBadge: string;
    roomOnlyTitle: string;
    roomOnlyDesc: string;
    roomOnlyBadge: string;
    breakfastPerPaxRate: string;
  };
  quickBar: {
    title: string;
    durationPrefix: string;
    nightSingular: string;
    nightPlural: string;
    promoCodeLabel: string;
    promoDiscount: string;
    checkInLabel: string;
    checkOutLabel: string;
    guestsLabel: string;
    roomsLabel: string;
    adultGuestsSuffix: string;
    roomsSuffix: string;
    btnCheckAvailability: string;
    searching: string;
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
      subtitle: 'Menyatu untuk meleburkan batas antara kenyamanan rumah dan kemewahan hotel menjadi ruang favorit bagi perjalanan bisnis, momen kebersamaan keluarga, hingga perhelatan acara terbaik jantung Bogor.',
      tagline: 'Tempat peristirahatan pribadi Anda di jantung Kota Bogor - luas, tenang, dan terhubung dengan denyut nadi kota.',
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
    about: {
      title: 'Tentang IPB Convention Hotel',
      intro: 'IPB Convention Hotel adalah hotel konvensi di Kota Bogor yang terhubung langsung dengan Mall Botani Square dan IPB International Convention Center (IICC).',
      detail: 'Dengan 83 kamar bernuansa modern dan alami, hotel ini menjadi pilihan untuk perjalanan bisnis, liburan keluarga, maupun kegiatan MICE. Kebun Raya Bogor dan Terminal Baranangsiang juga berjarak kurang dari satu kilometer dari hotel.',
      imageAlt: 'Meja resepsionis di lobi IPB Convention Hotel'
    },
    rooms: {
      badge: 'AKOMODASI & PILIHAN KAMAR',
      title: 'Pilihan Kamar',
      subtitle: 'Setiap kamar dirancang dengan sentuhan kontemporer berkelas untuk memastikan istirahat berkualitas Anda di Kota Hujan.',
      startingFrom: 'Mulai dari',
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
        'suite': 'Kamar seluas 36 M² dengan ruang tamu terpisah, ranjang King berukuran besar, meja santai, dan kamar mandi dengan bathtub.',
        'grand-executive': 'Kamar eksekutif seluas 28 M² dengan lounge area eksklusif, ranjang King premium, dan fasilitas penunjang bisnis modern.',
        'executive': 'Kamar seluas 24 M² yang dirancang khusus bagi profesional dan pelaku bisnis dengan meja kerja nyaman serta pemandangan menawan.',
        'deluxe': 'Kamar seluas 22 M² yang menjadi pilihan favorit pelancong santai dengan pemandangan lanskap kota dan interior kontemporer.',
        'superior': 'Kamar seluas 20 M² dengan kenyamanan optimal, sentuhan interior hangat kontemporer, pilihan kasur Queen atau Twin, serta suasana tenang.',
        'standard': 'Kamar modern seluas 19 M² yang fungsional dan terjangkau dengan koneksi WiFi kencang untuk kenyamanan menginap.'
      },
      badges: {
        'suite': 'Suite',
        'grand-executive': 'Grand Executive',
        'executive': 'Executive',
        'deluxe': 'Deluxe',
        'superior': 'Superior',
        'standard': 'Standard'
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
      title: 'Galeri Kami',
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
      directionsBtn: 'Petunjuk Arah',
      listTitle: 'Tempat Penting Sekitar Hotel',
      listSubtitle: 'Jarak dihitung dari titik utama IPB Convention Hotel Bogor.',
      nearbyPlaces: 'Tempat Terdekat',
      nearestAirport: 'Bandara Terdekat',
      transportHub: 'Pusat Transportasi',
      entertainment: 'Hiburan/Atraksi',
      others: 'Lainnya',
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
      title: 'Kisah & Kesan',
      subtitle: 'Kepuasan dan kenyamanan Anda adalah prioritas utama setiap layanan kami.',
      overallRating: 'Skor Keseluruhan',
      verifiedGuests: 'Ulasan dari tamu yang telah menginap',
      filterAll: 'Semua Ulasan',
      scoreText: 'Skor Kepuasan Tamu: 4.8 / 5.0 dari 1.200+ ulasan terverifikasi',
      prevAria: 'Ulasan Sebelumnya',
      nextAria: 'Ulasan Berikutnya',
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
        },
        'review-4': {
          quote: 'Sudah beberapa kali menginap di sini, semua oke apalagi menu sarapannya oke banget',
          datePlatform: 'September 2026 · Traveloka'
        },
        'review-5': {
          quote: 'Staf ramah, makanan enak, ruangan nyaman, shower deras, handuk terasa wangi.',
          datePlatform: 'September 2026 · Traveloka'
        },
        'review-6': {
          quote: 'Nyaman, bersih, sarapan banyak pilihan, Wi-Fi di lantai 4 bagus.',
          datePlatform: 'September 2026 · Traveloka'
        }
      }
    },
    faq: {
      title: 'FAQ',
      subtitle: 'Pertanyaan yang sering diajukan seputar menginap di IPB Convention Hotel.',
      seeAll: 'Lihat Lebih Banyak',
      items: [
        {
          question: 'Jam berapa waktu check-in dan check-out?',
          answer: 'Check-in mulai pukul 14:00 WIB dan check-out paling lambat pukul 12:00 WIB.'
        },
        {
          question: 'Apakah tarif kamar sudah termasuk sarapan?',
          answer: 'Tarif kamar sudah termasuk sarapan (sesuai paket), akses WiFi, dan pajak pemerintah.'
        },
        {
          question: 'Bagaimana cara memesan kamar?',
          answer: 'Anda dapat memesan melalui formulir di halaman Reservasi, atau menghubungi petugas hotel via WhatsApp resmi maupun telepon.'
        },
        {
          question: 'Tipe kamar apa saja yang tersedia?',
          answer: 'Kami memiliki 83 kamar dengan tipe Standard, Superior, Deluxe, Executive, Grand Executive, dan Suite, berukuran 19 hingga 36 m².'
        },
        {
          question: 'Berapa kapasitas tamu per kamar?',
          answer: 'Suite untuk 2 dewasa + 1 anak, Standard untuk 1 - 2 dewasa, dan tipe lainnya untuk 2 dewasa.'
        },
        {
          question: 'Di mana lokasi hotel?',
          answer: 'Jl. Padjajaran Raya, Samping Mall Botani Square, Kota Bogor, Jawa Barat 16128. Hotel terhubung langsung dengan Mall Botani Square dan IPB International Convention Center (IICC).'
        },
        {
          question: 'Bagaimana akses menuju hotel dari bandara atau jalan tol?',
          answer: 'Terminal DAMRI Bandara Soekarno-Hatta berjarak sekitar 2 menit dari hotel, dan Gerbang Tol Baranangsiang (Jagorawi) sekitar 3 menit.'
        },
        {
          question: 'Apakah tersedia parkir?',
          answer: 'Ya, tersedia fasilitas parkir dan valet untuk tamu hotel.'
        },
        {
          question: 'Apakah hotel menyediakan ballroom dan ruang meeting?',
          answer: 'Ya, tersedia ballroom dan ruang meeting berkapasitas hingga 1.000 delegasi di kawasan IICC. Hubungi petugas kami via WhatsApp untuk penawaran acara Anda.'
        },
        {
          question: 'Apakah front desk buka 24 jam?',
          answer: 'Ya, front desk serta layanan concierge dan keamanan siaga 24 jam setiap hari.'
        },
        {
          question: 'Bagaimana cara menghubungi hotel?',
          answer: 'WhatsApp: +62 811-1330-659. Telepon: (0251) 834 5698 atau (0251) 834 5699. Email: info@ipbconventionhotel.com. Instagram: @ipbhotelbotanisquare.'
        }
      ]
    },
    footer: {
      aboutTitle: 'IPB Hotel & Convention',
      aboutDesc: 'Hotel konvensi terkemuka di Kota Bogor yang terhubung langsung dengan Mall Botani Square dan IPB International Convention Center (IICC).',
      tagline: 'Tempat peristirahatan pribadi Anda di jantung Kota Bogor - luas, tenang, dan terhubung dengan denyut nadi kota.',
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
      bookPrefix: 'Pesan',
      bookSuffix: 'Sekarang',
      keyboardHint: 'Gunakan tombol panah keyboard atau usap layar untuk navigasi',
      roomSizeLabel: 'Ukuran Kamar:',
      quickBook: 'Pesan',
      defaultCapacity: '2 Dewasa'
    },
    reservation: {
      badge: 'RESERVASI ONLINE RESMI',
      title: 'Formulir Reservasi Kamar',
      subtitle: 'Pesan kamar idaman Anda dengan mudah, aman, dan dapatkan garansi tarif langsung terbaik di IPB Convention Hotel Bogor.',
      step1Title: 'Jadwal Menginap & Tamu',
      step1Desc: 'Pilih tanggal Check-in dan Check-out Anda',
      step2Title: 'Pilihan Tipe Kamar',
      step2Desc: 'Pilih tipe kamar yang sesuai kebutuhan Anda',
      step3Title: 'Data Kontak Tamu',
      step3Desc: 'Informasi untuk konfirmasi dan voucher pemesanan',
      checkInLabel: 'Tanggal Check-in',
      checkOutLabel: 'Tanggal Check-out',
      durationLabel: 'Durasi Menginap',
      nightSingular: 'Malam',
      nightPlural: 'Malam',
      guestsLabel: 'Jumlah Tamu',
      roomsLabel: 'Jumlah Kamar',
      adultsSuffix: 'Tamu',
      roomsSuffix: 'Kamar',
      selectRoomCard: 'Pilih Kamar Ini',
      selectRoomDropdown: 'Pilih Tipe Kamar (Dropdown)',
      selectedBadge: 'Dipilih',
      fullNameLabel: 'Nama Lengkap',
      fullNamePlaceholder: 'cth. Budi Pratama',
      emailLabel: 'Alamat Email',
      emailPlaceholder: 'cth. budi@gmail.com',
      emailError: 'Format email tidak valid (contoh: nama@domain.com)',
      phoneLabel: 'Nomor WhatsApp',
      phonePlaceholder: 'cth. 08123456789 atau +62812xxxx',
      phoneError: 'Nomor WhatsApp tidak valid (minimal 9 digit angka)',
      specialRequestLabel: 'Permintaan Khusus (Opsional)',
      specialRequestPlaceholder: 'cth. Lantai tinggi, non-smoking, twin bed...',
      summaryTitle: 'Ringkasan Pemesanan',
      summarySubtitle: 'Rincian estimasi biaya secara real-time',
      roomTypeLabel: 'Tipe Kamar',
      ratePerNight: 'Tarif per Malam',
      totalStay: 'Durasi Menginap',
      totalNights: 'Malam',
      taxServiceLabel: 'Pajak & Biaya Layanan',
      taxServiceIncluded: 'Termasuk (Nett)',
      totalEstimate: 'Estimasi Total Biaya',
      btnSubmit: 'Pesan Sekarang',
      submitting: 'Memproses Reservasi...',
      guaranteeText: 'Reservasi menunggu konfirmasi hotel. Stok ditahan selama 30 menit setelah pemesanan tersimpan.',
      successTitle: 'Reservasi Tersimpan!',
      successSubtitle: 'Kode booking dan total biaya sudah tercatat. Reservasi masih menunggu konfirmasi hotel melalui WhatsApp.',
      bookingCodeLabel: 'Kode Booking:',
      guestNameLabel: 'Nama Tamu:',
      bookingDetails: 'Rincian Reservasi:',
      forwardWaBtn: 'Lanjutkan Konfirmasi via WhatsApp',
      makeNewBooking: 'Buat Reservasi Baru',
      validationAlert: 'Mohon lengkapi dan periksa kembali data formulir yang belum sesuai.',
      bedPreferenceTitle: 'Pilihan Tipe Tempat Tidur',
      bedPreferenceDesc: 'Pilih konfigurasi kasur yang Anda inginkan untuk kenyamanan menginap Anda',
      bedTypeLabel: 'Tipe Kasur',
      queenBedTitle: 'Queen Bed',
      queenBedDesc: '1 Kasur Queen (160×200 cm) nyaman untuk 2 orang',
      kingBedTitle: 'King Bed',
      kingBedDesc: '1 Kasur King ekstra luas (180/200×200 cm)',
      twinBedTitle: 'Twin Bed',
      twinBedDesc: '2 Kasur Single terpisah (100×200 cm)',
      breakfastOptionTitle: 'Opsi Sarapan',
      breakfastOptionDesc: 'Pilihan paket sarapan buffet di Restoran Nusantara Hotel',
      breakfastLabel: 'Paket Sarapan',
      withBreakfastTitle: 'Termasuk Sarapan Buffet',
      withBreakfastDesc: 'Sarapan prasmanan lezat untuk seluruh tamu setiap pagi',
      withBreakfastBadge: 'Rekomendasi',
      roomOnlyTitle: 'Hanya Kamar (Room Only)',
      roomOnlyDesc: 'Akomodasi tanpa paket sarapan',
      roomOnlyBadge: 'Tarif Dasar',
      breakfastPerPaxRate: '+Rp 75.000 / orang / malam'
    },
    quickBar: {
      title: 'Cek Ketersediaan Kamar & Tarif Terbaik',
      durationPrefix: 'Durasi Menginap:',
      nightSingular: 'Malam',
      nightPlural: 'Malam',
      promoCodeLabel: 'Kode Promo Diskon 10%:',
      promoDiscount: 'IPB2026',
      checkInLabel: 'Tanggal Check-in',
      checkOutLabel: 'Tanggal Check-out',
      guestsLabel: 'Jumlah Tamu',
      roomsLabel: 'Jumlah Kamar',
      adultGuestsSuffix: 'Tamu Dewasa',
      roomsSuffix: 'Kamar',
      btnCheckAvailability: 'Cek Ketersediaan',
      searching: 'Memeriksa...'
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
      subtitle: 'Blurring the line between the comfort of home and the luxury of a hotel, a favorite space for business trips, family moments, and the finest events in the heart of Bogor.',
      tagline: "Your private sanctuary in the heart of Bogor - spacious, serene, and connected to the city's pulse.",
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
    about: {
      title: 'About IPB Convention Hotel',
      intro: 'IPB Convention Hotel is a convention hotel in Bogor City, directly connected to Botani Square Mall and IPB International Convention Center (IICC).',
      detail: 'With 83 rooms blending modern and natural touches, the hotel suits business trips, family holidays, and MICE events alike. Bogor Botanical Garden and Baranangsiang Terminal are both less than a kilometer away.',
      imageAlt: 'Reception desk in the lobby of IPB Convention Hotel'
    },
    rooms: {
      badge: 'ACCOMMODATIONS & ROOM TYPES',
      title: 'Room Options',
      subtitle: 'Every room is crafted with refined contemporary aesthetics to ensure a relaxing and restorative stay in the Rain City.',
      startingFrom: 'Starting from',
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
        'suite': 'A luxurious 36 M² suite featuring a separate living room, grand King bed, plush lounge area, and an ensuite bathroom with bathtub.',
        'grand-executive': 'Spacious 28 M² executive room featuring an exclusive lounge area, premium King bed, and comprehensive modern business amenities.',
        'executive': 'A 24 M² room specifically curated for professionals and corporate guests, complete with an ergonomic work desk and panoramic city vistas.',
        'deluxe': 'A 22 M² room and favorite choice for leisure travelers, showcasing dynamic urban views and tasteful contemporary design.',
        'superior': 'A 20 M² room offering optimal comfort enriched by warm contemporary decor, Queen or Twin bed options, and a tranquil ambiance.',
        'standard': 'A functional and cost-effective 19 M² modern room with high-speed Wi-Fi, perfect for a cozy and restful stay.'
      },
      badges: {
        'suite': 'Suite',
        'grand-executive': 'Grand Executive',
        'executive': 'Executive',
        'deluxe': 'Deluxe',
        'superior': 'Superior',
        'standard': 'Standard'
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
      title: 'Our Gallery',
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
      directionsBtn: 'Get Directions',
      listTitle: 'Key Locations Around Hotel',
      listSubtitle: 'Distances calculated from IPB Convention Hotel Bogor.',
      nearbyPlaces: 'Nearby Places',
      nearestAirport: 'Nearest airport',
      transportHub: 'Transportation Hub',
      entertainment: 'Entertainment/Attraction',
      others: 'Others',
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
      title: 'Stories & Impressions',
      subtitle: 'Your comfort and satisfaction remain the heart of our hospitality philosophy.',
      overallRating: 'Overall Rating Score',
      verifiedGuests: 'Verified reviews from staying guests',
      filterAll: 'All Reviews',
      scoreText: 'Guest Satisfaction Score: 4.8 / 5.0 from 1,200+ verified reviews',
      prevAria: 'Previous Review',
      nextAria: 'Next Review',
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
        },
        'review-4': {
          quote: "I've stayed here several times, everything is okay, especially the breakfast menu is really good.",
          datePlatform: 'September 2026 · Traveloka'
        },
        'review-5': {
          quote: 'Friendly staff, delicious food, comfortable room, powerful shower, fragrant towels.',
          datePlatform: 'September 2026 · Traveloka'
        },
        'review-6': {
          quote: 'Comfortable, clean, lots of breakfast choices, good Wi-Fi on the 4th floor.',
          datePlatform: 'September 2026 · Traveloka'
        }
      }
    },
    faq: {
      title: 'FAQ',
      subtitle: 'Frequently asked questions about staying at IPB Convention Hotel.',
      seeAll: 'See All',
      items: [
        {
          question: 'What are the check-in and check-out times?',
          answer: 'Check-in starts at 14:00 WIB and check-out is by 12:00 WIB.'
        },
        {
          question: 'Do room rates include breakfast?',
          answer: 'Room rates include breakfast (depending on the package), WiFi access, and government tax.'
        },
        {
          question: 'How do I book a room?',
          answer: 'You can book through the form on our Reservation page, or contact our hotel officer via official WhatsApp or phone.'
        },
        {
          question: 'What room types are available?',
          answer: 'We have 83 rooms across Standard, Superior, Deluxe, Executive, Grand Executive, and Suite types, ranging from 19 to 36 m².'
        },
        {
          question: 'How many guests can stay in a room?',
          answer: 'Suite fits 2 adults + 1 child, Standard fits 1 - 2 adults, and all other types fit 2 adults.'
        },
        {
          question: 'Where is the hotel located?',
          answer: 'Jl. Padjajaran Raya, next to Botani Square Mall, Bogor City, West Java 16128. The hotel is directly connected to Botani Square Mall and IPB International Convention Center (IICC).'
        },
        {
          question: 'How do I reach the hotel from the airport or toll road?',
          answer: 'The DAMRI Soekarno-Hatta Airport terminal is about 2 minutes from the hotel, and the Baranangsiang (Jagorawi) toll gate is about 3 minutes away.'
        },
        {
          question: 'Is parking available?',
          answer: 'Yes, parking and valet service are available for hotel guests.'
        },
        {
          question: 'Does the hotel offer a ballroom and meeting rooms?',
          answer: 'Yes, a ballroom and meeting rooms for up to 1,000 delegates are available in the IICC area. Contact our officer via WhatsApp for an event quote.'
        },
        {
          question: 'Is the front desk open 24 hours?',
          answer: 'Yes, the front desk, concierge, and security are on standby 24 hours a day.'
        },
        {
          question: 'How can I contact the hotel?',
          answer: 'WhatsApp: +62 811-1330-659. Phone: (0251) 834 5698 or (0251) 834 5699. Email: info@ipbconventionhotel.com. Instagram: @ipbhotelbotanisquare.'
        }
      ]
    },
    footer: {
      aboutTitle: 'IPB Hotel & Convention',
      aboutDesc: 'Premier convention hotel in Bogor City, directly connected to Botani Square Mall and IPB International Convention Center (IICC).',
      tagline: "Your private sanctuary in the heart of Bogor - spacious, serene, and connected to the city's pulse.",
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
      bookPrefix: 'Book',
      bookSuffix: 'Now',
      keyboardHint: 'Use keyboard arrow keys or swipe screen to navigate',
      roomSizeLabel: 'Room Size:',
      quickBook: 'Book',
      defaultCapacity: '2 Adults'
    },
    reservation: {
      badge: 'OFFICIAL ONLINE RESERVATION',
      title: 'Room Reservation Form',
      subtitle: 'Book your preferred room easily, securely, and enjoy the guaranteed best direct rates at IPB Convention Hotel Bogor.',
      step1Title: 'Stay Dates & Guests',
      step1Desc: 'Select your Check-in and Check-out dates',
      step2Title: 'Select Room Type',
      step2Desc: 'Choose the room category that best fits your stay',
      step3Title: 'Guest Contact Details',
      step3Desc: 'Information for reservation confirmation and voucher',
      checkInLabel: 'Check-in Date',
      checkOutLabel: 'Check-out Date',
      durationLabel: 'Duration of Stay',
      nightSingular: 'Night',
      nightPlural: 'Nights',
      guestsLabel: 'Number of Guests',
      roomsLabel: 'Number of Rooms',
      adultsSuffix: 'Guests',
      roomsSuffix: 'Rooms',
      selectRoomCard: 'Select This Room',
      selectRoomDropdown: 'Select Room Type (Dropdown)',
      selectedBadge: 'Selected',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'e.g. John Doe',
      emailLabel: 'Email Address',
      emailPlaceholder: 'e.g. johndoe@gmail.com',
      emailError: 'Invalid email address format (example: name@domain.com)',
      phoneLabel: 'WhatsApp / Phone Number',
      phonePlaceholder: 'e.g. 08123456789 or +62812xxxx',
      phoneError: 'Invalid WhatsApp number (minimum 9 digits)',
      specialRequestLabel: 'Special Requests (Optional)',
      specialRequestPlaceholder: 'e.g. High floor, non-smoking, twin beds, early check-in...',
      summaryTitle: 'Booking Summary',
      summarySubtitle: 'Real-time estimated cost breakdown',
      roomTypeLabel: 'Room Type',
      ratePerNight: 'Nightly Rate',
      totalStay: 'Duration of Stay',
      totalNights: 'Nights',
      taxServiceLabel: 'Taxes & Service Charge',
      taxServiceIncluded: 'Included (Nett)',
      totalEstimate: 'Estimated Total Price',
      btnSubmit: 'Book Now',
      submitting: 'Processing Reservation...',
      guaranteeText: 'Your booking awaits hotel confirmation. Rooms are held for 30 minutes after the booking is saved.',
      successTitle: 'Reservation Saved!',
      successSubtitle: 'Your booking code and total have been recorded. Contact the hotel on WhatsApp for confirmation.',
      bookingCodeLabel: 'Booking Code:',
      guestNameLabel: 'Guest Name:',
      bookingDetails: 'Reservation Details:',
      forwardWaBtn: 'Confirm via WhatsApp',
      makeNewBooking: 'Make Another Reservation',
      validationAlert: 'Please review and fill in all required form fields.',
      bedPreferenceTitle: 'Bed Type Preference',
      bedPreferenceDesc: 'Select your preferred bed setup for maximum comfort (Queen, King, or Twin)',
      bedTypeLabel: 'Bed Configuration',
      queenBedTitle: 'Queen Bed',
      queenBedDesc: '1 Queen Bed (160×200 cm) perfect for 2 guests',
      kingBedTitle: 'King Bed',
      kingBedDesc: '1 Grand King Bed extra spacious (180/200×200 cm)',
      twinBedTitle: 'Twin Bed',
      twinBedDesc: '2 Separate Single Beds (100×200 cm)',
      breakfastOptionTitle: 'Breakfast Package',
      breakfastOptionDesc: 'Choose your breakfast dining plan at Nusantara Restaurant',
      breakfastLabel: 'Breakfast Plan',
      withBreakfastTitle: 'Buffet Breakfast Included',
      withBreakfastDesc: 'Full daily morning buffet for all staying guests',
      withBreakfastBadge: 'Recommended',
      roomOnlyTitle: 'Room Only (No Breakfast)',
      roomOnlyDesc: 'Accommodation only without breakfast package',
      roomOnlyBadge: 'Standard Rate',
      breakfastPerPaxRate: '+Rp 75,000 / guest / night'
    },
    quickBar: {
      title: 'Check Room Availability & Best Rates',
      durationPrefix: 'Stay Duration:',
      nightSingular: 'Night',
      nightPlural: 'Nights',
      promoCodeLabel: '10% Promo Code:',
      promoDiscount: 'IPB2026',
      checkInLabel: 'Check-in Date',
      checkOutLabel: 'Check-out Date',
      guestsLabel: 'Guests',
      roomsLabel: 'Rooms',
      adultGuestsSuffix: 'Adult Guests',
      roomsSuffix: 'Rooms',
      btnCheckAvailability: 'Check Availability',
      searching: 'Searching...'
    }
  }
};
