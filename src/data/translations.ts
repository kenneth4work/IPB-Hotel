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
  };
  hero: {
    badge: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
    ctaRooms: string;
    ctaContact: string;
    ratingText: string;
    highlights: {
      location: string;
      locationDesc: string;
      amenities: string;
      amenitiesDesc: string;
      dining: string;
      diningDesc: string;
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
    amenityLabels: Record<string, string>;
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
  };
  location: {
    badge: string;
    title: string;
    subtitle: string;
    addressLabel: string;
    openInMaps: string;
    landmarksTitle: string;
    transportTitle: string;
  };
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    overallRating: string;
    verifiedGuests: string;
    filterAll: string;
  };
  specialOffer: {
    badge: string;
    title: string;
    subtitle: string;
    codeLabel: string;
    claimOffer: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    formTitle: string;
    formName: string;
    formEmail: string;
    formPhone: string;
    formSubject: string;
    formRoomType: string;
    formDate: string;
    formRoom: string;
    formMessage: string;
    formSubmit: string;
    contactInfoTitle: string;
  };
  footer: {
    aboutTitle: string;
    aboutDesc: string;
    rooms: string;
    quickLinks: string;
    contactUs: string;
    contact: string;
    copyright: string;
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
      switchLang: 'Ubah ke Bahasa Inggris (EN)'
    },
    hero: {
      badge: 'Boutique Hotel & Convention · Bogor',
      titleMain: 'Pengalaman Menginap Istimewa di',
      titleHighlight: 'Pusat Kota Bogor',
      subtitle: 'Kombinasi sempurna antara kemewahan modern, kehangatan layanan khas IPB, dan akses langsung ke Botanical Square Mall serta Kebun Raya Bogor.',
      ctaRooms: 'Lihat Pilihan Kamar',
      ctaContact: 'Konsultasi & Reservasi',
      ratingText: 'Sangat Memuaskan · 1.200+ Tamu Terverifikasi',
      highlights: {
        location: 'Lokasi Prime Sentral',
        locationDesc: 'Langkah langsung ke Botani Square Mall & Tol Jagorawi',
        amenities: 'Fasilitas Konvensi Unggul',
        amenitiesDesc: 'Ballroom & ruang meeting berkapasitas hingga 1.000 delegasi',
        dining: 'Kuliner Nusantara & Internasional',
        diningDesc: 'Santap lezat resto berbintang dengan menu pilihan koki berpengalaman'
      }
    },
    rooms: {
      badge: 'Akomodasi Nyaman',
      title: 'Pilihan Kamar & Suite Eksklusif',
      subtitle: 'Setiap kamar dirancang dengan sentuhan kontemporer berkelas untuk memastikan istirahat berkualitas Anda di Kota Hujan.',
      startingFrom: 'Mulai dari',
      perNight: '/ malam',
      viewDetails: 'Detail Kamar',
      bookViaWa: 'Pesan Kamar Ini',
      allRooms: 'Semua Tipe Kamar',
      amenityLabels: {
        'Living Room': 'Ruang Tamu Terpisah',
        'King Bed': 'Ranjang King Size',
        'Queen Bed': 'Ranjang Queen Size',
        'Double Bed': 'Ranjang Double',
        'Smart TV': 'Smart TV 43"',
        'Mini Bar': 'Mini Bar & Kulkas',
        'Work Desk': 'Meja Kerja Ergonomis',
        'Balkon': 'Balkon Pribadi',
        'TV': 'TV Layar Datar',
        'AC': 'AC Dingin & Sunyi',
        'City View': 'Pemandangan Kota',
        'WiFi': 'WiFi Kecepatan Tinggi'
      }
    },
    gallery: {
      badge: 'Dokumentasi Visual',
      title: 'Potret Keindahan Hotel Kami',
      subtitle: 'Jelajahi sudut kenyamanan, estetika arsitektur, dan suasana hangat yang menanti kedatangan Anda.',
      categories: {
        all: 'Semua Koleksi',
        rooms: 'Kamar & Suite',
        facilities: 'Fasilitas & Lobi',
        dining: 'Restoran & Bar',
        meeting: 'Meeting & Event'
      }
    },
    location: {
      badge: 'Aksesibilitas Utama',
      title: 'Lokasi Strategis di Jantung Kota Bogor',
      subtitle: 'Terhubung langsung dengan akses transportasi utama dan destinasi wisata favorit di Kota Bogor.',
      addressLabel: 'Alamat Hotel:',
      openInMaps: 'Buka Petunjuk Arah di Google Maps',
      landmarksTitle: 'Destinasi Sekitar Hotel',
      transportTitle: 'Konektivitas Transportasi'
    },
    reviews: {
      badge: 'Testimoni Asli',
      title: 'Apa Kata Tamu Kami',
      subtitle: 'Kepuasan dan kenyamanan Anda adalah prioritas utama setiap layanan kami.',
      overallRating: 'Skor Keseluruhan',
      verifiedGuests: 'Ulasan dari tamu yang telah menginap',
      filterAll: 'Semua Ulasan'
    },
    specialOffer: {
      badge: 'Penawaran Eksklusif Terbatas',
      title: 'Diskon Spesial Hingga 20% Reservasi Langsung',
      subtitle: 'Dapatkan harga terbaik tanpa perantara, sarapan gratis untuk 2 orang, dan fasilitas check-out lebih fleksibel.',
      codeLabel: 'Gunakan Kode Promo:',
      claimOffer: 'Klaim Promo via WhatsApp'
    },
    contact: {
      badge: 'Layanan Bantuan 24/7',
      title: 'Kami Siap Membantu Anda',
      subtitle: 'Punya pertanyaan mengenai sewa ballroom, reservasi kamar, atau paket pertemuan? Tim kami siap melayani Anda.',
      formTitle: 'Kirim Pesan',
      formName: 'Nama Lengkap',
      formEmail: 'Email',
      formPhone: 'Nomor WhatsApp / Telepon',
      formSubject: 'Keperluan',
      formRoomType: 'Pilihan Tipe Kamar',
      formDate: 'Tanggal Menginap / Acara',
      formRoom: 'Tipe Kamar / Kebutuhan',
      formMessage: 'Pesan Tambahan atau Pertanyaan',
      formSubmit: 'Kirim Pesan',
      contactInfoTitle: 'Kontak Langsung'
    },
    footer: {
      aboutTitle: 'IPB Hotel & Convention',
      aboutDesc: 'Hotel konvensi bintang 3+ terkemuka di Kota Bogor, berpadu harmonis dengan komitmen akademik dan pelayanan hospitality terbaik Indonesia.',
      rooms: 'Pilihan Kamar',
      quickLinks: 'Navigasi Cepat',
      contactUs: 'Pusat Informasi & Bantuan',
      contact: 'Kontak Resmi',
      copyright: 'Hak Cipta Dilindungi. IPB Hotel & Convention Center Bogor.'
    },
    modal: {
      roomDetailTitle: 'Spesifikasi & Fasilitas Kamar',
      size: 'Ukuran Kamar',
      capacity: 'Kapasitas',
      bedType: 'Tipe Tempat Tidur',
      facilities: 'Fasilitas Unggulan',
      description: 'Tentang Kamar',
      close: 'Tutup',
      bookThisRoom: 'Lanjutkan Pemesanan Kamar Ini'
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
      switchLang: 'Switch to Indonesian (ID)'
    },
    hero: {
      badge: 'Boutique Hotel & Convention · Bogor',
      titleMain: 'An Extraordinary Stay in the',
      titleHighlight: 'Heart of Bogor City',
      subtitle: 'The perfect blend of modern comfort, renowned IPB hospitality, and direct access to Botani Square Mall and Bogor Botanical Gardens.',
      ctaRooms: 'Explore Rooms',
      ctaContact: 'Inquiry & Reservation',
      ratingText: 'Exceptional Rating · 1,200+ Verified Guests',
      highlights: {
        location: 'Prime Central Location',
        locationDesc: 'Direct steps to Botani Square Mall & Jagorawi Toll Gate',
        amenities: 'Superior Convention Facilities',
        amenitiesDesc: 'Ballroom & meeting venues hosting up to 1,000 delegates',
        dining: 'Indonesian & International Dining',
        diningDesc: 'Savor exquisite dishes prepared by experienced master chefs'
      }
    },
    rooms: {
      badge: 'Cozy Accommodations',
      title: 'Exclusive Rooms & Suites',
      subtitle: 'Every room is crafted with refined contemporary aesthetics to ensure a relaxing and restorative stay in the Rain City.',
      startingFrom: 'Starting from',
      perNight: '/ night',
      viewDetails: 'Room Details',
      bookViaWa: 'Book This Room',
      allRooms: 'All Room Types',
      amenityLabels: {
        'Living Room': 'Separate Living Room',
        'King Bed': 'King Size Bed',
        'Queen Bed': 'Queen Size Bed',
        'Double Bed': 'Double Bed',
        'Smart TV': '43" Smart TV',
        'Mini Bar': 'Mini Bar & Fridge',
        'Work Desk': 'Ergonomic Work Desk',
        'Balkon': 'Private Balcony',
        'TV': 'Flat Screen TV',
        'AC': 'Whisper-Quiet AC',
        'City View': 'Panoramic City View',
        'WiFi': 'High-Speed Wi-Fi'
      }
    },
    gallery: {
      badge: 'Visual Gallery',
      title: 'Moments of Hotel Elegance',
      subtitle: 'Discover our welcoming corners, tasteful architecture, and warm atmosphere awaiting your arrival.',
      categories: {
        all: 'All Collections',
        rooms: 'Rooms & Suites',
        facilities: 'Facilities & Lobby',
        dining: 'Restaurant & Bar',
        meeting: 'Meetings & Events'
      }
    },
    location: {
      badge: 'Ultimate Accessibility',
      title: 'Strategic Location in Central Bogor',
      subtitle: 'Seamlessly connected to major transport links and iconic Bogor tourism landmarks.',
      addressLabel: 'Hotel Address:',
      openInMaps: 'Open Directions in Google Maps',
      landmarksTitle: 'Nearby Landmarks',
      transportTitle: 'Transit & Connectivity'
    },
    reviews: {
      badge: 'Genuine Feedback',
      title: 'What Our Guests Say',
      subtitle: 'Your comfort and satisfaction remain the heart of our hospitality philosophy.',
      overallRating: 'Overall Rating Score',
      verifiedGuests: 'Verified reviews from staying guests',
      filterAll: 'All Reviews'
    },
    specialOffer: {
      badge: 'Limited Exclusive Offer',
      title: 'Special Direct Booking Discount Up to 20%',
      subtitle: 'Enjoy the best guaranteed direct rates, complimentary breakfast for two, and flexible late check-out privileges.',
      codeLabel: 'Use Promo Code:',
      claimOffer: 'Claim Offer via WhatsApp'
    },
    contact: {
      badge: '24/7 Hospitality Desk',
      title: 'We Are Here to Assist You',
      subtitle: 'Have questions regarding meeting hall rentals, room bookings, or corporate event packages? Our team is always ready.',
      formTitle: 'Send a Message',
      formName: 'Full Name',
      formEmail: 'Email Address',
      formPhone: 'WhatsApp / Phone Number',
      formSubject: 'Subject / Inquiry Type',
      formRoomType: 'Room Type Selection',
      formDate: 'Stay / Event Date',
      formRoom: 'Room Type / Requirement',
      formMessage: 'Additional Notes or Inquiries',
      formSubmit: 'Send Message',
      contactInfoTitle: 'Direct Contacts'
    },
    footer: {
      aboutTitle: 'IPB Hotel & Convention',
      aboutDesc: 'Bogor’s premier convention hotel, uniquely uniting academic excellence with authentic Indonesian warmth and hospitality.',
      rooms: 'Room Options',
      quickLinks: 'Quick Links',
      contactUs: 'Help & Information Center',
      contact: 'Official Contacts',
      copyright: 'All Rights Reserved. IPB Hotel & Convention Center Bogor.'
    },
    modal: {
      roomDetailTitle: 'Room Specifications & Amenities',
      size: 'Room Size',
      capacity: 'Capacity',
      bedType: 'Bed Configuration',
      facilities: 'Key Amenities',
      description: 'Room Overview',
      close: 'Close',
      bookThisRoom: 'Proceed to Book This Room'
    }
  }
};
