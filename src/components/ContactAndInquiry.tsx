import React from 'react';
import { HOTEL_CONFIG } from '../data/hotelData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  MessageSquare, 
  Clock, 
  ShieldCheck,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactAndInquiry: React.FC = () => {
  const { language, t } = useLanguage();

  const isEn = language === 'en';

  return (
    <section id="kontak" className="py-20 bg-[#FDFBF7] relative scroll-mt-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B] text-xs font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{t.contact.officeTitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-4 tracking-tight">
            {t.contact.title}
          </h2>
          <div className="w-16 h-1 bg-[#C5A880] mx-auto mb-4 rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 3-Column Adjusted Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          
          {/* Card 1: Alamat & Lokasi */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1E3A2B]/10 text-[#1E3A2B] flex items-center justify-center mb-5 group-hover:bg-[#1E3A2B] group-hover:text-white transition-all">
                <MapPin className="w-6 h-6 text-[#1E3A2B] group-hover:text-[#C5A880] transition-colors" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A8865B] block mb-1">
                {t.location.addressLabel}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {isEn ? 'Official Hotel Address' : 'Alamat Resmi Hotel'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium mb-4">
                {HOTEL_CONFIG.address}
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500 font-medium leading-snug">
                {isEn 
                  ? 'Directly connected to Botani Square Mall and IPB International Convention Center (IICC).'
                  : 'Terhubung langsung dengan Mall Botani Square dan IPB International Convention Center (IICC).'}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <a 
                href="#lokasi"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2B] hover:text-[#C5A880] transition-colors"
              >
                <span>{isEn ? 'View Location & Map' : 'Lihat Peta & Petunjuk Arah'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Layanan Telepon, Email & Media Sosial */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1E3A2B]/10 text-[#1E3A2B] flex items-center justify-center mb-5 group-hover:bg-[#1E3A2B] group-hover:text-white transition-all">
                <Phone className="w-6 h-6 text-[#1E3A2B] group-hover:text-[#C5A880] transition-colors" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A8865B] block mb-1">
                {t.contact.contactInfoTitle}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                {isEn ? 'Direct Communications' : 'Saluran Komunikasi'}
              </h3>

              <div className="space-y-3.5 text-xs">
                {/* Phones */}
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px] mb-1">
                    {t.location.phoneLabel}
                  </span>
                  <div className="space-y-1">
                    {HOTEL_CONFIG.phones.map((p) => (
                      <p key={p}>
                        <a 
                          href={`tel:${p.replace(/\D/g, '')}`} 
                          className="font-bold text-sm text-slate-800 hover:text-[#1E3A2B] hover:underline"
                        >
                          {p}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px] mb-1">
                    {t.contact.formEmail}
                  </span>
                  <a 
                    href={`mailto:${HOTEL_CONFIG.email}`} 
                    className="font-bold text-sm text-slate-800 hover:text-[#1E3A2B] hover:underline flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{HOTEL_CONFIG.email}</span>
                  </a>
                </div>

                {/* Instagram */}
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px] mb-1">
                    {t.location.instagramLabel}
                  </span>
                  <a 
                    href={`https://instagram.com/${HOTEL_CONFIG.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-xs text-[#1E3A2B] hover:underline flex items-center gap-1.5"
                  >
                    <Instagram className="w-3.5 h-3.5 text-rose-600" />
                    <span>{HOTEL_CONFIG.instagram}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-medium">
                {isEn ? 'Fast response during official hours' : 'Layanan responsif setiap hari'}
              </span>
            </div>
          </div>

          {/* Card 3: Waktu Operasional & Front Desk */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1E3A2B]/10 text-[#1E3A2B] flex items-center justify-center mb-5 group-hover:bg-[#1E3A2B] group-hover:text-white transition-all">
                <Clock className="w-6 h-6 text-[#1E3A2B] group-hover:text-[#C5A880] transition-colors" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A8865B] block mb-1">
                {t.location.hoursLabel}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {isEn ? '24/7 Front Desk & Stay Hours' : 'Front Desk & Waktu Menginap'}
              </h3>
              
              <div className="space-y-3 mt-4">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100/80">
                  <span className="font-bold text-xs text-emerald-900 block">
                    {t.footer.frontDesk}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
                    {t.footer.concierge}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Check-in</span>
                    <span className="font-bold text-slate-800 text-sm">{HOTEL_CONFIG.checkIn}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Check-out</span>
                    <span className="font-bold text-slate-800 text-sm">{HOTEL_CONFIG.checkOut}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-medium">
                {isEn ? 'Security & Concierge standby 24 hours' : 'Keamanan & Concierge siaga 24 jam'}
              </span>
            </div>
          </div>

        </div>

        {/* Adjusted Bottom Hero Card: Official Direct WhatsApp & Reservation Action */}
        <div className="bg-gradient-to-br from-[#1E3A2B] via-[#162e22] to-[#0F172A] rounded-3xl p-6 sm:p-10 text-white border border-[#C5A880]/30 shadow-xl relative overflow-hidden">
          {/* Subtle Ambient Rings */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full border border-[#C5A880]/10 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                {isEn ? 'Need Instant Assistance or Direct Booking?' : 'Butuh Respon Cepat atau Reservasi Langsung?'}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                {isEn
                  ? 'Connect directly with our 24/7 Hotel Officer via official WhatsApp for prompt room availability, MICE ballroom inquiries, or special requirements.'
                  : 'Hubungi petugas hotel kami via WhatsApp resmi 24 jam untuk konfirmasi ketersediaan kamar, penawaran ballroom MICE, atau konsultasi acara Anda.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                id="contact-whatsapp-chat-button"
                href={`https://wa.me/${HOTEL_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  isEn
                    ? 'Hello IPB Convention Hotel team, I would like to inquire about room reservations / hotel services.'
                    : 'Halo tim IPB Convention Hotel, saya ingin bertanya mengenai reservasi kamar / layanan hotel.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.contact.chatWaButton} WhatsApp</span>
              </a>

              <a
                id="contact-book-room-button"
                href="#reservasi"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/20 backdrop-blur-xs flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#C5A880]" />
                <span>{isEn ? 'Online Reservation Form' : 'Formulir Reservasi Kamar'}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
