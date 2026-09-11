import React, { useState } from 'react';
import { HOTEL_CONFIG, generateWhatsAppInquiryUrl } from '../data/hotelData';
import { InquiryFormData } from '../types';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactAndInquiry: React.FC = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'Pemesanan Kamar',
    message: '',
    roomType: 'Suite Room'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [whatsappUrlResult, setWhatsappUrlResult] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage('Mohon lengkapi seluruh formulir sebelum mengirim pesan.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    // Prepare WhatsApp URL fallback
    const waUrl = generateWhatsAppInquiryUrl(HOTEL_CONFIG.whatsappNumber, formData);
    setWhatsappUrlResult(waUrl);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 900);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Pemesanan Kamar',
      message: '',
      roomType: 'Suite Room'
    });
    setIsSuccess(false);
    setWhatsappUrlResult('');
  };

  return (
    <section id="kontak" className="py-20 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A8865B] block mb-3">
            {t.contact.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-4 tracking-tight">
            {t.contact.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mb-5" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 2-Column Split: Left institutional info & Right Inquiry Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Institutional address, phone, email, and social media links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6">
                {language === 'id' ? 'Kantor Reservasi & Layanan' : 'Reservations & Concierge'}
              </h3>

              <div className="space-y-5">
                {/* Institutional Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#1E3A2B] shrink-0 border border-slate-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {language === 'id' ? 'Alamat Lengkap' : 'Full Address'}
                    </span>
                    <p className="text-sm font-medium text-slate-800 leading-snug">
                      {HOTEL_CONFIG.address}
                    </p>
                  </div>
                </div>

                {/* Telepon */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#1E3A2B] shrink-0 border border-slate-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {language === 'id' ? 'Telepon Kantor' : 'Direct Telephone'}
                    </span>
                    <div className="text-sm font-medium text-slate-800 space-y-0.5">
                      {HOTEL_CONFIG.phones.map((p) => (
                        <p key={p}>
                          <a href={`tel:${p.replace(/\D/g, '')}`} className="hover:text-[#1E3A2B] hover:underline">
                            {p}
                          </a>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#1E3A2B] shrink-0 border border-slate-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {language === 'id' ? 'Email Korespondensi' : 'Correspondence Email'}
                    </span>
                    <a 
                      href={`mailto:${HOTEL_CONFIG.email}`}
                      className="text-sm font-medium text-slate-800 hover:text-[#1E3A2B] hover:underline"
                    >
                      {HOTEL_CONFIG.email}
                    </a>
                  </div>
                </div>

                {/* Social Media (Instagram) */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#1E3A2B] shrink-0 border border-slate-200">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {language === 'id' ? 'Media Sosial' : 'Social Media'}
                    </span>
                    <a 
                      href={`https://instagram.com/${HOTEL_CONFIG.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[#1E3A2B] hover:underline"
                    >
                      {HOTEL_CONFIG.instagram} (Instagram)
                    </a>
                  </div>
                </div>

                {/* Operational Hours */}
                <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#A8865B] shrink-0 border border-amber-200">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {language === 'id' ? 'Jam Layanan Front Desk' : 'Front Desk Hours'}
                    </span>
                    <p className="text-sm font-medium text-slate-800">
                      {language === 'id' ? '24 Jam Setiap Hari' : '24 Hours Daily'}
                    </p>
                    <span className="text-xs text-slate-500">
                      Check-in {HOTEL_CONFIG.checkIn} · Check-out {HOTEL_CONFIG.checkOut}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Instant WhatsApp Box */}
            <div className="p-5 rounded-2xl bg-[#1E3A2B] text-white flex items-center justify-between gap-4 border border-[#C5A880]/30 shadow-md">
              <div>
                <span className="text-xs font-semibold text-[#EFE4D2] uppercase tracking-wider block mb-1">
                  Respon Cepat
                </span>
                <p className="text-sm font-medium text-slate-200">
                  Konsultasi langsung via WhatsApp Hotel Officer
                </p>
              </div>
              <a
                href={`https://wa.me/${HOTEL_CONFIG.whatsappNumber}?text=Halo%20IPB%20Convention%20Hotel,%20saya%20ingin%20bertanya`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat WA</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#E2E8F0] shadow-sm">
              <div className="border-b border-slate-100 pb-5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#A8865B] block mb-1">
                  {language === 'id' ? 'FORMULIR PERTANYAAN RESMI' : 'OFFICIAL INQUIRY FORM'}
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  {t.contact.formTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'id'
                    ? 'Kirimkan detail kebutuhan Anda dan kami akan menghubungi Anda sesegera mungkin.'
                    : 'Submit your requirements and our reservation team will follow up promptly.'}
                </p>
              </div>

              {/* Success Notification State */}
              {isSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-slate-900">
                    {language === 'id' ? 'Pesan Anda Telah Diterima!' : 'Your Message Has Been Received!'}
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    {language === 'id' ? (
                      <>
                        Terima kasih <strong>{formData.name}</strong>. Tim reservasi kami akan segera meninjau permohonan <strong>{formData.subject}</strong> Anda.
                      </>
                    ) : (
                      <>
                        Thank you, <strong>{formData.name}</strong>. Our guest services team is reviewing your <strong>{formData.subject}</strong> request.
                      </>
                    )}
                  </p>
                  
                  {/* WhatsApp Submission Fallback Button */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      id="wa-fallback-button"
                      href={whatsappUrlResult}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 bg-[#1E3A2B] hover:bg-[#13261C] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm flex items-center justify-center gap-2 border border-[#C5A880]/40"
                    >
                      <MessageSquare className="w-4 h-4 text-[#25D366]" />
                      <span>{language === 'id' ? 'KIRIM SEBAGAI CHAT WHATSAPP' : 'FORWARD VIA WHATSAPP'}</span>
                    </a>
                    <button
                      onClick={resetForm}
                      className="w-full sm:w-auto px-6 py-3 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      {language === 'id' ? 'Kirim Pesan Lain' : 'Send Another Message'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Nama Lengkap */}
                  <div>
                    <label htmlFor="field-nama" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {t.contact.formName} *
                    </label>
                    <input
                      type="text"
                      id="field-nama"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={language === 'id' ? 'Masukkan nama lengkap Anda' : 'Enter your full name'}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3A2B] focus:ring-1 focus:ring-[#1E3A2B] outline-none text-sm text-slate-800 transition-all bg-slate-50/50 hover:bg-white"
                    />
                  </div>

                  {/* Grid Email & Telepon */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="field-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        {t.contact.formEmail} *
                      </label>
                      <input
                        type="email"
                        id="field-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="contoh@email.com"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3A2B] focus:ring-1 focus:ring-[#1E3A2B] outline-none text-sm text-slate-800 transition-all bg-slate-50/50 hover:bg-white"
                      />
                    </div>

                    {/* No. Telepon */}
                    <div>
                      <label htmlFor="field-telepon" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        {t.contact.formPhone} *
                      </label>
                      <input
                        type="tel"
                        id="field-telepon"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="0812xxxxxxx"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3A2B] focus:ring-1 focus:ring-[#1E3A2B] outline-none text-sm text-slate-800 transition-all bg-slate-50/50 hover:bg-white"
                      />
                    </div>
                  </div>

                  {/* Keperluan (Dropdown Select with specified options) */}
                  <div>
                    <label htmlFor="field-keperluan" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {t.contact.formSubject} *
                    </label>
                    <select
                      id="field-keperluan"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3A2B] focus:ring-1 focus:ring-[#1E3A2B] outline-none text-sm text-slate-800 transition-all bg-slate-50/50 hover:bg-white cursor-pointer"
                    >
                      <option value="Pemesanan Kamar">{language === 'id' ? 'Pemesanan Kamar' : 'Room Reservation'}</option>
                      <option value="Meeting Room">{language === 'id' ? 'Ruang Pertemuan (Meeting Room)' : 'Meeting Room'}</option>
                      <option value="Event / Convention">{language === 'id' ? 'Acara / Konvensi (Event / Convention)' : 'Event / Convention'}</option>
                      <option value="Informasi Umum">{language === 'id' ? 'Informasi Umum' : 'General Inquiry'}</option>
                    </select>
                  </div>

                  {/* If Pemesanan Kamar, select room type */}
                  {(formData.subject.includes('Kamar') || formData.subject.includes('Room')) && (
                    <div>
                      <label htmlFor="field-tipe-kamar" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        {t.contact.formRoomType}
                      </label>
                      <select
                        id="field-tipe-kamar"
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3A2B] focus:ring-1 focus:ring-[#1E3A2B] outline-none text-sm text-slate-800 transition-all bg-slate-50/50 hover:bg-white cursor-pointer"
                      >
                        {HOTEL_CONFIG.rooms.map((r) => {
                          const displayPrice = typeof r.price === 'number' ? `Rp ${r.price.toLocaleString('id-ID')}` : r.price;
                          return (
                            <option key={r.type} value={r.type}>
                              {r.type} ({r.badge}) - {displayPrice} {language === 'id' ? '/ malam' : '/ night'}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}

                  {/* Pesan */}
                  <div>
                    <label htmlFor="field-pesan" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {t.contact.formMessage} *
                    </label>
                    <textarea
                      id="field-pesan"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={language === 'id' ? 'Tulis pesan Anda di sini...' : 'Write your message or specific requirements here...'}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3A2B] focus:ring-1 focus:ring-[#1E3A2B] outline-none text-sm text-slate-800 transition-all bg-slate-50/50 hover:bg-white resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      id="submit-inquiry-button"
                      disabled={isLoading}
                      className="w-full py-4 px-6 bg-[#1E3A2B] hover:bg-[#13261C] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 border border-[#C5A880]/30 disabled:opacity-75 disabled:cursor-not-allowed hover:-translate-y-0.5"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#C5A880]" />
                          <span>{language === 'id' ? 'MENGIRIM PESAN...' : 'SENDING MESSAGE...'}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#C5A880]" />
                          <span>{t.contact.formSubmit}</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-center text-[11px] text-slate-400 mt-3">
                      {language === 'id'
                        ? 'Data Anda terlindungi dan hanya digunakan untuk keperluan reservasi IPB Convention Hotel.'
                        : 'Your data is confidential and strictly used for official IPB Convention Hotel reservations.'}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
