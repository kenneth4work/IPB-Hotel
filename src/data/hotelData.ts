import { HotelConfig, Review, GalleryItem, RoomData } from "../types";

// Impor logo dan foto-foto galeri utama
import brandLogoImg from "../assets/images/regenerated_image_1789095966156.png";
import grandExecutiveRoomImg from "../assets/images/regenerated_image_1789108862742.jpg";
import standardRoomImg from "../assets/images/regenerated_image_1789098357914.jpg";
import grandLobbyImg from "../assets/images/regenerated_image_1789105660824.jpg";
import galleryBallroomImg from "../assets/images/regenerated_image_1789109938317.jpg";
import galleryDiningImg from "../assets/images/regenerated_image_1789109942226.jpg";
import gallerySuiteImg from "../assets/images/regenerated_image_1789109946006.jpg";
import galleryMallImg from "../assets/images/regenerated_image_1789109949049.jpg";
import galleryLoungeImg from "../assets/images/regenerated_image_1789109954250.jpg";
import galleryIiccImg from "../assets/images/iicc.jpeg";
import galleryRestoImg from "../assets/images/resto.jpeg";
import galleryHotelFacadeImg from "../assets/images/hotel-3-web.jpg";

// Impor foto kamar lainnya
import deluxe1 from "../assets/images/deluxe-1.jpg";
import deluxe2 from "../assets/images/deluxe-2.jpg";
import deluxe3 from "../assets/images/deluxe-3.jpg";
import deluxe4 from "../assets/images/deluxe-4.jpg";

import executive1 from "../assets/images/executive-1.jpg";
import executive2 from "../assets/images/executive-2.jpg";
import executive3 from "../assets/images/executive-3.jpg";
import executive4 from "../assets/images/executive-4.jpg";

import suite1 from "../assets/images/suite-1.jpg";
import suite2 from "../assets/images/suite-2.jpg";
import suite3 from "../assets/images/suite-3.jpg";
import suite4 from "../assets/images/suite-4.jpg";

import superior1 from "../assets/images/superior-1.jpg";
import superior2 from "../assets/images/superior-2.jpg";
import superior3 from "../assets/images/superior-3.jpg";
import superior4 from "../assets/images/superior-4.jpg";

// Daftar kategori dan array foto kamar
export const roomCategories: Record<string, string[]> = {
    Suite: [suite1, suite2, suite3, suite4],
    "Grand Executive": [
        grandExecutiveRoomImg,
        grandExecutiveRoomImg,
        grandExecutiveRoomImg,
        grandExecutiveRoomImg,
    ],
    Executive: [executive1, executive2, executive3, executive4],
    Deluxe: [deluxe1, deluxe2, deluxe3, deluxe4],
    Superior: [superior1, superior2, superior3, superior4],
    Standar: [
        standardRoomImg,
        standardRoomImg,
        standardRoomImg,
        standardRoomImg,
    ],
};

