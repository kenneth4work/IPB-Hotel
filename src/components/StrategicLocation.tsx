import React from 'react';
import { HOTEL_CONFIG, NEARBY_LANDMARKS } from '../data/hotelData';
import { 
  MapPin, 
  Phone, 
  Instagram, 
  Clock, 
  ExternalLink, 
  Compass, 
  Navigation, 
  Car, 
  Sparkles 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const StrategicLocation: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="lokasi" className="py-20 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A8865B] block mb-3">
            {t.location.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-4 tracking-tight">
            {t.location.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mb-5" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.location.subtitle}
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column (Contact & Schedule Specs) - 6 or 7 cols */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#C5A880]" />
                <span>{language === 'id' ? 'Informasi Akses & Kontak' : 'Access & Contact Information'}</span>
              </h3>

              {/* Clean luxury list with subtle rounded icon containers (bg-slate-100/80 p-2.5 text-slate-800) */}
              <div className="space-y-4">
                {/* Alamat */}
                <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="bg-slate-100/80 p-2.5 text-slate-800 rounded-xl shrink-0 border border-slate-200/60 shadow-xs">
                    <MapPin className="w-5 h-5 text-[#1E3A2B]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {t.location.addressLabel}
                    </span>
                    <p className="text-sm font-semibold text-slate-800 leading-snug">
                      {HOTEL_CONFIG.address}
                    </p>
                  </div>
                </div>

                {/* Telepon */}
                <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="bg-slate-100/80 p-2.5 text-slate-800 rounded-xl shrink-0 border border-slate-200/60 shadow-xs">
                    <Phone className="w-5 h-5 text-[#1E3A2B]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {language === 'id' ? 'Telepon Reservasi' : 'Reservation Phone'}
                    </span>
                    <div className="text-sm font-semibold text-slate-800 flex flex-wrap gap-2">
                      {HOTEL_CONFIG.phones.map((phone, idx) => (
                        <a 
                          key={phone} 
                          href={`tel:${phone.replace(/\D/g, '')}`}
                          className="hover:text-[#1E3A2B] hover:underline"
                        >
                          {phone}{idx < HOTEL_CONFIG.phones.length - 1 ? ' / ' : ''}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="bg-slate-100/80 p-2.5 text-slate-800 rounded-xl shrink-0 border border-slate-200/60 shadow-xs">
                    <Instagram className="w-5 h-5 text-[#1E3A2B]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {language === 'id' ? 'Instagram Resmi' : 'Official Instagram'}
                    </span>
                    <a 
                      href={`https://instagram.com/${HOTEL_CONFIG.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#1E3A2B] hover:underline inline-flex items-center gap-1"
                    >
                      <span>{HOTEL_CONFIG.instagram}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* Check-in / Check-out */}
                <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors bg-[#FDFBF7] border border-[#F1E9DA]">
                  <div className="bg-slate-100/80 p-2.5 text-slate-800 rounded-xl shrink-0 border border-slate-200/60 shadow-xs">
                    <Clock className="w-5 h-5 text-[#A8865B]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {language === 'id' ? 'Waktu Kedatangan & Keberangkatan' : 'Check-in & Check-out Schedule'}
                    </span>
                    <p className="text-sm font-bold text-slate-900">
                      Check-in: {HOTEL_CONFIG.checkIn} · Check-out: {HOTEL_CONFIG.checkOut}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Surrounding Highlights */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#C5A880]" />
                {t.location.landmarksTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {NEARBY_LANDMARKS.slice(0, 4).map((item) => (
                  <div key={item.name} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-800">{item.name}</span>
                      <span className="text-[10px] font-bold text-[#1E3A2B] bg-[#1E3A2B]/10 px-2 py-0.5 rounded-full">
                        {item.time}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Map Card) - 6 cols */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A8865B] bg-[#F4ECE1] px-3 py-1 rounded-full">
                    Pusat Konvensi & Akomodasi
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-slate-400" />
                    Valet & Parkir Tersedia
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1">
                  {HOTEL_CONFIG.name}
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  {HOTEL_CONFIG.address}
                </p>
              </div>

              {/* Modern Stylized Interactive Map Canvas Display */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner group">
                {/* Visual stylization map grid */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80')`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-slate-900/30" />

                {/* Interactive Map Pinpoint Graphic */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="relative mb-3 animate-bounce">
                    {/* Glowing pulse rings */}
                    <div className="absolute -inset-2 rounded-full bg-[#C5A880]/30 animate-ping" />
                    <div className="relative w-12 h-12 rounded-full bg-[#1E3A2B] border-2 border-[#C5A880] shadow-xl flex items-center justify-center text-[#C5A880]">
                      <MapPin className="w-6 h-6 fill-[#C5A880] text-[#1E3A2B]" />
                    </div>
                  </div>

                  <div className="bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shadow-lg max-w-xs">
                    <span className="font-serif text-sm font-bold text-white block">
                      {HOTEL_CONFIG.name}
                    </span>
                    <span className="text-[11px] text-[#C5A880] block font-medium">
                      Kawasan Mall Botani Square & IICC
                    </span>
                  </div>
                </div>

                {/* Floating Map Labels for Real Context */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-semibold text-slate-800 shadow-sm border border-slate-200">
                  📍 Baranangsiang Junction
                </div>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-semibold text-slate-800 shadow-sm border border-slate-200">
                  🌿 5 Menit ke Kebun Raya Bogor
                </div>
              </div>

              {/* Actionable Button: "BUKA DI GOOGLE MAPS" */}
              <div className="mt-6">
                <a
                  id="open-google-maps-btn"
                  href={HOTEL_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 bg-[#1E3A2B] hover:bg-[#13261C] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 border border-[#C5A880]/40 group hover:-translate-y-0.5"
                >
                  <Navigation className="w-4 h-4 text-[#C5A880] group-hover:rotate-12 transition-transform" />
                  <span>{language === 'id' ? 'BUKA DI GOOGLE MAPS' : 'OPEN IN GOOGLE MAPS'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300 ml-1" />
                </a>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  {language === 'id' ? 'Dapatkan petunjuk rute navigasi instan menggunakan Google Maps / Waze.' : 'Get instant turn-by-turn navigation directions via Google Maps or Waze.'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
