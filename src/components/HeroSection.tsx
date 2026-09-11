import React from 'react';
import { HOTEL_CONFIG } from '../data/hotelData';
import { ArrowDown, MessageCircle, MapPin, Building2, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HeroSection: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#0F172A] text-white pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Background Subtle Gradient & Architecture Texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 transform transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#1E3A2B]/80 to-[#0F172A]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Subtle Luxury Category Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#C5A880] text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'id' ? 'Kenyamanan Bintang di Kawasan Botani Square' : 'Premier Hospitality in Botani Square Area'}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
            {HOTEL_CONFIG.name}
          </h1>

          {/* Tagline */}
          <p className="font-serif italic text-lg sm:text-2xl text-[#EFE4D2] mb-6 font-normal">
            "{HOTEL_CONFIG.tagline}"
          </p>

          {/* Subtitle from user specs */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            {language === 'id'
              ? 'Tersedia 83 kamar dengan 4 tipe pilihan, dirancang untuk kenyamanan maksimal dengan sentuhan modern dan alami. Menjadi pilihan utama akomodasi bisnis, keluarga, dan kegiatan MICE di Kota Bogor.'
              : 'Offering 83 thoughtfully appointed rooms across 4 curated types, crafted for utmost comfort with contemporary elegance. The prime destination for business, leisure, and MICE events in Bogor.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              id="hero-explore-rooms-button"
              href="#kamar"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A880] hover:bg-[#b59870] text-slate-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>{t.hero.ctaRooms}</span>
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              id="hero-whatsapp-booking-button"
              href={`https://wa.me/${HOTEL_CONFIG.whatsappNumber}?text=Halo%20IPB%20Convention%20Hotel,%20saya%20ingin%20reservasi%20kamar`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all border border-white/20 backdrop-blur-sm flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{language === 'id' ? 'BOOKING VIA WHATSAPP' : 'BOOK VIA WHATSAPP'}</span>
            </a>
          </div>

          {/* Key Quick Highlight Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-sm p-4 rounded-xl">
              <Building2 className="w-5 h-5 text-[#C5A880] mb-2" />
              <div className="font-semibold text-white text-sm">{language === 'id' ? '83 Kamar Pilihan' : '83 Selected Rooms'}</div>
              <div className="text-xs text-slate-400">Suite, Executive, Deluxe & Standard</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-sm p-4 rounded-xl">
              <MapPin className="w-5 h-5 text-[#C5A880] mb-2" />
              <div className="font-semibold text-white text-sm">{language === 'id' ? 'Akses Botani Square' : 'Botani Square Access'}</div>
              <div className="text-xs text-slate-400">{language === 'id' ? 'Jembatan langsung ke mall & lifestyle' : 'Direct link to mall & lifestyle'}</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-sm p-4 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-[#C5A880] mb-2" />
              <div className="font-semibold text-white text-sm">{language === 'id' ? 'Kawasan IICC' : 'IICC Convention Area'}</div>
              <div className="text-xs text-slate-400">{language === 'id' ? 'Pusat MICE & konvensi bergengsi' : 'Prestigious MICE & event venue'}</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-sm p-4 rounded-xl">
              <Sparkles className="w-5 h-5 text-[#C5A880] mb-2" />
              <div className="font-semibold text-white text-sm">{language === 'id' ? 'Check-in Nyaman' : 'Convenient Check-in'}</div>
              <div className="text-xs text-slate-400">Check-in: 14:00 · Check-out: 12:00</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
