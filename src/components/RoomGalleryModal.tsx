import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RoomData } from '../types';
import { getRoomImageUrl } from '../data/hotelData';
import { X, ChevronLeft, ChevronRight, Maximize2, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModalFocus } from '../hooks/useModalFocus';

interface RoomGalleryModalProps {
  room: RoomData;
  initialIndex?: number;
  onClose: () => void;
  onBookNow?: (room: RoomData) => void;
}

export const RoomGalleryModal: React.FC<RoomGalleryModalProps> = ({
  room,
  initialIndex = 0,
  onClose,
  onBookNow
}) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const total = room.images.length;
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const dialogRef = useModalFocus<HTMLDivElement>(onClose);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diffX = touchStartXRef.current - touchEndXRef.current;
      const minSwipeDistance = 45;
      if (diffX > minSwipeDistance) {
        handleNext();
      } else if (diffX < -minSwipeDistance) {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Convert "36 M²" -> "36 sqm" for display
  const formattedSize = room.size.replace('M²', 'sqm').trim();
  const displayPrice = room.priceFormatted || (typeof room.price === 'number' ? `Rp ${room.price.toLocaleString('id-ID')}` : room.price);
  const translatedBadge = t.rooms.badges[room.id] || room.badge;

  return (
    <div 
      ref={dialogRef}
      id="room-gallery-modal"
      data-popup
      role="dialog"
      aria-modal="true"
      aria-label={room.name}
      tabIndex={-1}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between text-white select-none animate-fade-in"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div 
        className="w-full px-4 sm:px-8 py-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 text-[11px] font-bold bg-[#C5A880] text-slate-950 rounded-md">
            {translatedBadge}
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
            {room.name}
          </h3>
          <span className="hidden sm:inline-block text-xs text-slate-400 font-mono">
            • {displayPrice}{t.rooms.perNight}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Book Button -> Halaman Reservasi */}
          <button
            type="button"
            onClick={() => onBookNow?.(room)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1B3D2F] hover:bg-[#142e23] text-white text-xs font-semibold rounded-lg transition-colors border border-[#C5A880]/30 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{t.modal.quickBook}</span>
          </button>

          {/* Close button (X) */}
          <button
            id="close-gallery-modal-btn"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center transition-all hover:scale-105 border border-white/20"
            aria-label={t.modal.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Photo Viewing Area with Soft Slide Animation & Touch Swipe */}
      <div 
        className="relative flex-1 flex items-center justify-center px-4 sm:px-12 my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Desktop Large Slide Arrow Left */}
        {total > 1 && (
          <button
            onClick={handlePrev}
            aria-label={t.gallery.prevAria}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        )}

        {/* High-Resolution Photo Container with Horizontal Soft Slide Track */}
        <div className="relative max-w-5xl max-h-[72vh] w-full overflow-hidden rounded-2xl shadow-2xl bg-black/40">
          <div
            className="flex w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform items-center"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {room.images.map((imgUrl, idx) => {
              const resolvedUrl = getRoomImageUrl(imgUrl);
              return (
                <div key={idx} className="w-full shrink-0 flex items-center justify-center">
                  <img
                    src={resolvedUrl}
                    alt={`${room.name} - ${t.modal.photoCounterText} ${idx + 1} ${t.modal.ofText} ${total}`}
                    className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Large Slide Arrow Right */}
        {total > 1 && (
          <button
            onClick={handleNext}
            aria-label={t.gallery.nextAria}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        )}
      </div>

      {/* Bottom Bar: Photo index, room size tag, dot indicators */}
      <div 
        className="w-full px-4 sm:px-8 py-5 z-20 bg-gradient-to-t from-black/90 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Photo index (X / Total) */}
        <div className="flex items-center gap-3 order-2 sm:order-1">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs font-semibold text-white/90 border border-white/15">
            {t.modal.photoCounterText} {currentIndex + 1} / {total}
          </span>
          <span className="hidden sm:inline-block text-xs text-slate-400">
            {t.modal.keyboardHint}
          </span>
        </div>

        {/* Center: Dot Indicators */}
        <div className="flex items-center order-1 sm:order-2">
          {room.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`${t.modal.photoCounterText} ${idx + 1}`}
              aria-current={idx === currentIndex}
              className="h-6 min-w-6 px-1 flex items-center justify-center cursor-pointer group/dot"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-7 bg-[#C5A880] shadow-sm shadow-[#C5A880]/50'
                    : 'w-2 bg-white/30 group-hover/dot:bg-white/60'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Right: Room size tag ("Ukuran Kamar: 36 sqm") */}
        <div className="flex items-center gap-2 order-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/20 text-xs font-medium text-slate-200">
            <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{t.modal.roomSizeLabel} {formattedSize}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