export const ROOMS_DATA: RoomData[] = [
    {
        id: "suite",
        badge: "SUITE",
        size: "36 M²",
        name: "Suite Room",
        description:
            "Kamar seluas 36 M² dengan ruang tamu terpisah, ranjang King berukuran besar, meja santai, dan kamar mandi dengan bathtub.",
        amenities: [
            "Ruang Tamu",
            "Ranjang King",
            "Smart TV",
        ],
        price: "Rp 1.350.000",
        priceUnit: "/malam",
        images: roomCategories["Suite"],
    },
    {
        id: "grand-executive",
        badge: "GRAND EXECUTIVE",
        size: "28 M²",
        name: "Grand Executive Room",
        description:
            "Kamar eksekutif seluas 28 M² dengan lounge area eksklusif, ranjang King premium, dan fasilitas penunjang bisnis modern.",
        amenities: [
            "Ranjang King",
            "Lounge Area",
            'Smart TV 50"',
            "Mesin Kopi & Teh",
        ],
        price: "Rp 1.050.000",
        priceUnit: "/malam",
        images: roomCategories["Grand Executive"],
    },
    {
        id: "executive",
        badge: "EXECUTIVE",
        size: "24 M²",
        name: "Executive Room",
        description:
            "Kamar seluas 24 M² yang dirancang khusus bagi profesional dan pelaku bisnis dengan meja kerja nyaman serta pemandangan menawan.",
        amenities: ["Ranjang King", "Smart TV", "Meja Kerja", "Balkon Pribadi"],
        price: "Rp 900.000",
        priceUnit: "/malam",
        images: roomCategories["Executive"],
    },
    {
        id: "deluxe",
        badge: "DELUXE",
        size: "22 M²",
        name: "Deluxe Room",
        description:
            "Kamar seluas 22 M² yang menjadi pilihan favorit pelancong santai dengan pemandangan lanskap kota dan interior kontemporer.",
        amenities: [
            "Ranjang Queen",
            "TV Layar Datar",
            "AC Dingin",
            "Pemandangan Kota",
        ],
        price: "Rp 800.000",
        priceUnit: "/malam",
        images: roomCategories["Deluxe"],
    },
    {
        id: "superior",
        badge: "SUPERIOR",
        size: "20 M²",
        name: "Superior Room",
        description:
            "Kamar seluas 20 M² dengan kenyamanan optimal, sentuhan interior hangat kontemporer, pilihan kasur Queen atau Twin, serta suasana tenang.",
        amenities: [
            "Ranjang Queen / Twin",
            "TV Layar Datar",
            "AC Dingin",
            "Water Heater",
        ],
        price: "Rp 700.000",
        priceUnit: "/malam",
        images: roomCategories["Superior"],
    },
    {
        id: "standard",
        badge: "STANDAR",
        size: "19 M²",
        name: "Standard Room",
        description:
            "Kamar modern seluas 19 M² yang fungsional dan terjangkau dengan koneksi WiFi kencang untuk kenyamanan menginap.",
        amenities: [
            "Ranjang Double",
            "TV Layar Datar",
            "AC Dingin",
            "WiFi Kencang",
        ],
        price: "Rp 600.000",
        priceUnit: "/malam",
        images: roomCategories["Standar"],
    },
];

export const FALLBACK_ROOM_IMAGES: Record<string, string> = {
    // Suite Room
    "Suite/SU1.jpg": suite1,
    "Suite/SU2.jpg": suite2,
    "Suite/SU3.jpg": suite3,
    "Suite/SU4.jpg": suite4,
    "images/rooms/suite-1.jpg": suite1,
    "images/rooms/suite-2.jpg": suite2,
    "images/rooms/suite-3.jpg": suite3,
    "images/rooms/suite-4.jpg": suite4,

    // Grand Executive Room
    "GrandExecutive/GE1.jpg": grandExecutiveRoomImg,
    "images/rooms/grand-executive-1.jpg": grandExecutiveRoomImg,

    // Executive Room
    "Execuitve/X1.jpg": executive1,
    "Execuitve/X2.jpg": executive2,
    "Execuitve/X3.jpg": executive3,
    "Execuitve/X4.jpg": executive4,
    "Executive/X1.jpg": executive1,
    "images/rooms/executive-1.jpg": executive1,
    "images/rooms/executive-2.jpg": executive2,
    "images/rooms/executive-3.jpg": executive3,
    "images/rooms/executive-4.jpg": executive4,

    // Deluxe Room
    "Deluxe/D1.jpg": deluxe1,
    "Deluxe/D2.jpg": deluxe2,
    "Deluxe/D3.jpg": deluxe3,
    "Deluxe/D4.jpg": deluxe4,
    "images/rooms/deluxe-1.jpg": deluxe1,
    "images/rooms/deluxe-2.jpg": deluxe2,
    "images/rooms/deluxe-3.jpg": deluxe3,
    "images/rooms/deluxe-4.jpg": deluxe4,

    // Superior Room
    "Superior/SP1.jpg": superior1,
    "Superior/SP2.jpg": superior2,
    "Superior/SP3.jpg": superior3,
    "Superior/SP4.jpg": superior4,
    "images/rooms/superior-1.jpg": superior1,

    // Standard Room
    "Standard/S1.jpg": standardRoomImg,
    "images/rooms/standard-1.jpg": standardRoomImg,
};

