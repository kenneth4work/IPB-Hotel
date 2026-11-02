import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HOTEL_CONFIG } from '../data/hotelData';
import { MapPin, Phone, Mail, Instagram, ArrowUp, MessageSquare, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import brandLogoImg from '../assets/images/regenerated_image_1789095966156.png';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const { pathname } = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <Link 
              to="/" 
              onClick={scrollToTop}
              className="inline-block group focus:outline-hidden"
              title={HOTEL_CONFIG.name}
            >
              <img 
                src={brandLogoImg} 
                alt={HOTEL_CONFIG.name}
                className="h-14 sm:h-16 md:h-20 w-auto max-w-[240px] sm:max-w-[280px] object-contain object-left transition-transform duration-200 group-hover:scale-[1.02] brightness-0 invert opacity-90 group-hover:opacity-100"
                onError={(e) => {
                  e.currentTarget.src = '/images/logo.svg';
                }}
              />
            </Link>
            <p className="font-serif italic text-sm text-[#EFE4D2]">
              "{t.footer.tagline}"
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer.aboutDesc}
            </p>
          </div>

          {/* Col 2: Pilihan Kamar */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4">
              {t.footer.rooms}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {HOTEL_CONFIG.rooms.map((room) => (
                <li key={room.type}>
                  <Link 
                    to="/#kamar" 
                    className="hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span className="group-hover:text-[#C5A880] transition-colors">{room.type}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{room.size}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Waktu Operasional & Akses */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4">
              {t.footer.hoursAccess}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-500 block uppercase">Check-in / Check-out</span>
                <span className="text-white font-semibold">In: {HOTEL_CONFIG.checkIn} · Out: {HOTEL_CONFIG.checkOut}</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-500 block uppercase">{t.footer.frontDesk}</span>
                <span className="text-white font-semibold">{t.footer.concierge}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Kontak Resmi */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4">
              {t.footer.contact}
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-snug">{HOTEL_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span className="text-slate-300">{HOTEL_CONFIG.phones[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`mailto:${HOTEL_CONFIG.email}`} className="text-slate-300 hover:text-white hover:underline">
                  {HOTEL_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a 
                  href={`https://instagram.com/${HOTEL_CONFIG.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white hover:underline"
                >
                  {HOTEL_CONFIG.instagram}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom micro copyright bar (shifted left on desktop & padded on mobile so it is never covered by the floating WhatsApp button) */}
        <div className="pt-8 pb-14 sm:pb-0 sm:pr-48 lg:pr-44 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <Shield className="w-4 h-4 text-slate-600" />
            <span>© {new Date().getFullYear()} {HOTEL_CONFIG.name}. {t.footer.allRightsReserved}</span>
          </div>

          <div className="flex items-center gap-5 sm:gap-6">
            <a 
              href={HOTEL_CONFIG.googleMapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white hover:underline"
            >
              Google Maps
            </a>
            <a 
              href={`https://wa.me/${HOTEL_CONFIG.whatsappNumber}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white hover:underline"
            >
              WhatsApp
            </a>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#1E3A2B] text-slate-200 hover:text-[#C5A880] border border-slate-700 hover:border-[#C5A880]/50 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:-translate-y-0.5"
              aria-label={t.footer.backToTop}
              title={t.footer.backToTop}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Instant WhatsApp Button (Fixed on Viewport following scroll) */}
      <aside aria-label="WhatsApp Floating Help">
        <a
          key={pathname}
          id="floating-whatsapp-trigger"
          href={`https://wa.me/${HOTEL_CONFIG.whatsappNumber}?text=Halo%20IPB%20Convention%20Hotel,%20saya%20ingin%20bertanya%20mengenai%20reservasi`}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-floating-enter fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_14px_36px_rgba(37,211,102,0.55)] flex items-center gap-2.5 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 group border-2 border-white/30"
          aria-label="Chat WhatsApp Reservasi Hotel"
        >
          <MessageSquare className="w-5 h-5 text-white fill-white transition-transform duration-300 group-hover:rotate-6" />
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-slate-950 font-sans">
            {language === 'en' ? 'Contact Us' : 'Hubungi Kami'}
          </span>
        </a>
      </aside>
    </footer>
  );
};
