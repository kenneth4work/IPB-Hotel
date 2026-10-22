import React, { useState, useEffect, useRef } from 'react';
import { RoomData } from '../types';
import { getRoomImageUrl, IMGBB_DIRECT_MAP } from '../data/hotelData';
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

  const activePhoto = imagesList[currentIdx] || '';
  const currentImgSrc = getRoomImageUrl(activePhoto) || activePhoto;

  const translatedBadge = t.rooms.badges[room.id] || room.badge;
  const translatedDesc = t.rooms.descriptions[room.id] || room.description;

  return (
    <div 
      id={`room-card-${room.id}`}
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow group/card"
    >
      {/* Container Foto Carousel */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden group cursor-pointer bg-slate-900 select-none"
        onClick={() => onOpenGallery?.(room, currentIdx)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          key={currentImgSrc}
          src={currentImgSrc}
          alt={language === 'en' ? `${room.name} - Photo ${currentIdx + 1}` : `${room.name} - Foto ${currentIdx + 1}`}
          loading="lazy"
          onError={(e) => {
            const fallback = IMGBB_DIRECT_MAP[activePhoto] || getRoomImageUrl(imagesList[currentIdx]);
            if (fallback && e.currentTarget.src !== fallback) {
              e.currentTarget.src = fallback;
            }
          }}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        />

        {/* Badge Kategori Kiri Atas */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10 pointer-events-none">
          <span className="bg-white/95 backdrop-blur-sm text-slate-900 text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm border border-white/40">
            {translatedBadge}
          </span>
        </div>

        {/* Ukuran Kamar di Kanan Atas */}
        <span 
          className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1 cursor-pointer border border-white/20 shadow-sm hover:bg-black/80 transition-colors z-10"
          onClick={(e) => {
            if (onOpenGallery) {
              e.stopPropagation();
              onOpenGallery(room, currentIdx);
            }
          }}
        >
          {room.size}
        </span>

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
                  className={`transition-all rounded-full cursor-pointer h-1.5 ${
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

      {/* Detail Konten & Tombol Pesan */}
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

        <div className="mt-5 pt-4 border-t border-slate-100">
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">{t.rooms.startingFrom}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-slate-900">
              {room.priceFormatted || (typeof room.price === 'number' ? `Rp ${room.price.toLocaleString('id-ID')}` : room.price)}
            </span>
            <span className="text-xs text-slate-500">
              {t.rooms.perNight}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            {onOpenDetail && (
              <button
                type="button"
                onClick={() => onOpenDetail(room)}
                className="p-2.5 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                title={t.rooms.viewDetails}
                aria-label={`${t.rooms.viewDetails} ${room.name}`}
              >
                <Info className="w-4 h-4" />
              </button>
            )}
            <a
              id={`btn-book-${room.id}`}
              href={`https://wa.me/628111330659?text=${encodeURIComponent(
                language === 'en'
                  ? `Hello IPB Convention Hotel, I would like to book the ${room.name}`
                  : `Halo IPB Convention Hotel, saya ingin memesan ${room.name}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#1B3D2F] hover:bg-[#142e23] text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              {t.rooms.bookViaWa}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
