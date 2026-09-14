import { HotelConfig, Review, GalleryItem, RoomData } from '../types';
import suiteRoomImg from '../assets/images/regenerated_image_1789105967978.jpg';
import grandExecutiveRoomImg from '../assets/images/regenerated_image_1789108862742.jpg';
import executiveRoomImg from '../assets/images/regenerated_image_1789098346345.jpg';
import deluxeRoomImg from '../assets/images/regenerated_image_1789098352552.jpg';
import superiorRoomImg from '../assets/images/regenerated_image_1789098940245.jpg';
import standardRoomImg from '../assets/images/regenerated_image_1789098357914.jpg';
import grandLobbyImg from '../assets/images/regenerated_image_1789105660824.jpg';
import galleryBallroomImg from '../assets/images/regenerated_image_1789109938317.jpg';
import galleryDiningImg from '../assets/images/regenerated_image_1789109942226.jpg';
import gallerySuiteImg from '../assets/images/regenerated_image_1789109946006.jpg';
import galleryMallImg from '../assets/images/regenerated_image_1789109949049.jpg';
import galleryLoungeImg from '../assets/images/regenerated_image_1789109954250.jpg';

export const ROOMS_DATA: RoomData[] = [
  {
    id: "suite",
    badge: "SUITE",
    size: "36 M²",
    name: "Suite Room",
    description: "Kamar termewah dengan ruang tamu terpisah, ranjang King berukuran besar, meja santai, dan kamar mandi dengan bathtub.",
    amenities: ["Ruang Tamu", "Ranjang King", "Smart TV", "Bathtub & Mini Bar"],
    price: "Rp 1.350.000",
    priceUnit: "/malam",
    images: [
      "Suite/SU1.jpg"
    ]
  },
  {
    id: "grand-executive",
    badge: "GRAND EXECUTIVE",
    size: "28 M²",
    name: "Grand Executive Room",
    description: "Kamar eksekutif ekstra luas dengan lounge area eksklusif, ranjang King premium, dan fasilitas penunjang bisnis modern.",
    amenities: ["Ranjang King", "Lounge Area", "Smart TV 50\"", "Mesin Kopi & Teh"],
    price: "Rp 1.050.000",
    priceUnit: "/malam",
    images: [
      "GrandExecutive/GE1.jpg"
    ]
  },
  {
    id: "executive",
    badge: "EXECUTIVE",
    size: "24 M²",
    name: "Executive Room",
    description: "Dirancang khusus bagi profesional dan pelaku bisnis dengan meja kerja nyaman serta pemandangan menawan.",
    amenities: ["Ranjang King", "Smart TV", "Meja Kerja", "Balkon Pribadi"],
    price: "Rp 900.000",
    priceUnit: "/malam",
    images: [
      "Execuitve/X1.jpg"
    ]
  },
  {
    id: "deluxe",
    badge: "DELUXE",
    size: "22 M²",
    name: "Deluxe Room",
    description: "Pilihan favorit untuk pelancong santai dengan pemandangan lanskap kota dan interior kontemporer.",
    amenities: ["Ranjang Queen", "TV Layar Datar", "AC Dingin", "Pemandangan Kota"],
    price: "Rp 800.000",
    priceUnit: "/malam",
    images: [
      "Deluxe/D1.jpg"
    ]
  },
  {
    id: "superior",
    badge: "SUPERIOR",
    size: "20 M²",
    name: "Superior Room",
    description: "Kenyamanan optimal dengan sentuhan interior hangat kontemporer, pilihan kasur Queen atau Twin, serta suasana tenang yang menenangkan.",
    amenities: ["Ranjang Queen / Twin", "TV Layar Datar", "AC Dingin", "Water Heater"],
    price: "Rp 700.000",
    priceUnit: "/malam",
    images: [
      "Superior/SP1.jpg"
    ]
  },
  {
    id: "standard",
    badge: "STANDARD",
    size: "19 M²",
    name: "Standard Room",
    description: "Kamar modern yang fungsional dan terjangkau dengan koneksi WiFi kencang untuk kenyamanan menginap.",
    amenities: ["Ranjang Double", "TV Layar Datar", "AC Dingin", "WiFi Kencang"],
    price: "Rp 600.000",
    priceUnit: "/malam",
    images: [
      "Standard/S1.jpg"
    ]
  }
];

