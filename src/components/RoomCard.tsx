import React, { useState, useEffect, useRef } from 'react';
import { RoomData } from '../types';
import { getRoomImageUrl } from '../data/hotelData';
import { Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface RoomCardProps {
  key?: React.Key;
  room: RoomData;
  onOpenGallery?: (room: RoomData, initialIndex: number) => void;
  onOpenDetail?: (room: RoomData) => void;
}

export function RoomCard({ room, onOpenGallery, onOpenDetail }: RoomCardProps) {
  const { language, t } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const imagesList = room.images && room.images.length > 0 ? room.images : [];
  
  // Touch swipe refs
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Pastikan currentIdx tidak melebihi jumlah slide
  useEffect(() => {
    if (currentIdx >= imagesList.length && imagesList.length > 0) {
      setCurrentIdx(imagesList.length - 1);
    }
  }, [imagesList.length, currentIdx]);

  // Preload images in this room carousel
  useEffect(() => {
    if (imagesList.length > 1) {
      imagesList.forEach((imgUrl) => {
        const direct = getRoomImageUrl(imgUrl);
        if (direct) {
          const preImg = new Image();
          preImg.src = direct;
        }
      });
    }
  }, [imagesList]);

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imagesList.length <= 1) return;
    setCurrentIdx((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imagesList.length <= 1) return;
    setCurrentIdx((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diffX = touchStartXRef.current - touchEndXRef.current;
      const minSwipeDistance = 35;
      if (diffX > minSwipeDistance) {
        // Swipe left -> next
        if (imagesList.length > 1) {
          e.stopPropagation();
          setCurrentIdx((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
        }
      } else if (diffX < -minSwipeDistance) {
        // Swipe right -> prev
        if (imagesList.length > 1) {
          e.stopPropagation();
          setCurrentIdx((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
        }
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const rawDesc = t.rooms.descriptions[room.id] || room.description;
  const translatedDesc = rawDesc.includes(room.size)
    ? rawDesc
    : language === 'en'
      ? `Spacious ${room.size} room. ${rawDesc}`
      : `Kamar seluas ${room.size}. ${rawDesc}`;

  return (
    <div 
      id={`room-card-${room.id}`}
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow group/card"
    >
      {/* Container Foto Carousel dengan Soft Slide Animation */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden group cursor-pointer bg-slate-900 select-none"
        onClick={() => onOpenGallery?.(room, currentIdx)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
          style={{ transform: `translateX(-${currentIdx * 100}%)` }}
        >
          {imagesList.map((imgUrl, idx) => {
            const imgSrc = getRoomImageUrl(imgUrl) || imgUrl;
            return (
              <div key={idx} className="w-full h-full shrink-0 overflow-hidden">
                <img
                  src={imgSrc}
                  alt={language === 'en' ? `${room.name} - Photo ${idx + 1}` : `${room.name} - Foto ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            );
          })}
        </div>

        {/* Tombol Navigasi Panah Kiri & Kanan (Muncul jika foto > 1) */}
        {imagesList.length > 1 && (
          <>
            {/* Tombol Panah Kiri */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label={t.gallery.prevAria}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-85 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 shadow-lg z-20 cursor-pointer border border-white/25 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Tombol Panah Kanan */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label={t.gallery.nextAria}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-85 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 shadow-lg z-20 cursor-pointer border border-white/25 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Counter Slide Kiri Bawah */}
            <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border border-white/20 pointer-events-none z-10">
              {currentIdx + 1}/{imagesList.length}
            </span>

            {/* Titik Indikator Dots di Bawah Tengah */}
            <div 
              className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {imagesList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={language === 'en' ? `Photo slide ${idx + 1}` : `Slide foto ke-${idx + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIdx(idx);
                  }}
                  className={`transition-all duration-300 rounded-full cursor-pointer h-1.5 ${
                    idx === currentIdx 
                      ? "w-4 bg-[#C5A880] shadow-sm" 
                      : "w-1.5 bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Jika hanya 1 foto, tampilkan badge 1 Foto */}
        {imagesList.length === 1 && (
          <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-md border border-white/20 pointer-events-none z-10">
            {language === 'en' ? '1 Photo' : '1 Foto'}
          </span>
        )}
      </div>

      {/* Detail Konten Kamar */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 
            className="font-serif text-xl font-bold text-slate-900 cursor-pointer hover:text-[#1B3D2F] transition-colors"
            onClick={() => onOpenDetail?.(room)}
          >
            {room.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{translatedDesc}</p>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {room.amenities.map((item: any, i: number) => {
              const rawName = typeof item === 'string' ? item : item.name;
              const label = t.rooms.amenityLabels[rawName] || rawName;
              return (
                <span key={i} className="text-[11px] bg-slate-50 border border-slate-200/60 rounded px-2 py-1 text-slate-600 truncate">
                  ✓ {label}
                </span>
              );
            })}
          </div>
        </div>

        {onOpenDetail && (
          <div className="mt-5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onOpenDetail(room)}
              className="w-full py-2.5 px-4 border border-slate-200 text-slate-700 hover:text-[#1B3D2F] hover:border-[#1B3D2F]/30 hover:bg-slate-50 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-colors cursor-pointer"
              title={t.rooms.viewDetails}
              aria-label={`${t.rooms.viewDetails} ${room.name}`}
            >
              <Info className="w-4 h-4 text-[#C5A880]" />
              <span>{t.rooms.viewDetails}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomCard;
