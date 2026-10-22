import React, { useState } from 'react';
import { ROOMS_DATA } from '../data/hotelData';
import { RoomData } from '../types';
import { RoomCard } from './RoomCard';
import { RoomGalleryModal } from './RoomGalleryModal';
import { RoomDetailModal } from './RoomDetailModal';
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
    <section id="kamar" className="py-20 bg-[#FDFBF7] relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-4 tracking-tight">
            {t.rooms.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mb-5" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.rooms.subtitle}
          </p>
        </div>

        {/* 6-Room Luxury Showcase Grid with Multi-Photo Carousel Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {ROOMS_DATA.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onOpenGallery={handleOpenGallery}
              onOpenDetail={handleOpenDetail}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Gallery Lightbox Modal */}
      {galleryRoom && (
        <RoomGalleryModal
          room={galleryRoom}
          initialIndex={galleryInitialIndex}
          onClose={() => setGalleryRoom(null)}
          onBookNow={(room) => {
            const waText = language === 'en'
              ? `Hello IPB Convention Hotel, I would like to book the ${room.name} at ${room.priceFormatted}/night.`
              : `Halo IPB Convention Hotel, saya ingin memesan ${room.name} seharga ${room.priceFormatted}/malam.`;
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
            const waText = language === 'en'
              ? `Hello IPB Convention Hotel, I would like to book the ${roomName} at ${priceStr}/night.`
              : `Halo IPB Convention Hotel, saya ingin memesan ${roomName} seharga ${priceStr}/malam.`;
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
