import React from 'react';
import { Footprints, Navigation } from 'lucide-react';
import SimpleLocationList, { locationData } from './SimpleLocationList';

export { locationData, SimpleLocationList };

export const WhatsAroundLocation: React.FC = () => {
  // Exact Coordinates for IPB Convention Hotel Bogor (Pusat Kota Bogor, Mall Botani Square)
  const coordinates = {
    lat: -6.600864,
    lng: 106.806276,
  };

  return (
    <section id="lokasi" className="py-16 sm:py-24 bg-[#FDFBF7] relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-4 tracking-tight">
            Di Jantung Kota Bogor, Dekat Segalanya
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mb-4" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Terhubung langsung dengan Mall Botani Square dan pintu Tol Jagorawi. Jelajahi kemudahan akses ke berbagai ikon wisata, pusat transportasi, dan destinasi menarik Kota Bogor.
          </p>
        </div>

        {/* 1. WADAH PETA INTERAKTIF GOOGLE MAPS DENGAN TITIK KOORDINAT TERPUSAT */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-3 sm:p-4 mb-8 sm:mb-10 overflow-hidden">
          <div className="relative w-full h-80 sm:h-96 lg:h-[440px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner group">
            {/* Interactive Centered Google Maps Iframe */}
            <iframe
              title="Google Maps Lokasi IPB Convention Hotel Bogor"
              src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}+(IPB+Convention+Hotel+Bogor)&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Info Badge on Map Top Left */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-md flex items-center gap-2 pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-[11px] font-bold text-slate-800">
                Bogor Tengah · Kawasan Botani Square
              </span>
            </div>

            {/* Floating Info Badge on Map Top Right */}
            <div className="absolute top-3 right-3 hidden sm:flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-md pointer-events-none text-[11px] font-semibold text-slate-700">
              <Footprints className="w-3.5 h-3.5 text-emerald-600" />
              <span>1 Menit ke Mall & Terminal DAMRI</span>
            </div>

            {/* Bottom Floating Direction Button */}
            <div className="absolute bottom-3 right-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900/90 hover:bg-slate-950 backdrop-blur-sm text-white text-xs font-bold rounded-xl shadow-lg border border-white/20 transition-all hover:scale-105 active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Petunjuk Arah ke Hotel</span>
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
