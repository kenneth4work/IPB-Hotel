import React, { useState } from 'react';
import { Search, Calendar, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';

export const QuickAvailabilityBar: React.FC = () => {
  const { language, t } = useLanguage();
  const {
    checkInDate,
    checkOutDate,
    guestCount,
    roomCount,
    totalNights,
    promoCode,
    setCheckInDate,
    setCheckOutDate,
    setGuestCount,
    setRoomCount,
    scrollToReservation,
  } = useBooking();

  const [isSearching, setIsSearching] = useState(false);
  const isEn = language === 'en';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      scrollToReservation();
    }, 400);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-30">
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200/80 transition-all hover:shadow-slate-300/40">
        
        {/* Top Header Row matching user attachment: dot + title on left, pill on right */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
          {/* Title with Amber Dot */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C86400] shrink-0 animate-pulse" />
            <h3 className="font-extrabold text-xs sm:text-sm tracking-wider uppercase text-slate-900 font-sans">
              {t.quickBar.title}
            </h3>
          </div>

          {/* Pill Badge: Stay Duration & Promo Code */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-200/90 bg-amber-50/80 text-xs text-amber-950 font-medium self-start md:self-auto shadow-2xs">
            <span>
              {t.quickBar.durationPrefix}{' '}
              <strong className="font-bold text-amber-900">
                {totalNights} {totalNights > 1 ? t.quickBar.nightPlural : t.quickBar.nightSingular}
              </strong>
            </span>
            <span className="text-amber-400 font-bold">•</span>
            <span>
              {t.quickBar.promoCodeLabel}{' '}
              <strong className="font-extrabold text-[#C86400] tracking-wide">
                {promoCode}
              </strong>
            </span>
          </div>
        </div>

        {/* 5-Column Interactive Search & Availability Form */}
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 items-end">
            
            {/* 1. TANGGAL CHECK-IN */}
            <div>
              <label 
                htmlFor="quick-checkin"
                className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5"
              >
                {t.quickBar.checkInLabel}
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="quick-checkin"
                  value={checkInDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200/90 text-sm font-bold text-slate-800 bg-white hover:border-slate-300 focus:border-[#C86400] focus:ring-2 focus:ring-[#C86400]/20 outline-hidden transition-all cursor-pointer shadow-2xs"
                  required
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 2. TANGGAL CHECK-OUT */}
            <div>
              <label 
                htmlFor="quick-checkout"
                className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5"
              >
                {t.quickBar.checkOutLabel}
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="quick-checkout"
                  value={checkOutDate}
                  min={checkInDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200/90 text-sm font-bold text-slate-800 bg-white hover:border-slate-300 focus:border-[#C86400] focus:ring-2 focus:ring-[#C86400]/20 outline-hidden transition-all cursor-pointer shadow-2xs"
                  required
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 3. JUMLAH TAMU */}
            <div>
              <label 
                htmlFor="quick-guests"
                className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5"
              >
                {t.quickBar.guestsLabel}
              </label>
              <div className="relative">
                <select
                  id="quick-guests"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200/90 text-sm font-bold text-slate-800 bg-white hover:border-slate-300 focus:border-[#C86400] focus:ring-2 focus:ring-[#C86400]/20 outline-hidden transition-all cursor-pointer appearance-none shadow-2xs"
                >
                  <option value={1}>1 {isEn ? 'Adult Guest' : 'Tamu Dewasa'}</option>
                  <option value={2}>2 {isEn ? 'Adult Guests' : 'Tamu Dewasa'}</option>
                  <option value={3}>3 {isEn ? 'Adult Guests' : 'Tamu Dewasa'}</option>
                  <option value={4}>4 {isEn ? 'Adult Guests' : 'Tamu Dewasa'}</option>
                  <option value={5}>5+ {isEn ? 'Adult Guests' : 'Tamu Dewasa'}</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 4. JUMLAH KAMAR */}
            <div>
              <label 
                htmlFor="quick-rooms"
                className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5"
              >
                {t.quickBar.roomsLabel}
              </label>
              <div className="relative">
                <select
                  id="quick-rooms"
                  value={roomCount}
                  onChange={(e) => setRoomCount(Number(e.target.value))}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200/90 text-sm font-bold text-slate-800 bg-white hover:border-slate-300 focus:border-[#C86400] focus:ring-2 focus:ring-[#C86400]/20 outline-hidden transition-all cursor-pointer appearance-none shadow-2xs"
                >
                  <option value={1}>1 {isEn ? 'Room' : 'Kamar'}</option>
                  <option value={2}>2 {isEn ? 'Rooms' : 'Kamar'}</option>
                  <option value={3}>3 {isEn ? 'Rooms' : 'Kamar'}</option>
                  <option value={4}>4 {isEn ? 'Rooms' : 'Kamar'}</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 5. TOMBOL CEK KETERSEDIAAN */}
            <div>
              <button
                type="submit"
                id="btn-quick-check-availability"
                disabled={isSearching}
                className="w-full py-2.5 px-5 rounded-xl bg-[#1e3a2b] hover:bg-[#15291e] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-80"
              >
                <Search className="w-4 h-4 text-amber-100 shrink-0 stroke-[2.5]" />
                <span>
                  {isSearching ? t.quickBar.searching : t.quickBar.btnCheckAvailability}
                </span>
              </button>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