export const FALLBACK_ROOM_IMAGES: Record<string, string> = {
  // Suite Room
  "Suite/SU1.jpg": suiteRoomImg,
  "Suite/SU2.jpg": "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
  "Suite/SU3.jpg": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
  "Suite/SU4.jpg": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
  "Suite/SU5.jpg": "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
  "Suite/SU 5.jpg": "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
  "Suite/SU6.jpg": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  "images/rooms/suite-1.jpg": suiteRoomImg,
  "images/rooms/suite-2.jpg": "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
  "images/rooms/suite-3.jpg": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
  "images/rooms/suite-4.jpg": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
  "images/rooms/suite-5.jpg": "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
  "images/rooms/suite-6.jpg": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",

  // Grand Executive Room
  "GrandExecutive/GE1.jpg": grandExecutiveRoomImg,
  "GrandExecutive/GE2.jpg": grandExecutiveRoomImg,
  "GrandExecutive/GE3.jpg": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
  "images/rooms/grand-executive-1.jpg": grandExecutiveRoomImg,

  // Executive Room - 5 Images
  "Execuitve/X1.jpg": executiveRoomImg,
  "Execuitve/X2.jpg": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
  "Execuitve/X3.jpg": "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80",
  "Execuitve/X4.jpg": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
  "Execuitve/X5.jpg": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
  "Executive/X1.jpg": executiveRoomImg,
  "images/rooms/executive-1.jpg": executiveRoomImg,
  "images/rooms/executive-2.jpg": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
  "images/rooms/executive-3.jpg": "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80",
  "images/rooms/executive-4.jpg": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",

  // Deluxe Room - 5 Images
  "Deluxe/D1.jpg": deluxeRoomImg,
  "Deluxe/D2.jpg": "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=80",
  "Deluxe/D3.jpg": "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80",
  "Deluxe/D4.jpg": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
  "Deluxe/D5.jpg": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
  "images/rooms/deluxe-1.jpg": deluxeRoomImg,
  "images/rooms/deluxe-2.jpg": "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=80",
  "images/rooms/deluxe-3.jpg": "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80",
  "images/rooms/deluxe-4.jpg": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",

  // Superior Room
  "Superior/SP1.jpg": superiorRoomImg,
  "Superior/SP2.jpg": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
  "images/rooms/superior-1.jpg": superiorRoomImg,

  // Standard Room - 3 Images
  "Standard/S1.jpg": standardRoomImg,
  "Standard/S2.jpg": "https://images.unsplash.com/photo-1587985064135-0366536eab42?auto=format&fit=crop&w=1200&q=80",
  "Standard/S3.jpg": "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1200&q=80",
  "images/rooms/standard-1.jpg": standardRoomImg,
  "images/rooms/standard-2.jpg": "https://images.unsplash.com/photo-1587985064135-0366536eab42?auto=format&fit=crop&w=1200&q=80",
  "images/rooms/standard-3.jpg": "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1200&q=80"
};

export function getRoomImageUrl(imgPath: string): string {
  if (!imgPath) return '';
  if (
    imgPath.startsWith('blob:') ||
    imgPath.startsWith('http://') || 
    imgPath.startsWith('https://') || 
    imgPath.startsWith('data:') || 
    imgPath.startsWith('/') ||
    imgPath.startsWith('./') ||
    imgPath.startsWith('../')
  ) {
    return imgPath;
  }
  return FALLBACK_ROOM_IMAGES[imgPath] || imgPath;
}

export const HOTEL_CONFIG: HotelConfig = {
  name: "IPB Convention Hotel",
  tagline: "Di Jantung Kota Bogor, Dekat Segalanya",
  address: "Jl. Padjajaran Raya, Samping Mall Botani Square, Kota Bogor, Jawa Barat 16128",
  phones: ["(0251) 834 5698", "(0251) 834 5699"],
  email: "info@ipbconventionhotel.com",
  instagram: "@ipbhotelbotanisquare",
  checkIn: "14:00 WIB",
  checkOut: "12:00 WIB",
  googleMapsUrl: "https://maps.google.com/?q=IPB+Convention+Hotel+Bogor",
  whatsappNumber: "628111330659",
  rooms: ROOMS_DATA.map((r) => ({
    id: r.id,
    name: r.name,
    type: r.name,
    badge: r.badge,
    size: r.size,
    price: r.price,
    priceFormatted: r.priceFormatted || (typeof r.price === 'number' ? `Rp ${r.price.toLocaleString('id-ID')}` : r.price),
    amenities: r.amenities.map((a) => typeof a === 'string' ? a : a.name),
    image: r.images[0],
    images: r.images,
    fallbackImage: FALLBACK_ROOM_IMAGES[r.images[0]] || r.images[0],
    description: r.description,
    bedType: r.id === 'suite'
      ? 'King Bed (200x200)'
      : r.id === 'grand-executive'
      ? 'King Bed (180x200)'
      : r.id === 'executive'
      ? 'King Bed (180x200)'
      : r.id === 'deluxe'
      ? 'Queen Bed (160x200)'
      : r.id === 'superior'
      ? 'Queen / Twin Bed'
      : 'Double Bed / Twin Bed',
    capacity: r.id === 'suite' ? '2 Dewasa + 1 Anak' : r.id === 'standard' ? '1 - 2 Dewasa' : '2 Dewasa'
  }))
};

