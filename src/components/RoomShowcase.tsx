import React, { useState } from 'react';
import { HOTEL_CONFIG, ROOMS_DATA } from '../data/hotelData';
import { RoomData } from '../types';
import { RoomCard } from './RoomCard';
import { RoomGalleryModal } from './RoomGalleryModal';
import { RoomDetailModal } from './RoomDetailModal';
import { Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const RoomShowcase: React.FC = () => {
  const [galleryRoom, setGalleryRoom] = useState<RoomData | null>(null);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [detailRoom, setDetailRoom] = useState<RoomData | null>(null);
  const { language, t } = useLanguage();

  const handleOpenGallery = (room: RoomData, initialIndex: number) => {
    setGalleryRoom(room);
    setGalleryInitialIndex(initialIndex);
  };

  const handleOpenDetail = (room: RoomData) => {
    setDetailRoom(room);
  };

  return (
    <section id="kamar" className="py-20 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A8865B] block mb-3">
            {language === 'id' ? 'AKOMODASI & PILIHAN KAMAR' : 'ACCOMMODATIONS & ROOM TYPES'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-4 tracking-tight">
            {t.rooms.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mb-5" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.rooms.subtitle}
          </p>
        </div>

        {/* 4-Column Luxury Room Grid with Multi-Photo Carousel Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {ROOMS_DATA.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onOpenGallery={handleOpenGallery}
              onOpenDetail={handleOpenDetail}
            />
          ))}
        </div>

        {/* Bottom Information Callout */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
              <Info className="w-5 h-5 text-[#A8865B]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">
                {language === 'id' ? 'Informasi Tambahan Reservasi' : 'Additional Reservation Information'}
              </h4>
              <p className="text-xs text-slate-500">
                {language === 'id'
                  ? 'Tarif kamar sudah termasuk sarapan (sesuai paket), akses WiFi, dan pajak pemerintah. Waktu check-in 14:00 WIB & check-out 12:00 WIB.'
                  : 'Room rates include breakfast (as per package), high-speed Wi-Fi, and government taxes. Check-in from 14:00 & check-out by 12:00.'}
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${HOTEL_CONFIG.whatsappNumber}?text=Halo%20IPB%20Convention%20Hotel,%20saya%20ingin%20konsultasi%20pemesanan%20kamar%20rombongan/meeting`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#1E3A2B] hover:text-[#13261C] hover:underline whitespace-nowrap"
          >
            {language === 'id' ? 'Pemesanan Grup / Meeting Room →' : 'Group Booking / Meeting Hall Inquiry →'}
          </a>
        </div>
      </div>

      {/* Fullscreen Gallery Lightbox Modal */}
      {galleryRoom && (
        <RoomGalleryModal
          room={galleryRoom}
          initialIndex={galleryInitialIndex}
          onClose={() => setGalleryRoom(null)}
          onBookNow={(room) => {
            const waText = `Halo IPB Convention Hotel, saya ingin memesan ${room.name} seharga ${room.priceFormatted}/malam.`;
            window.open(`https://wa.me/628111330659?text=${encodeURIComponent(waText)}`, '_blank');
          }}
        />
      )}

      {/* Room Detail Modal */}
      {detailRoom && (
        <RoomDetailModal
          room={detailRoom}
          onClose={() => setDetailRoom(null)}
          onBook={(room) => {
            const roomName = ('name' in room && room.name) ? room.name : room.type;
            const priceStr = room.priceFormatted || (typeof room.price === 'number' ? `Rp ${room.price.toLocaleString('id-ID')}` : room.price);
            const waText = `Halo IPB Convention Hotel, saya ingin memesan ${roomName} seharga ${priceStr}/malam.`;
            window.open(`https://wa.me/628111330659?text=${encodeURIComponent(waText)}`, '_blank');
          }}
          onOpenGallery={(room, idx) => {
            setDetailRoom(null);
            setGalleryRoom(room);
            setGalleryInitialIndex(idx);
          }}
        />
      )}
    </section>
  );
};
