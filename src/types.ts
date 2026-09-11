export interface RoomAmenity {
  name: string;
  icon: string;
}

export interface RoomData {
  id: string;
  name: string;
  badge: string;
  size: string;
  description: string;
  amenities: (string | RoomAmenity)[];
  price: number | string;
  priceFormatted?: string;
  priceUnit?: string;
  images: string[];
  type?: string;
  bedType?: string;
  capacity?: string;
}

export interface Room {
  id?: string;
  name?: string;
  type: string;
  badge: string;
  size: string;
  price: number | string;
  priceFormatted?: string;
  amenities: (string | RoomAmenity)[];
  image?: string;
  images?: string[];
  fallbackImage?: string;
  description: string;
  bedType?: string;
  capacity?: string;
}

export interface HotelConfig {
  name: string;
  tagline: string;
  address: string;
  phones: string[];
  email: string;
  instagram: string;
  checkIn: string;
  checkOut: string;
  googleMapsUrl: string;
  whatsappNumber: string;
  rooms: Room[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  quote: string;
  datePlatform: string;
  avatarBg: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  spanClass: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  subject: "Pemesanan Kamar" | "Meeting Room" | "Event / Convention" | "Informasi Umum";
  message: string;
  roomType?: string;
}