export const REVIEWS: Review[] = [
  {
    id: "review-1",
    author: "Ahmad Fauzi",
    rating: 5.0,
    quote: "Kamar sangat nyaman dan bersih. Lokasi sangat strategis, langsung terhubung ke mall. Staf hotel ramah dan responsif. Pasti akan menginap lagi!",
    datePlatform: "Maret 2026 · Google",
    avatarBg: "bg-amber-100 text-amber-900 border-amber-300"
  },
  {
    id: "review-2",
    author: "Siti Nurhaliza",
    rating: 5.0,
    quote: "Sangat cocok untuk acara seminar dan pertemuan bisnis. Fasilitas lengkap, akses ke IICC sangat mudah. Sarapan enak dan bervariasi.",
    datePlatform: "Februari 2026 · Booking.com",
    avatarBg: "bg-emerald-100 text-emerald-900 border-emerald-300"
  },
  {
    id: "review-3",
    author: "Budi Santoso",
    rating: 4.0,
    quote: "Hotel yang bagus dengan harga terjangkau. Kamar Suite sangat luas dan nyaman untuk keluarga. Akan saya rekomendasikan kepada teman-teman.",
    datePlatform: "Januari 2026 · TripAdvisor",
    avatarBg: "bg-slate-100 text-slate-800 border-slate-300"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Grand Lobby & Hospitality Lounge",
    category: "Lobby & Area Publik",
    image: grandLobbyImg,
    spanClass: "col-span-1 md:col-span-2 md:row-span-2"
  },
  {
    id: "gal-2",
    title: "IICC Grand Ballroom & Convention",
    category: "MICE & Acara",
    image: galleryBallroomImg,
    spanClass: "col-span-1 md:col-span-1 md:row-span-1"
  },
  {
    id: "gal-3",
    title: "Terrace Dining & Restoran Nusantara",
    category: "Kuliner & Resto",
    image: galleryDiningImg,
    spanClass: "col-span-1 md:col-span-1 md:row-span-1"
  },
  {
    id: "gal-4",
    title: "Kenyamanan Suite & Kamar Tamu",
    category: "Akomodasi",
    image: gallerySuiteImg,
    spanClass: "col-span-1 md:col-span-1 md:row-span-1"
  },
  {
    id: "gal-5",
    title: "Akses Terintegrasi Mall Botani Square",
    category: "Lokasi & Eksterior",
    image: galleryMallImg,
    spanClass: "col-span-1 md:col-span-1 md:row-span-1"
  },
  {
    id: "gal-6",
    title: "Rooftop",
    category: "Fasilitas Kerja",
    image: galleryLoungeImg,
    spanClass: "col-span-1 md:col-span-2 md:row-span-1"
  }
];

export const NEARBY_LANDMARKS = [
  { name: "Mall Botani Square", time: "1 Menit", desc: "Akses langsung melalui jembatan penghubung hotel" },
  { name: "IPB International Convention Center (IICC)", time: "1 Menit", desc: "Terintegrasi langsung di satu kawasan gedung" },
  { name: "Kebun Raya Bogor", time: "5 Menit", desc: "Ikon paru-paru hijau Kota Hujan dan Istana Kepresidenan" },
  { name: "Terminal DAMRI Bandara Soekarno-Hatta", time: "2 Menit", desc: "Kemudahan transportasi langsung ke dan dari bandara" },
  { name: "Gerbang Tol Baranangsiang (Jagorawi)", time: "3 Menit", desc: "Akses tol bebas hambatan menuju Jakarta dan sekitarnya" }
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount).replace('IDR', 'Rp');
}

export function generateWhatsAppBookingUrl(phone: string, roomType: string, price?: number): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const priceInfo = price ? ` seharga ${formatRupiah(price)}/malam` : '';
  const message = `Halo Reservasi IPB Convention Hotel Bogor, saya tertarik untuk memesan kamar tipe *${roomType}*${priceInfo}. Mohon informasi ketersediaan tanggal dan promo terbaru. Terima kasih.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppInquiryUrl(
  phone: string,
  data: { name: string; email: string; phone: string; subject: string; message: string; roomType?: string }
): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const lines = [
    `*FORMULIR PERTANYAAN RESMI - IPB CONVENTION HOTEL*`,
    `----------------------------------------`,
    `*Nama Lengkap:* ${data.name}`,
    `*Email:* ${data.email}`,
    `*No. Telepon:* ${data.phone}`,
    `*Keperluan:* ${data.subject}${data.roomType ? ` (${data.roomType})` : ''}`,
    `----------------------------------------`,
    `*Pesan / Permintaan:*`,
    `${data.message}`,
    `----------------------------------------`,
    `Dikirim melalui website ipbconventionhotel.com`
  ];
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
}
