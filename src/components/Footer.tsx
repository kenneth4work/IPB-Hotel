import React from 'react';
import { HOTEL_CONFIG } from '../data/hotelData';
import { MapPin, Phone, Mail, Instagram, ArrowUp, MessageSquare, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E3A2B] flex items-center justify-center text-[#C5A880] font-serif font-bold text-lg border border-[#C5A880]/30">
                IPB
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                {HOTEL_CONFIG.name}
              </span>
            </div>
            <p className="font-serif italic text-sm text-[#EFE4D2]">
              "{HOTEL_CONFIG.tagline}"
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'id'
                ? 'Hotel konvensi terkemuka di Kota Bogor yang terhubung langsung dengan Mall Botani Square dan IPB International Convention Center (IICC).'
                : 'Premier convention hotel in Bogor City, directly connected to Botani Square Mall and IPB International Convention Center (IICC).'}
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
                  <a 
                    href="#kamar" 
                    className="hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span className="group-hover:text-[#C5A880] transition-colors">{room.type}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{room.size}</span>
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#kamar" className="text-[#C5A880] hover:underline text-xs font-semibold">
                  {language === 'id' ? 'Lihat Seluruh 83 Kamar →' : 'View All 83 Rooms →'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Waktu Operasional & Akses */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4">
              {language === 'id' ? 'Waktu & Akses' : 'Hours & Access'}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-500 block uppercase">Check-in / Check-out</span>
                <span className="text-white font-semibold">In: {HOTEL_CONFIG.checkIn} · Out: {HOTEL_CONFIG.checkOut}</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-500 block uppercase">{language === 'id' ? 'Front Desk 24 Jam' : '24/7 Front Desk'}</span>
                <span className="text-white font-semibold">{language === 'id' ? 'Layanan Concierge & Keamanan' : 'Concierge & Security Services'}</span>
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

        {/* Bottom micro copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <Shield className="w-4 h-4 text-slate-600" />
            <span>© {new Date().getFullYear()} {HOTEL_CONFIG.name}. {language === 'id' ? 'Seluruh hak cipta dilindungi.' : 'All rights reserved.'}</span>
          </div>

          <div className="flex items-center gap-6">
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
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
              aria-label={language === 'id' ? 'Kembali ke atas' : 'Back to top'}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Instant WhatsApp Button */}
      <aside aria-label="WhatsApp Floating Help">
        <a
          id="floating-whatsapp-trigger"
          href={`https://wa.me/${HOTEL_CONFIG.whatsappNumber}?text=Halo%20IPB%20Convention%20Hotel,%20saya%20ingin%20bertanya%20mengenai%20reservasi`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 group border-2 border-white/20"
          aria-label="Chat WhatsApp Reservasi Hotel"
        >
          <MessageSquare className="w-5 h-5 text-white fill-white" />
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-slate-950 font-sans">
            Chat WhatsApp
          </span>
        </a>
      </aside>
    </footer>
  );
};
