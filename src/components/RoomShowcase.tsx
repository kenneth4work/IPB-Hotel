import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROOMS_DATA } from '../data/hotelData';
import { RoomData } from '../types';
import { RoomCard } from './RoomCard';
import { RoomGalleryModal } from './RoomGalleryModal';
import { RoomDetailModal } from './RoomDetailModal';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';

export const RoomShowcase: React.FC = () => {
  const [galleryRoom, setGalleryRoom] = useState<RoomData | null>(null);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [detailRoom, setDetailRoom] = useState<RoomData | null>(null);
  const { t } = useLanguage();
  const { setSelectedRoomId } = useBooking();
  const navigate = useNavigate();

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
            setSelectedRoomId(room.id);
            setGalleryRoom(null);
            navigate('/reservasi');
          }}
        />
      )}

      {/* Room Detail Modal */}
      {detailRoom && (
        <RoomDetailModal
          room={detailRoom}
          onClose={() => setDetailRoom(null)}
          onBook={(room) => {
            if ('id' in room && room.id) {
              setSelectedRoomId(room.id);
            }
            setDetailRoom(null);
            navigate('/reservasi');
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
