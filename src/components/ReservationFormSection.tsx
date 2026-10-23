import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Users, 
  BedDouble, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  MessageSquare, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw,
  Phone,
  Mail,
  User,
  ArrowRight,
  Utensils,
  Coffee,
  Crown
} from 'lucide-react';
import { HOTEL_CONFIG, roomCategories, getRoomImageUrl } from '../data/hotelData';
import { useLanguage } from '../context/LanguageContext';

export interface ReservationRoom {
  id: string;
  name: string;
  badge: string;
  pricePerNight: number;
  size: string;
  bedType: { id: string; en: string };
  capacity: { id: string; en: string };
  image: string;
}

export type BedTypeOption = 'queen' | 'king' | 'twin';
export type BreakfastOption = 'with_breakfast' | 'room_only';

export const RESERVATION_ROOMS: ReservationRoom[] = [
  {
    id: "standard",
    name: "Standard Room",
    badge: "STANDARD",
    pricePerNight: 600000,
    size: "19 M²",
    bedType: { id: "Double Bed / Twin Bed", en: "Double Bed / Twin Bed" },
    capacity: { id: "1 - 2 Dewasa", en: "1 - 2 Adults" },
    image: getRoomImageUrl(roomCategories["Standar"]?.[0]) || "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "superior",
    name: "Superior Room",
    badge: "SUPERIOR",
    pricePerNight: 700000,
    size: "20 M²",
    bedType: { id: "Queen / Twin Bed", en: "Queen / Twin Bed" },
    capacity: { id: "2 Dewasa", en: "2 Adults" },
    image: getRoomImageUrl(roomCategories["Superior"]?.[0]) || "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "deluxe",
    name: "Deluxe Room",
    badge: "DELUXE",
    pricePerNight: 850000,
    size: "22 M²",
    bedType: { id: "Queen Bed (160x200)", en: "Queen Bed (160x200)" },
    capacity: { id: "2 Dewasa", en: "2 Adults" },
    image: getRoomImageUrl(roomCategories["Deluxe"]?.[0]) || "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "executive",
    name: "Executive Room",
    badge: "EXECUTIVE",
    pricePerNight: 900000,
    size: "24 M²",
    bedType: { id: "King Bed (180x200)", en: "King Bed (180x200)" },
    capacity: { id: "2 Dewasa", en: "2 Adults" },
    image: getRoomImageUrl(roomCategories["Executive"]?.[0]) || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "grand-executive",
    name: "Grand Executive Room",
    badge: "GRAND EXECUTIVE",
    pricePerNight: 1050000,
    size: "28 M²",
    bedType: { id: "King Bed (180x200)", en: "King Bed (180x200)" },
    capacity: { id: "2 Dewasa", en: "2 Adults" },
    image: getRoomImageUrl(roomCategories["Grand Executive"]?.[0]) || "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "suite",
    name: "Executive Suite Room",
    badge: "SUITE",
    pricePerNight: 1500000,
    size: "36 M²",
    bedType: { id: "Grand King Bed (200x200)", en: "Grand King Bed (200x200)" },
    capacity: { id: "2 Dewasa + 1 Anak", en: "2 Adults + 1 Child" },
    image: getRoomImageUrl(roomCategories["Suite"]?.[0]) || "https://i.ibb.co/pvj9rW0K/SU1.jpg"
  }
];

const BREAKFAST_RATE_PER_PAX_PER_NIGHT = 75000;

