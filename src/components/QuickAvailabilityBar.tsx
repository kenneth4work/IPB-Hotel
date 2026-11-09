import React, { useState } from 'react';
import { Search, Calendar, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';

export const QuickAvailabilityBar: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const {
    checkInDate,
    checkOutDate,
    guestCount,
    roomCount,
    setCheckInDate,
    setCheckOutDate,
    setGuestCount,
    setRoomCount,
  } = useBooking();

  const [isSearching, setIsSearching] = useState(false);
  const isEn = language === 'en';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      navigate('/reservasi');
    }, 300);
  };

  return (
    <div style={style} className={`w-full max-w-md lg:max-w-[400px] lg:justify-self-end relative z-30 text-left ${className}`}>
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/30 transition-all">
        
        {/* Top Header Row: dot + title */}
        <div className="flex items-center gap-2 mb-3.5 pb-3 border-b border-slate-100">
          <span className="w-2 h-2 rounded-full bg-[#C86400] shrink-0 animate-pulse" />
          <h2 className="font-bold text-sm tracking-tight text-slate-900 font-sans">
            {t.quickBar.title}
          </h2>
        </div>

        {/* 5-Column Interactive Search & Availability Form */}
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
            
            {/* 1. TANGGAL CHECK-IN */}
            <div>
              <label 
                htmlFor="quick-checkin"
                className="block text-[11px] font-semibold text-slate-600 mb-1"
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
                  className="date-custom-icon w-full h-10 pl-3 pr-9 rounded-lg border border-slate-200/90 text-[13px] font-bold text-slate-800 bg-white hover:border-slate-300 focus:border-[#C86400] focus:ring-2 focus:ring-[#C86400]/20 outline-hidden transition-all cursor-pointer shadow-2xs"
                  required
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 2. TANGGAL CHECK-OUT */}
            <div>
              <label 
                htmlFor="quick-checkout"
                className="block text-[11px] font-semibold text-slate-600 mb-1"
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
                  className="date-custom-icon w-full h-10 pl-3 pr-9 rounded-lg border border-slate-200/90 text-[13px] font-bold text-slate-800 bg-white hover:border-slate-300 focus:border-[#C86400] focus:ring-2 focus:ring-[#C86400]/20 outline-hidden transition-all cursor-pointer shadow-2xs"
                  required
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 3. JUMLAH TAMU */}
            <div>
              <label 
                htmlFor="quick-guests"
                className="block text-[11px] font-semibold text-slate-600 mb-1"
              >
                {t.quickBar.guestsLabel}
              </label>
              <div className="relative">
                <select
                  id="quick-guests"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-10 pl-3 pr-9 rounded-lg border border-slate-200/90 text-[13px] font-bold text-slate-800 bg-white hover:border-slate-300 focus:border-[#C86400] focus:ring-2 focus:ring-[#C86400]/20 outline-hidden transition-all cursor-pointer appearance-none shadow-2xs"
                >
                  <option value={1}>1 {isEn ? 'Adult Guest' : 'Tamu Dewasa'}</option>
                  <option value={2}>2 {isEn ? 'Adult Guests' : 'Tamu Dewasa'}</option>
                  <option value={3}>3 {isEn ? 'Adult Guests' : 'Tamu Dewasa'}</option>
                  <option value={4}>4 {isEn ? 'Adult Guests' : 'Tamu Dewasa'}</option>
                  <option value={5}>5+ {isEn ? 'Adult Guests' : 'Tamu Dewasa'}</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 4. JUMLAH KAMAR */}
            <div>
              <label 
                htmlFor="quick-rooms"
                className="block text-[11px] font-semibold text-slate-600 mb-1"
              >
                {t.quickBar.roomsLabel}
              </label>
              <div className="relative">
                <select
                  id="quick-rooms"
                  value={roomCount}
                  onChange={(e) => setRoomCount(Number(e.target.value))}
                  className="w-full h-10 pl-3 pr-9 rounded-lg border border-slate-200/90 text-[13px] font-bold text-slate-800 bg-white hover:border-slate-300 focus:border-[#C86400] focus:ring-2 focus:ring-[#C86400]/20 outline-hidden transition-all cursor-pointer appearance-none shadow-2xs"
                >
                  <option value={1}>1 {isEn ? 'Room' : 'Kamar'}</option>
                  <option value={2}>2 {isEn ? 'Rooms' : 'Kamar'}</option>
                  <option value={3}>3 {isEn ? 'Rooms' : 'Kamar'}</option>
                  <option value={4}>4 {isEn ? 'Rooms' : 'Kamar'}</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 5. TOMBOL CEK KETERSEDIAAN */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                id="btn-quick-check-availability"
                disabled={isSearching}
                className="w-full h-10 px-5 rounded-lg bg-[#1e3a2b] hover:bg-[#15291e] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-80"
              >
                <Search className="w-4 h-4 text-amber-100 shrink-0 stroke-[2.5]" />
                <span className="truncate">
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
