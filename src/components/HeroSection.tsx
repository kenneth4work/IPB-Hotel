import React from 'react';
import { Link } from 'react-router-dom';
import { HOTEL_CONFIG, roomCategories, getRoomImageUrl } from '../data/hotelData';
import { ArrowDown, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { QuickAvailabilityBar } from './QuickAvailabilityBar';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const suiteFirstPhoto = getRoomImageUrl(roomCategories["Suite"][0]);

  return (
    <section className="relative overflow-hidden bg-[#0F172A] text-white min-h-[100svh] lg:min-h-[820px] flex items-center pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      {/* Background Hero Banner - Foto Kamar Suite Room Slide Pertama */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105 transform transition-transform duration-1000"
        style={{
          backgroundImage: `url('${suiteFirstPhoto}')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 via-[#0F172A]/50 to-[#0F172A]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/65 via-[#0F172A]/25 to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-10 lg:gap-14 items-center text-left">
        <div className="max-w-2xl">

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
            {HOTEL_CONFIG.name}
          </h1>

          {/* Tagline */}
          <p className="font-serif italic text-lg sm:text-2xl text-[#EFE4D2] mb-9 font-normal">
            "{t.hero.tagline}"
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4">
            {/* Tombol Lihat Pilihan Kamar - Liquid Glass Aesthetic */}
            <a
              id="hero-explore-rooms-button"
              href="#kamar"
              className="group relative overflow-hidden w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-b from-white/25 via-white/12 to-white/8 hover:from-white/32 hover:via-white/18 hover:to-white/12 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-xl backdrop-saturate-150 border border-white/35 hover:border-white/55 shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),inset_0_-1px_2px_rgba(255,255,255,0.18),0_10px_30px_-5px_rgba(0,0,0,0.35)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.85),inset_0_-1px_3px_rgba(197,168,128,0.3),0_14px_36px_-5px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 before:content-[''] before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-out before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent after:content-[''] after:absolute after:inset-x-5 after:top-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-transparent"
            >
              <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{t.hero.ctaRooms}</span>
              <ArrowDown className="relative z-10 w-4 h-4 text-[#EFE4D2] transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            {/* Tombol Pesan Sekarang - Liquid Glass Aesthetic */}
            <Link
              id="hero-whatsapp-booking-button"
              to="/reservasi"
              className="group relative overflow-hidden w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-b from-white/25 via-white/12 to-white/8 hover:from-white/32 hover:via-white/18 hover:to-white/12 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-xl backdrop-saturate-150 border border-white/35 hover:border-white/55 shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),inset_0_-1px_2px_rgba(255,255,255,0.18),0_10px_30px_-5px_rgba(0,0,0,0.35)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.85),inset_0_-1px_3px_rgba(197,168,128,0.3),0_14px_36px_-5px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 before:content-[''] before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-out before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent after:content-[''] after:absolute after:inset-x-5 after:top-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-transparent"
            >
              <Calendar className="relative z-10 w-4 h-4 text-[#C5A880] transition-transform duration-300 group-hover:scale-110" />
              <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{t.navbar.bookNow}</span>
            </Link>
          </div>
        </div>

        {/* Cek Ketersediaan Kamar & Tarif Terbaik - di samping kanan judul hero */}
        <QuickAvailabilityBar />
        </div>
      </div>
    </section>
  );
};