export function getRoomImageUrl(imgPath: string): string {
    if (!imgPath) return "";
    if (
        imgPath.startsWith("blob:") ||
        imgPath.startsWith("http://") ||
        imgPath.startsWith("https://") ||
        imgPath.startsWith("data:") ||
        imgPath.startsWith("/") ||
        imgPath.startsWith("./") ||
        imgPath.startsWith("../")
    ) {
        return imgPath;
    }
    return FALLBACK_ROOM_IMAGES[imgPath] || standardRoomImg;
}

export const HOTEL_CONFIG: HotelConfig = {
    name: "IPB Convention Hotel",
    tagline: "Di Jantung Kota Bogor",
    address:
        "Jl. Padjajaran Raya, Samping Mall Botani Square, Kota Bogor, Jawa Barat 16128",
    phones: ["(0251) 834 5698", "(0251) 834 5699"],
    email: "info@ipbconventionhotel.com",
    instagram: "@ipbhotelbotanisquare",
    // Akun media sosial di footer ("Ikuti Kami"). Isi url dengan akun resmi hotel;
    // ikon dengan url kosong tidak ditampilkan agar tidak menautkan ke akun orang lain.
    socials: [
        { platform: "instagram", url: "https://www.instagram.com/ipbhotelbotanisquare/" },
        { platform: "facebook", url: "" },
        { platform: "youtube", url: "" },
        { platform: "tiktok", url: "" },
        { platform: "x", url: "" },
        { platform: "linkedin", url: "" },
    ],
    checkIn: "14:00 WIB",
    checkOut: "12:00 WIB",
    googleMapsUrl:
        "https://www.google.com/maps/place/IPB+Convention+Hotel+Botani+Square/@-6.6019596,106.8065591,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69c5db56e8b071:0xc345ddc97086540e!8m2!3d-6.6019596!4d106.8065591",
    whatsappNumber: "628111110658",
    rooms: ROOMS_DATA.map((r) => ({
        id: r.id,
        name: r.name,
        type: r.name,
        badge: r.badge,
        size: r.size,
        price: r.price,
        priceFormatted:
            r.priceFormatted ||
            (typeof r.price === "number"
                ? `Rp ${roomPriceToNum(r.price).toLocaleString("id-ID")}`
                : r.price),
        amenities: r.amenities.map((a) => (typeof a === "string" ? a : a.name)),
        image: r.images[0],
        images: r.images,
        fallbackImage: FALLBACK_ROOM_IMAGES[r.images[0]] || r.images[0],
        description: r.description,
        bedType:
            r.id === "suite"
                ? "King Bed (200x200)"
                : r.id === "grand-executive"
                  ? "King Bed (180x200)"
                  : r.id === "executive"
                    ? "King Bed (180x200)"
                    : r.id === "deluxe"
                      ? "Queen Bed (160x200)"
                      : r.id === "superior"
                        ? "Queen / Twin Bed"
                        : "Double Bed / Twin Bed",
        capacity:
            r.id === "suite"
                ? "2 Dewasa + 1 Anak"
                : r.id === "standard"
                  ? "1 - 2 Dewasa"
                  : "2 Dewasa",
    })),
};

function roomPriceToNum(val: string | number): number {
    if (typeof val === "number") return val;
    return Number(String(val).replace(/\D/g, "")) || 0;
}