export const ReservationFormSection: React.FC = () => {
  const { language, t } = useLanguage();

  // Helper date formatter: YYYY-MM-DD
  const formatIsoDate = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTomorrow = (baseDateStr?: string): string => {
    const base = baseDateStr ? new Date(baseDateStr) : new Date();
    base.setDate(base.getDate() + 1);
    return formatIsoDate(base);
  };

  const todayStr = useMemo(() => formatIsoDate(new Date()), []);
  const initialCheckIn = todayStr;
  const initialCheckOut = useMemo(() => getTomorrow(todayStr), [todayStr]);

  // Form States
  const [checkInDate, setCheckInDate] = useState<string>(initialCheckIn);
  const [checkOutDate, setCheckOutDate] = useState<string>(initialCheckOut);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("deluxe");
  const [selectedBedType, setSelectedBedType] = useState<BedTypeOption>('king');
  const [breakfastPlan, setBreakfastPlan] = useState<BreakfastOption>('with_breakfast');
  const [roomCount, setRoomCount] = useState<number>(1);
  const [guestCount, setGuestCount] = useState<number>(2);

  // Guest details
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequest, setSpecialRequest] = useState<string>('');

  // UI Flow States
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [bookingCode, setBookingCode] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<{
    code: string;
    guestName: string;
    email: string;
    phone: string;
    roomName: string;
    bedTypeLabel: string;
    breakfastPlanLabel: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    roomCount: number;
    guestCount: number;
    roomTotal: number;
    breakfastTotal: number;
    totalPrice: number;
    specialRequest?: string;
  } | null>(null);

  // Selected Room Object
  const selectedRoom = useMemo(() => {
    return RESERVATION_ROOMS.find(r => r.id === selectedRoomId) || RESERVATION_ROOMS[2];
  }, [selectedRoomId]);

  // Real-time Nights Calculation
  const totalNights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 1;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkInDate, checkOutDate]);

  // Real-time Estimated Price Calculations
  const totalRoomCost = useMemo(() => {
    return selectedRoom.pricePerNight * totalNights * roomCount;
  }, [selectedRoom.pricePerNight, totalNights, roomCount]);

  const totalBreakfastCost = useMemo(() => {
    if (breakfastPlan !== 'with_breakfast') return 0;
    return BREAKFAST_RATE_PER_PAX_PER_NIGHT * guestCount * totalNights * roomCount;
  }, [breakfastPlan, guestCount, totalNights, roomCount]);

  const estimatedTotal = useMemo(() => {
    return totalRoomCost + totalBreakfastCost;
  }, [totalRoomCost, totalBreakfastCost]);

  // Format currency
  const formatRupiah = (val: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val).replace('IDR', 'Rp');
  };

  // Bed label helper
  const getBedLabel = (type: BedTypeOption): string => {
    if (type === 'queen') return t.reservation.queenBedTitle;
    if (type === 'twin') return t.reservation.twinBedTitle;
    return t.reservation.kingBedTitle;
  };

  // Breakfast label helper
  const getBreakfastLabel = (plan: BreakfastOption): string => {
    if (plan === 'with_breakfast') {
      return `${t.reservation.withBreakfastTitle} (${guestCount} ${t.reservation.adultsSuffix})`;
    }
    return t.reservation.roomOnlyTitle;
  };

  // Validations
  const isEmailValid = useMemo(() => {
    if (!email.trim()) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }, [email]);

  const isPhoneValid = useMemo(() => {
    if (!phone.trim()) return false;
    const cleanDigits = phone.replace(/\D/g, '');
    return cleanDigits.length >= 9;
  }, [phone]);

  const isNameValid = fullName.trim().length >= 2;

  const isFormValid = isNameValid && isEmailValid && isPhoneValid && totalNights > 0;

  // Handle Check-in date change
  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    setCheckInDate(newCheckIn);

    // If check-out is before or equal to new check-in, push check-out forward by 1 day
    if (newCheckIn >= checkOutDate) {
      setCheckOutDate(getTomorrow(newCheckIn));
    }
  };

  // Handle Check-out date change
  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckOut = e.target.value;
    if (newCheckOut > checkInDate) {
      setCheckOutDate(newCheckOut);
    }
  };

  // Submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });

    if (!isFormValid) {
      return;
    }

    setIsLoading(true);

    // Generate readable Booking Code: IPB-YYYYMMDD-XXXX
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString();
    const dateFormatted = checkInDate.replace(/-/g, '');
    const code = `IPB-${dateFormatted}-${randomHex}`;

    setTimeout(() => {
      setIsLoading(false);
      setBookingCode(code);
      setSubmittedData({
        code,
        guestName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        roomName: selectedRoom.name,
        bedTypeLabel: getBedLabel(selectedBedType),
        breakfastPlanLabel: getBreakfastLabel(breakfastPlan),
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights: totalNights,
        roomCount,
        guestCount,
        roomTotal: totalRoomCost,
        breakfastTotal: totalBreakfastCost,
        totalPrice: estimatedTotal,
        specialRequest: specialRequest.trim() || undefined
      });
      setIsSuccess(true);
    }, 900);
  };

  // Reset form to book again
  const handleReset = () => {
    setIsSuccess(false);
    setSubmittedData(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setSpecialRequest('');
    setTouched({});
  };

  // Generate WhatsApp confirmation URL
  const getWhatsAppBookingUrl = () => {
    if (!submittedData) return '';
    const cleanPhone = HOTEL_CONFIG.whatsappNumber;
    
    const message = language === 'en' ? [
      `*ROOM RESERVATION CONFIRMATION - IPB CONVENTION HOTEL*`,
      `----------------------------------------`,
      `*Booking Code:* ${submittedData.code}`,
      `*Guest Name:* ${submittedData.guestName}`,
      `*WhatsApp:* ${submittedData.phone}`,
      `*Email:* ${submittedData.email}`,
      `----------------------------------------`,
      `*Room Type:* ${submittedData.roomName}`,
      `*Bed Preference:* ${submittedData.bedTypeLabel}`,
      `*Breakfast Plan:* ${submittedData.breakfastPlanLabel}`,
      `*Number of Rooms:* ${submittedData.roomCount} room(s)`,
      `*Guests:* ${submittedData.guestCount} guest(s)`,
      `*Check-in:* ${submittedData.checkIn}`,
      `*Check-out:* ${submittedData.checkOut}`,
      `*Duration:* ${submittedData.nights} night(s)`,
      `*Room Subtotal:* ${formatRupiah(submittedData.roomTotal)}`,
      submittedData.breakfastTotal > 0 ? `*Breakfast Subtotal:* ${formatRupiah(submittedData.breakfastTotal)}` : `*Breakfast:* Room Only`,
      `*Total Estimated Cost:* ${formatRupiah(submittedData.totalPrice)} (Nett)`,
      submittedData.specialRequest ? `*Special Request:* ${submittedData.specialRequest}` : '',
      `----------------------------------------`,
      `Hello IPB Convention Hotel team, I have submitted this reservation through the website. Please confirm availability and room lock. Thank you!`
    ].filter(Boolean).join('\n') : [
      `*KONFIRMASI RESERVASI KAMAR - IPB CONVENTION HOTEL*`,
      `----------------------------------------`,
      `*Kode Booking:* ${submittedData.code}`,
      `*Nama Tamu:* ${submittedData.guestName}`,
      `*No. WhatsApp:* ${submittedData.phone}`,
      `*Email:* ${submittedData.email}`,
      `----------------------------------------`,
      `*Tipe Kamar:* ${submittedData.roomName}`,
      `*Pilihan Tipe Kasur:* ${submittedData.bedTypeLabel}`,
      `*Opsi Sarapan:* ${submittedData.breakfastPlanLabel}`,
      `*Jumlah Kamar:* ${submittedData.roomCount} kamar`,
      `*Jumlah Tamu:* ${submittedData.guestCount} orang`,
      `*Check-in:* ${submittedData.checkIn}`,
      `*Check-out:* ${submittedData.checkOut}`,
      `*Durasi Menginap:* ${submittedData.nights} malam`,
      `*Subtotal Kamar:* ${formatRupiah(submittedData.roomTotal)}`,
      submittedData.breakfastTotal > 0 ? `*Subtotal Sarapan:* ${formatRupiah(submittedData.breakfastTotal)}` : `*Sarapan:* Hanya Kamar (Room Only)`,
      `*Estimasi Total Biaya:* ${formatRupiah(submittedData.totalPrice)} (Nett)`,
      submittedData.specialRequest ? `*Permintaan Khusus:* ${submittedData.specialRequest}` : '',
      `----------------------------------------`,
      `Halo Reservasi IPB Convention Hotel, saya telah mengisi formulir pemesanan ini melalui website. Mohon bantuan konfirmasi ketersediaan dan lock kamar. Terima kasih!`
    ].filter(Boolean).join('\n');

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="reservasi" className="py-20 bg-gradient-to-b from-white via-[#FDFBF7] to-white relative scroll-mt-24 border-t border-slate-200/60 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{t.reservation.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-4 tracking-tight">
            {t.reservation.title}
          </h2>
          <div className="w-16 h-1 bg-[#C5A880] mx-auto mb-4 rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.reservation.subtitle}
          </p>
        </div>

        {/* Success Modal / State */}
        {isSuccess && submittedData ? (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-[#C5A880] to-emerald-600" />
            
            <div className="text-center pb-6 border-b border-slate-100">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                {t.reservation.successTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                {t.reservation.successSubtitle}
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="py-6 space-y-4">
              <div className="bg-[#FDFBF7] rounded-2xl p-4 sm:p-6 border border-[#E7D6C1]/80 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-200/80 gap-2">
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                      {t.reservation.bookingCodeLabel}
                    </span>
                    <span className="font-mono text-xl sm:text-2xl font-bold text-[#1E3A2B] tracking-tight">
                      {submittedData.code}
                    </span>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                      {t.reservation.totalEstimate}
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-[#C5A880]">
                      {formatRupiah(submittedData.totalPrice)}
                    </span>
                    <span className="text-[11px] text-slate-400 block font-medium">Nett (Termasuk Pajak & Service)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[10px]">{t.reservation.guestNameLabel}</span>
                    <span className="font-bold text-sm text-slate-900">{submittedData.guestName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[10px]">{t.reservation.phoneLabel} / {t.reservation.emailLabel}</span>
                    <span className="font-medium text-slate-800">{submittedData.phone} · {submittedData.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[10px]">{t.reservation.roomTypeLabel}</span>
                    <span className="font-bold text-sm text-slate-900">{submittedData.roomName} ({submittedData.roomCount} {t.reservation.roomsSuffix})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[10px]">{t.reservation.bedTypeLabel}</span>
                    <span className="font-bold text-sm text-[#1E3A2B]">{submittedData.bedTypeLabel}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[10px]">{t.reservation.breakfastLabel}</span>
                    <span className="font-bold text-sm text-amber-800">{submittedData.breakfastPlanLabel}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[10px]">{t.reservation.durationLabel}</span>
                    <span className="font-bold text-sm text-slate-900">
                      {submittedData.checkIn} → {submittedData.checkOut} ({submittedData.nights} {submittedData.nights > 1 ? t.reservation.nightPlural : t.reservation.nightSingular})
                    </span>
                  </div>
                </div>

                {submittedData.specialRequest && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-xs">
                    <span className="text-slate-400 font-semibold block uppercase text-[10px]">{t.reservation.specialRequestLabel}</span>
                    <p className="text-slate-700 italic mt-0.5">"{submittedData.specialRequest}"</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                id="btn-confirm-booking-whatsapp"
                href={getWhatsAppBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>{t.reservation.forwardWaBtn}</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.reservation.makeNewBooking}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Form with 2-Column Responsive Layout */
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left 7-Cols: Steps Form Input Controls */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* STEP 1: DATE & GUESTS SELECTION (Selector 1) */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-[#1E3A2B] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                      {t.reservation.step1Title}
                    </h3>
                    <p className="text-xs text-slate-500">{t.reservation.step1Desc}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Check-in Date */}
                  <div>
                    <label htmlFor="res-checkin" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{t.reservation.checkInLabel} *</span>
                    </label>
                    <input
                      type="date"
                      id="res-checkin"
                      name="checkInDate"
                      min={todayStr}
                      value={checkInDate}
                      onChange={handleCheckInChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/15 outline-hidden text-sm text-slate-800 bg-slate-50/60 hover:bg-white transition-all font-semibold cursor-pointer"
                    />
                  </div>

                  {/* Check-out Date */}
                  <div>
                    <label htmlFor="res-checkout" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{t.reservation.checkOutLabel} *</span>
                    </label>
                    <input
                      type="date"
                      id="res-checkout"
                      name="checkOutDate"
                      min={getTomorrow(checkInDate)}
                      value={checkOutDate}
                      onChange={handleCheckOutChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/15 outline-hidden text-sm text-slate-800 bg-slate-50/60 hover:bg-white transition-all font-semibold cursor-pointer"
                    />
                  </div>
                </div>

                {/* Night duration indicator pill */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FDFBF7] border border-[#E7D6C1]/70 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-slate-800">
                      {totalNights} {totalNights > 1 ? t.reservation.nightPlural : t.reservation.nightSingular}
                    </span>
                    <span className="text-slate-500 font-medium">({checkInDate} → {checkOutDate})</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#A8865B] uppercase tracking-wide">
                    Check-in 14:00 · Out 12:00
                  </span>
                </div>

                {/* Guests & Room Count Row */}
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                  <div>
                    <label htmlFor="res-guests" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{t.reservation.guestsLabel}</span>
                    </label>
                    <select
                      id="res-guests"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/15 outline-hidden text-sm text-slate-800 bg-slate-50/60 hover:bg-white transition-all font-semibold cursor-pointer"
                    >
                      <option value={1}>1 {t.reservation.adultsSuffix}</option>
                      <option value={2}>2 {t.reservation.adultsSuffix}</option>
                      <option value={3}>3 {t.reservation.adultsSuffix}</option>
                      <option value={4}>4 {t.reservation.adultsSuffix}</option>
                      <option value={5}>5+ {t.reservation.adultsSuffix}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="res-rooms" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{t.reservation.roomsLabel}</span>
                    </label>
                    <select
                      id="res-rooms"
                      value={roomCount}
                      onChange={(e) => setRoomCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/15 outline-hidden text-sm text-slate-800 bg-slate-50/60 hover:bg-white transition-all font-semibold cursor-pointer"
                    >
                      <option value={1}>1 {t.reservation.roomsSuffix}</option>
                      <option value={2}>2 {t.reservation.roomsSuffix}</option>
                      <option value={3}>3 {t.reservation.roomsSuffix}</option>
                      <option value={4}>4 {t.reservation.roomsSuffix}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* STEP 2: ROOM SELECTION & CUSTOMIZATION (Selector 2) */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
                
                {/* 2A. Room Type Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#1E3A2B] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">
                        {t.reservation.step2Title}
                      </h3>
                      <p className="text-xs text-slate-500">{t.reservation.step2Desc}</p>
                    </div>
                  </div>

                  {/* Quick Dropdown select on mobile/tablet */}
                  <div className="w-full sm:w-auto">
                    <select
                      id="res-room-dropdown"
                      value={selectedRoomId}
                      onChange={(e) => setSelectedRoomId(e.target.value)}
                      className="w-full sm:w-56 px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-bold focus:border-[#1E3A2B] focus:ring-1 focus:ring-[#1E3A2B] outline-hidden cursor-pointer"
                      aria-label={t.reservation.selectRoomDropdown}
                    >
                      {RESERVATION_ROOMS.map(r => (
                        <option key={r.id} value={r.id}>
                          {r.name} - {formatRupiah(r.pricePerNight)}/mlm
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Card Selection Grid (6 Room Types) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {RESERVATION_ROOMS.map((r) => {
                    const isSelected = r.id === selectedRoomId;
                    return (
                      <div
                        key={r.id}
                        onClick={() => setSelectedRoomId(r.id)}
                        className={`relative rounded-2xl p-3.5 border transition-all cursor-pointer flex gap-3.5 items-center ${
                          isSelected
                            ? 'border-[#1E3A2B] bg-[#1E3A2B]/5 ring-2 ring-[#1E3A2B]/20 shadow-xs'
                            : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        {/* Thumbnail image */}
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                          <img
                            src={r.image}
                            alt={r.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <span className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-xs text-white text-[9px] font-mono font-bold px-1 py-0.5 rounded">
                            {r.size}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8865B]">
                              {r.badge}
                            </span>
                            {isSelected && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1E3A2B] bg-emerald-100/70 px-1.5 py-0.5 rounded-full">
                                <Check className="w-3 h-3" />
                                <span>{t.reservation.selectedBadge}</span>
                              </span>
                            )}
                          </div>
                          
                          <h4 className="font-bold text-sm text-slate-900 truncate">
                            {r.name}
                          </h4>
                          
                          <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                            {language === 'en' ? r.bedType.en : r.bedType.id}
                          </p>

                          <div className="mt-1.5 flex items-baseline gap-1">
                            <span className="font-bold text-sm text-slate-900">
                              {formatRupiah(r.pricePerNight)}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">
                              / {t.reservation.nightSingular.toLowerCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 2B. PILIHAN TIPE TEMPAT TIDUR (QUEEN BED, KING BED, TWIN BED) */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-3.5">
                    <BedDouble className="w-4 h-4 text-[#C5A880]" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 leading-tight">
                        {t.reservation.bedPreferenceTitle}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {t.reservation.bedPreferenceDesc}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* King Bed */}
                    <div
                      id="opt-bed-king"
                      onClick={() => setSelectedBedType('king')}
                      className={`rounded-2xl p-3.5 border transition-all cursor-pointer flex flex-col justify-between ${
                        selectedBedType === 'king'
                          ? 'border-[#1E3A2B] bg-[#1E3A2B]/5 ring-2 ring-[#1E3A2B]/20 shadow-xs'
                          : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                          <Crown className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                          180/200×200
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">{t.reservation.kingBedTitle}</span>
                          {selectedBedType === 'king' && (
                            <span className="w-4 h-4 rounded-full bg-[#1E3A2B] text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">{t.reservation.kingBedDesc}</p>
                      </div>
                    </div>

                    {/* Queen Bed */}
                    <div
                      id="opt-bed-queen"
                      onClick={() => setSelectedBedType('queen')}
                      className={`rounded-2xl p-3.5 border transition-all cursor-pointer flex flex-col justify-between ${
                        selectedBedType === 'queen'
                          ? 'border-[#1E3A2B] bg-[#1E3A2B]/5 ring-2 ring-[#1E3A2B]/20 shadow-xs'
                          : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                          <BedDouble className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                          160×200
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">{t.reservation.queenBedTitle}</span>
                          {selectedBedType === 'queen' && (
                            <span className="w-4 h-4 rounded-full bg-[#1E3A2B] text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">{t.reservation.queenBedDesc}</p>
                      </div>
                    </div>

                    {/* Twin Bed */}
                    <div
                      id="opt-bed-twin"
                      onClick={() => setSelectedBedType('twin')}
                      className={`rounded-2xl p-3.5 border transition-all cursor-pointer flex flex-col justify-between ${
                        selectedBedType === 'twin'
                          ? 'border-[#1E3A2B] bg-[#1E3A2B]/5 ring-2 ring-[#1E3A2B]/20 shadow-xs'
                          : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                          <Users className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                          2x 100×200
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">{t.reservation.twinBedTitle}</span>
                          {selectedBedType === 'twin' && (
                            <span className="w-4 h-4 rounded-full bg-[#1E3A2B] text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">{t.reservation.twinBedDesc}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2C. OPSI SARAPAN (TERMASUK SARAPAN BUFFET vs HANYA KAMAR) */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-3.5">
                    <Utensils className="w-4 h-4 text-[#C5A880]" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 leading-tight">
                        {t.reservation.breakfastOptionTitle}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {t.reservation.breakfastOptionDesc}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Opsi 1: Termasuk Sarapan Buffet */}
                    <div
                      id="opt-breakfast-included"
                      onClick={() => setBreakfastPlan('with_breakfast')}
                      className={`rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                        breakfastPlan === 'with_breakfast'
                          ? 'border-[#1E3A2B] bg-[#1E3A2B]/5 ring-2 ring-[#1E3A2B]/20 shadow-xs'
                          : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-amber-100/70 text-amber-800 flex items-center justify-center shrink-0 shadow-2xs">
                              <Utensils className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                                {t.reservation.withBreakfastTitle}
                              </span>
                              <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60 inline-block mt-0.5">
                                {t.reservation.withBreakfastBadge}
                              </span>
                            </div>
                          </div>
                          {breakfastPlan === 'with_breakfast' && (
                            <span className="w-5 h-5 rounded-full bg-[#1E3A2B] text-white flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mb-3 font-medium">
                          {t.reservation.withBreakfastDesc}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Tambahan Biaya:</span>
                        <span className="font-bold text-slate-800 font-mono">
                          +Rp 75.000 <span className="text-[10px] font-normal text-slate-500">/ tamu / mlm</span>
                        </span>
                      </div>
                    </div>

                    {/* Opsi 2: Hanya Kamar (Room Only) */}
                    <div
                      id="opt-breakfast-room-only"
                      onClick={() => setBreakfastPlan('room_only')}
                      className={`rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                        breakfastPlan === 'room_only'
                          ? 'border-[#1E3A2B] bg-[#1E3A2B]/5 ring-2 ring-[#1E3A2B]/20 shadow-xs'
                          : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 shadow-2xs">
                              <Coffee className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                                {t.reservation.roomOnlyTitle}
                              </span>
                              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 inline-block mt-0.5">
                                {t.reservation.roomOnlyBadge}
                              </span>
                            </div>
                          </div>
                          {breakfastPlan === 'room_only' && (
                            <span className="w-5 h-5 rounded-full bg-[#1E3A2B] text-white flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mb-3 font-medium">
                          {t.reservation.roomOnlyDesc}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Tarif Sarapan:</span>
                        <span className="font-bold text-slate-800 font-mono">
                          Rp 0 <span className="text-[10px] font-normal text-slate-500">(Tarif Dasar)</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* STEP 3: GUEST CONTACT DATA */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-[#1E3A2B] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                      {t.reservation.step3Title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{t.reservation.step3Desc}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="res-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{t.reservation.fullNameLabel} *</span>
                    </label>
                    <input
                      type="text"
                      id="res-name"
                      name="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                      placeholder={t.reservation.fullNamePlaceholder}
                      required
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 outline-hidden transition-all font-semibold ${
                        touched.name && !isNameValid
                          ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-white focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/15'
                      }`}
                    />
                    {touched.name && !isNameValid && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-bold">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Nama lengkap wajib diisi</span>
                      </p>
                    )}
                  </div>

                  {/* Grid Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="res-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{t.reservation.emailLabel} *</span>
                      </label>
                      <input
                        type="email"
                        id="res-email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                        placeholder={t.reservation.emailPlaceholder}
                        required
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 outline-hidden transition-all font-semibold ${
                          touched.email && !isEmailValid
                            ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                            : 'border-slate-200 bg-slate-50/50 hover:bg-white focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/15'
                        }`}
                      />
                      {touched.email && !isEmailValid && (
                        <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-bold">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{t.reservation.emailError}</span>
                        </p>
                      )}
                    </div>

                    {/* WhatsApp Phone */}
                    <div>
                      <label htmlFor="res-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{t.reservation.phoneLabel} *</span>
                      </label>
                      <input
                        type="tel"
                        id="res-phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
                        placeholder={t.reservation.phonePlaceholder}
                        required
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 outline-hidden transition-all font-semibold ${
                          touched.phone && !isPhoneValid
                            ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                            : 'border-slate-200 bg-slate-50/50 hover:bg-white focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/15'
                        }`}
                      />
                      {touched.phone && !isPhoneValid && (
                        <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-bold">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{t.reservation.phoneError}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Special Requests (Optional) */}
                  <div>
                    <label htmlFor="res-special" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {t.reservation.specialRequestLabel}
                    </label>
                    <textarea
                      id="res-special"
                      name="specialRequest"
                      rows={2}
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder={t.reservation.specialRequestPlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/15 outline-hidden text-sm text-slate-800 transition-all resize-none font-medium"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right 5-Cols: Real-time Price Summary & Instant Action Card */}
            <div className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1E3A2B] via-[#C5A880] to-[#1E3A2B]" />

                <div className="border-b border-slate-100 pb-4 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8865B] block mb-1">
                    {t.reservation.summaryTitle}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedRoom.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {t.reservation.summarySubtitle}
                  </p>
                </div>

                {/* Selected Room Preview Snapshot */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/60 mb-5">
                  <img
                    src={selectedRoom.image}
                    alt={selectedRoom.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-2xs"
                  />
                  <div className="min-w-0 text-xs">
                    <span className="font-bold text-slate-900 block truncate">{selectedRoom.name}</span>
                    <span className="text-slate-500 text-[11px] block font-medium">
                      {selectedRoom.size} · {language === 'en' ? selectedRoom.capacity.en : selectedRoom.capacity.id}
                    </span>
                    <span className="font-mono text-emerald-700 font-bold mt-0.5 block">
                      {formatRupiah(selectedRoom.pricePerNight)} / {t.reservation.nightSingular.toLowerCase()}
                    </span>
                  </div>
                </div>

                {/* Real-time Math Breakdown */}
                <div className="space-y-2.5 text-xs text-slate-600 border-b border-slate-100 pb-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">{t.reservation.checkInLabel}:</span>
                    <span className="font-bold text-slate-800 font-mono">{checkInDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">{t.reservation.checkOutLabel}:</span>
                    <span className="font-bold text-slate-800 font-mono">{checkOutDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">{t.reservation.totalStay}:</span>
                    <span className="font-bold text-slate-800">
                      {totalNights} {totalNights > 1 ? t.reservation.nightPlural : t.reservation.nightSingular}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">{t.reservation.roomsLabel} & {t.reservation.guestsLabel}:</span>
                    <span className="font-bold text-slate-800">{roomCount} {t.reservation.roomsSuffix} · {guestCount} {t.reservation.adultsSuffix}</span>
                  </div>
                  
                  {/* Bed Configuration pill */}
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-500">{t.reservation.bedTypeLabel}:</span>
                    <span className="font-bold text-[#1E3A2B] bg-[#1E3A2B]/10 px-2 py-0.5 rounded-md text-[11px]">
                      {getBedLabel(selectedBedType)}
                    </span>
                  </div>

                  {/* Breakfast Option pill */}
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">{t.reservation.breakfastLabel}:</span>
                    <span className={`font-bold px-2 py-0.5 rounded-md text-[11px] ${
                      breakfastPlan === 'with_breakfast' 
                        ? 'text-amber-800 bg-amber-100/70' 
                        : 'text-slate-600 bg-slate-100'
                    }`}>
                      {breakfastPlan === 'with_breakfast' ? t.reservation.withBreakfastTitle : t.reservation.roomOnlyTitle}
                    </span>
                  </div>

                  {/* Subtotal Kamar Calculation */}
                  <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-slate-200 text-slate-700">
                    <span>Kamar ({totalNights} mlm × {roomCount} kmr):</span>
                    <span className="font-mono font-bold text-slate-900">{formatRupiah(totalRoomCost)}</span>
                  </div>

                  {/* Subtotal Sarapan Calculation */}
                  {totalBreakfastCost > 0 ? (
                    <div className="flex justify-between items-center text-amber-900 font-medium">
                      <span>Sarapan ({guestCount} pax × {totalNights} mlm):</span>
                      <span className="font-mono font-bold">{formatRupiah(totalBreakfastCost)}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Sarapan (Room Only):</span>
                      <span className="font-mono font-semibold">Rp 0</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                    <span>{t.reservation.taxServiceLabel}</span>
                    <span className="text-emerald-700 font-bold">{t.reservation.taxServiceIncluded}</span>
                  </div>
                </div>

                {/* Big Grand Total Callout */}
                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E7D6C1] mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    {t.reservation.totalEstimate}
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-2xl sm:text-3xl font-bold text-[#1E3A2B] tracking-tight">
                      {formatRupiah(estimatedTotal)}
                    </span>
                    <span className="text-xs text-slate-500 font-bold uppercase">Nett</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="btn-submit-reservation"
                  disabled={isLoading}
                  className="w-full py-4 px-6 bg-[#1E3A2B] hover:bg-[#13261C] active:scale-[0.99] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 border border-[#C5A880]/30 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#C5A880]" />
                      <span>{t.reservation.submitting}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.reservation.btnSubmit}</span>
                      <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                    </>
                  )}
                </button>

                {/* Trust and Policy Guarantee */}
                <div className="mt-4 flex items-start gap-2 text-[11px] text-slate-500 leading-snug font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t.reservation.guaranteeText}</span>
                </div>
              </div>

              {/* Instant WhatsApp Help banner */}
              <div className="bg-[#1E3A2B] text-white p-4 rounded-2xl border border-[#C5A880]/30 flex items-center justify-between gap-3 shadow-xs">
                <div className="text-xs">
                  <span className="font-bold text-[#EFE4D2] block">Reservasi Grup / MICE?</span>
                  <span className="text-slate-300 text-[11px] font-medium">Chat langsung officer kami via WhatsApp</span>
                </div>
                <a
                  href={`https://wa.me/${HOTEL_CONFIG.whatsappNumber}?text=Halo%20IPB%20Convention%20Hotel,%20saya%20ingin%20konsultasi%20reservasi%20kamar`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs rounded-lg transition-colors shrink-0 flex items-center gap-1 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat WA</span>
                </a>
              </div>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};

export default ReservationFormSection;
