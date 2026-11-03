import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import SimpleLocationList, { locationData } from './SimpleLocationList';
import { useLanguage } from '../context/LanguageContext';
import { useConsent } from '../context/ConsentContext';
import { HOTEL_CONFIG } from '../data/hotelData';
import { LEGAL_ROUTES, LEGAL_UI } from '../data/legalContent';

export { locationData, SimpleLocationList };

export const WhatsAroundLocation: React.FC = () => {
  const { language, t } = useLanguage();
  const { choice, setChoice } = useConsent();
  const ui = LEGAL_UI[language];

  // Exact Coordinates for IPB Convention Hotel Botani Square Bogor from official Google Maps pin
  const coordinates = {
    lat: -6.6019596,
    lng: 106.8065591,
  };

  const sectionTitle = language === 'en' ? 'In the Heart of Bogor' : 'Di Jantung Kota Bogor';
  const sectionSubtitle = language === 'en'
    ? 'Directly connected to Botani Square Mall and Jagorawi Toll Gate. Explore effortless access to iconic landmarks, transit hubs, and popular destinations in Bogor.'
    : 'Terhubung langsung dengan Mall Botani Square dan pintu Tol Jagorawi. Jelajahi kemudahan akses ke berbagai ikon wisata, pusat transportasi, dan destinasi menarik Kota Bogor.';

  return (
    <section id="lokasi" className="py-16 sm:py-24 bg-[#FDFBF7] relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-4 tracking-tight">
            {sectionTitle}
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mb-4" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* 1. WADAH PETA INTERAKTIF GOOGLE MAPS DENGAN TITIK KOORDINAT TERPUSAT */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-3 sm:p-4 mb-8 sm:mb-10 overflow-hidden">
          <div className="relative w-full h-80 sm:h-96 lg:h-[440px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner group">
            {/* Iframe Google Maps hanya dimuat setelah tamu mengizinkan */}
            {choice === 'accepted' ? (
              <iframe
                title={language === 'en' ? 'Google Maps Location of IPB Convention Hotel Botani Square' : 'Google Maps Lokasi IPB Convention Hotel Botani Square'}
                src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}+(IPB+Convention+Hotel+Botani+Square)&t=&z=17&ie=UTF8&iwloc=B&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center gap-3 p-6 pb-16">
                <MapPin className="w-8 h-8 text-[#1E3A2B]" />
                <h3 className="text-lg font-bold text-slate-900">{ui.mapTitle}</h3>
                <p className="max-w-md text-sm text-slate-700">{ui.mapText}</p>
                <p className="max-w-md text-sm font-semibold text-slate-900">{HOTEL_CONFIG.address}</p>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  <button
                    type="button"
                    onClick={() => setChoice('accepted')}
                    className="px-4 py-2.5 bg-[#1E3A2B] hover:bg-[#13261C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    {ui.mapLoad}
                  </button>
                  <Link to={LEGAL_ROUTES.cookies} className="text-xs font-semibold text-[#1E3A2B] underline">
                    {ui.cookies}
                  </Link>
                </div>
              </div>
            )}

            {/* Bottom Floating Direction Button */}
            <div className="absolute bottom-3 right-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900/90 hover:bg-slate-950 backdrop-blur-sm text-white text-xs font-bold rounded-xl shadow-lg border border-white/20 transition-all hover:scale-105 active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{t.location.directionsBtn}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. DAFTAR TEMPAT PENTING DI SEKITAR BOGOR (FORMAT KOLOM BERSIH ALA BOOKING PLATFORM) */}
        <SimpleLocationList />

      </div>
    </section>
  );
};

export default WhatsAroundLocation;
