import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, MapPin, Menu, X, Calendar, Globe } from 'lucide-react';
import { HOTEL_CONFIG, generateWhatsAppBookingUrl } from '../data/hotelData';
import brandLogoImg from '../assets/images/regenerated_image_1789095966156.png';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onSelectRoomBooking?: (roomType: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectRoomBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.navbar.rooms, href: '#kamar' },
    { label: t.navbar.gallery, href: '#galeri' },
    { label: t.navbar.location, href: '#lokasi' },
    { label: t.navbar.reviews, href: '#ulasan' },
    { label: language === 'id' ? 'Kontak & Bantuan' : 'Contact & Help', href: '#kontak' },
  ];

  return (
    <>
      {/* Top micro bar for quick institutional contacts */}
      <header className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="hidden sm:inline">Jl. Padjajaran Raya (Samping Mall Botani Square)</span>
              <span className="sm:hidden">Botani Square, Bogor</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{HOTEL_CONFIG.phones[0]}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 hidden lg:inline">
              Check-in: <strong className="text-slate-200">{HOTEL_CONFIG.checkIn}</strong> · Check-out: <strong className="text-slate-200">{HOTEL_CONFIG.checkOut}</strong>
            </span>
            <a
              id="topbar-wa-link"
              href={`https://wa.me/${HOTEL_CONFIG.whatsappNumber}?text=Halo%20IPB%20Convention%20Hotel`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#C5A880] hover:text-[#e4caa5] font-medium transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Official</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Sticky Navbar */}
      <nav
        id="main-navigation"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/90 py-2.5 sm:py-3'
            : 'bg-[#FDFBF7] border-b border-slate-200 py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[3.25rem] sm:min-h-[3.75rem] gap-4 lg:gap-8">
            {/* Logo / Brand */}
            <a href="#" className="group flex items-center gap-3 shrink-0" id="brand-logo-link">
              {/* Emblem Picture */}
              <div 
                id="brand-emblem-container"
                className="h-10 sm:h-12 md:h-14 w-auto max-w-[180px] sm:max-w-[220px] flex items-center justify-start shrink-0"
                title="IPB Convention Hotel"
              >
                <img
                  id="brand-emblem-picture"
                  src={brandLogoImg}
                  alt="IPB Convention Hotel Logo"
                  className="h-full w-auto max-w-full object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-[1.02]"
                  onError={(e) => {
                    e.currentTarget.src = '/images/logo-emblem.svg';
                  }}
                />
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-700 hover:text-[#1E3A2B] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-200 whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden sm:flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Language Switcher Feature (ID <-> EN) */}
              <button
                id="nav-lang-toggle-button"
                type="button"
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer group"
                title={t.navbar.switchLang}
                aria-label="Ganti Bahasa (ID / EN)"
              >
                <Globe className="w-3.5 h-3.5 text-[#C5A880] group-hover:rotate-12 transition-transform" />
                <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-wide">
                  <span className={`px-1 py-0.5 rounded transition-colors ${language === 'id' ? 'bg-[#1E3A2B] text-white font-bold' : 'text-slate-500 hover:text-slate-800'}`}>ID</span>
                  <span className="text-slate-300">/</span>
                  <span className={`px-1 py-0.5 rounded transition-colors ${language === 'en' ? 'bg-[#1E3A2B] text-white font-bold' : 'text-slate-500 hover:text-slate-800'}`}>EN</span>
                </span>
              </button>

              <a
                id="nav-call-button"
                href={`tel:${HOTEL_CONFIG.phones[0].replace(/\D/g, '')}`}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{t.navbar.call}</span>
              </a>
              <a
                id="nav-book-now-button"
                href="#kamar"
                className="px-4.5 sm:px-5 py-2.5 bg-[#1E3A2B] hover:bg-[#13261C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow hover:-translate-y-0.5 border border-[#C5A880]/40 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{t.navbar.bookNow}</span>
              </a>
            </div>

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3A2B]/20"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <div className="flex flex-col space-y-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-[#1E3A2B]"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={toggleLanguage}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center gap-2 border border-slate-200"
              >
                <Globe className="w-4 h-4 text-[#C5A880]" />
                <span>{language === 'id' ? 'Bahasa: Indonesia (Ganti ke English)' : 'Language: English (Switch to ID)'}</span>
              </button>
              <a
                href={`tel:${HOTEL_CONFIG.phones[0].replace(/\D/g, '')}`}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-800 bg-slate-100 rounded-xl flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span>{t.navbar.call} {HOTEL_CONFIG.phones[0]}</span>
              </a>
              <a
                href={`https://wa.me/${HOTEL_CONFIG.whatsappNumber}?text=Halo%20IPB%20Convention%20Hotel,%20saya%20ingin%20reservasi%20kamar`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#1E3A2B] rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#C5A880]" />
                <span>{language === 'id' ? 'Reservasi via WhatsApp' : 'Reservation via WhatsApp'}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