export const REVIEWS: Review[] = [
    {
        id: "review-1",
        author: "Ahmad Fauzi",
        rating: 5.0,
        quote: "Kamar sangat nyaman dan bersih. Lokasi sangat strategis, langsung terhubung ke mall. Staf hotel ramah dan responsif. Pasti akan menginap lagi!",
        datePlatform: "Maret 2026 · Google",
        avatarBg: "bg-amber-100 text-amber-900 border-amber-300",
    },
    {
        id: "review-2",
        author: "Siti Nurhaliza",
        rating: 5.0,
        quote: "Sangat cocok untuk acara seminar dan pertemuan bisnis. Fasilitas lengkap, akses ke IICC sangat mudah. Sarapan enak dan bervariasi.",
        datePlatform: "Februari 2026 · Booking.com",
        avatarBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
    },
    {
        id: "review-3",
        author: "Budi Santoso",
        rating: 4.0,
        quote: "Hotel yang bagus dengan harga terjangkau. Kamar Suite sangat luas dan nyaman untuk keluarga. Akan saya rekomendasikan kepada teman-teman.",
        datePlatform: "Januari 2026 · TripAdvisor",
        avatarBg: "bg-slate-100 text-slate-800 border-slate-300",
    },
    {
        id: "review-4",
        author: "N***g",
        rating: 5.0,
        quote: "Sudah beberapa kali menginap di sini, semua oke apalagi menu sarapannya oke banget",
        datePlatform: "September 2026 · Traveloka",
        avatarBg: "bg-amber-100 text-amber-900 border-amber-300",
    },
    {
        id: "review-5",
        author: "E***y",
        rating: 5.0,
        quote: "Staf ramah, makanan enak, ruangan nyaman, shower deras, handuk terasa wangi.",
        datePlatform: "September 2026 · Traveloka",
        avatarBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
    },
    {
        id: "review-6",
        author: "D***y",
        rating: 5.0,
        quote: "Nyaman, bersih, sarapan banyak pilihan, Wi-Fi di lantai 4 bagus.",
        datePlatform: "September 2026 · Traveloka",
        avatarBg: "bg-slate-100 text-slate-800 border-slate-300",
    },
];

export const GALLERY_ITEMS: GalleryItem[] = [
    {
        id: "gal-1",
        title: "Grand Lobby & Hospitality Lounge",
        category: "Lobby & Area Publik",
        image: grandLobbyImg,
        spanClass: "col-span-1 md:col-span-2 md:row-span-2",
    },
    {
        id: "gal-2",
        title: "IICC Grand Ballroom & Convention",
        category: "MICE & Acara",
        image: galleryBallroomImg,
        spanClass: "col-span-1 md:col-span-1 md:row-span-1",
    },
    {
        id: "gal-3",
        title: "Terrace Dining & Restoran Nusantara",
        category: "Kuliner & Resto",
        image: galleryDiningImg,
        spanClass: "col-span-1 md:col-span-1 md:row-span-1",
    },
    {
        id: "gal-4",
        title: "Kenyamanan Suite & Kamar Tamu",
        category: "Akomodasi",
        image: gallerySuiteImg,
        spanClass: "col-span-1 md:col-span-1 md:row-span-1",
    },
    {
        id: "gal-5",
        title: "Akses Terintegrasi Mall Botani Square",
        category: "Lokasi & Eksterior",
        image: galleryMallImg,
        spanClass: "col-span-1 md:col-span-1 md:row-span-1",
    },
    {
        id: "gal-6",
        title: "Rooftop",
        category: "Fasilitas Kerja",
        image: galleryLoungeImg,
        spanClass: "col-span-1 md:col-span-2 md:row-span-1",
    },
    {
        id: "gal-7",
        title: "IPB International Convention Center (IICC)",
        category: "MICE & Acara",
        image: galleryIiccImg,
        spanClass: "col-span-1 md:col-span-1 md:row-span-1",
    },
    {
        id: "gal-9",
        title: "Restoran",
        category: "Kuliner & Resto",
        image: galleryRestoImg,
        spanClass: "col-span-1 md:col-span-1 md:row-span-1",
    },
    {
        id: "gal-10",
        title: "Gedung IPB Convention Hotel",
        category: "Lokasi & Eksterior",
        image: galleryHotelFacadeImg,
        spanClass: "col-span-1 md:col-span-1 md:row-span-1",
    },
];
