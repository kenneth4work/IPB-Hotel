import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import hotelLobbyImg from '../assets/images/regenerated_image_1789105660824.jpg';

export const AboutHotel: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="tentang" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden scroll-mt-24">
      {/* Garis siku dekoratif di pojok kiri bawah */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute bottom-6 left-6 w-28 h-24 border-l border-b border-[#C5A880] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Teks tentang hotel */}
          <div className="max-w-lg lg:ml-auto">
            <h2 className="font-serif text-2xl sm:text-3xl text-slate-900 font-bold tracking-wide mb-6">
              {t.about.title}
            </h2>
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>{t.about.intro}</p>
              <p>{t.about.detail}</p>
            </div>
          </div>

          {/* Foto hotel dengan blok aksen di belakang sudut kanan atas */}
          <div className="relative w-full max-w-xl mx-auto lg:mx-0 pt-4 pr-4 sm:pt-6 sm:pr-6">
            <div aria-hidden="true" className="absolute top-0 right-0 w-2/3 h-2/3 bg-[#C5A880]" />
            <img
              src={hotelLobbyImg}
              alt={t.about.imageAlt}
              className="relative w-full aspect-square object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
