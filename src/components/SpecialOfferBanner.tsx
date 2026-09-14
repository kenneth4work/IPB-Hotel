import React from 'react';
import { HOTEL_CONFIG } from '../data/hotelData';
import { Sparkles, Calendar, MessageSquare, Utensils, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SpecialOfferBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 bg-[#0F172A] relative overflow-hidden">
      {/* Executive Textured Backdrop: Deep Emerald/Pine Night Tone */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A2B] via-[#13261C] to-[#0F172A] opacity-95" />

      {/* Luxury Decorative Accent Rings */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-[#C5A880]/15 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border border-[#C5A880]/10 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Label: "PENAWARAN SPESIAL" (Uppercase, tracking-widest) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#EFE4D2] text-xs font-bold uppercase tracking-[0.25em] mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>{t.specialOffer.badge}</span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight leading-tight">
          {t.specialOffer.title}
        </h2>

        {/* Subtext */}
        <p className="text-slate-200 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          {t.specialOffer.subtitle}
        </p>

        {/* Value badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-10 text-xs text-[#EFE4D2]">
          <div className="flex items-center gap-1.5">
            <Utensils className="w-4 h-4 text-[#C5A880]" />
            <span>{t.specialOffer.feature1}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
            <span>{t.specialOffer.feature2}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
            <span>{t.specialOffer.feature3}</span>
          </div>
        </div>

        {/* Dual Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            id="banner-book-now-button"
            href="#kamar"
            className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] hover:bg-[#b59870] text-slate-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-[#EFE4D2]/40"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.specialOffer.bookNow}</span>
          </a>

          <a
            id="banner-contact-us-button"
            href="#kontak"
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all border border-white/40 hover:border-white/70 backdrop-blur-sm flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <MessageSquare className="w-4 h-4 text-[#C5A880]" />
            <span>{t.specialOffer.contactUs}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
