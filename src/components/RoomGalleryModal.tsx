import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RoomData } from '../types';
import { getRoomImageUrl } from '../data/hotelData';
import { X, ChevronLeft, ChevronRight, Maximize2, BedDouble, ShieldCheck, MessageCircle } from 'lucide-react';

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
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

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
  const currentImgSrc = getRoomImageUrl(room.images[currentIndex]);
  const displayPrice = room.priceFormatted || (typeof room.price === 'number' ? `Rp ${room.price.toLocaleString('id-ID')}` : room.price);

  const waBookingUrl = `https://wa.me/628111330659?text=${encodeURIComponent(
    `Halo IPB Convention Hotel, saya ingin memesan ${room.name} seharga ${displayPrice}/malam.`
  )}`;

  return (
    <div 
      id="room-gallery-modal"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between text-white select-none animate-fade-in"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div 
        className="w-full px-4 sm:px-8 py-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 text-[11px] font-bold tracking-widest uppercase bg-[#C5A880] text-slate-950 rounded-md">
            {room.badge}
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
            {room.name}
          </h3>
          <span className="hidden sm:inline-block text-xs text-slate-400 font-mono">
            • {displayPrice}/malam
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Book Button */}
          <a
            href={waBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1B3D2F] hover:bg-[#142e23] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors border border-[#C5A880]/30"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Pesan</span>
          </a>

          {/* Close button (X) */}
          <button
            id="close-gallery-modal-btn"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center transition-all hover:scale-105 border border-white/20"
            aria-label="Tutup Galeri"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Photo Viewing Area with Touch Swipe */}
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
            aria-label="Foto sebelumnya"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg active:scale-95"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        )}

        {/* High-Resolution Photo Container */}
        <div className="relative max-w-5xl max-h-[72vh] w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl bg-black/40">
          <img
            key={currentImgSrc}
            src={currentImgSrc}
            alt={`${room.name} - Foto ${currentIndex + 1}`}
            onError={(e) => {
              // Direct fallback
              const fallback = getRoomImageUrl(room.images[currentIndex]);
              if (e.currentTarget.src !== fallback) {
                e.currentTarget.src = fallback;
              }
            }}
            className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl transition-all duration-300"
          />
        </div>

        {/* Desktop Large Slide Arrow Right */}
        {total > 1 && (
          <button
            onClick={handleNext}
            aria-label="Foto berikutnya"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg active:scale-95"
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
            Foto {currentIndex + 1} / {total}
          </span>
          <span className="hidden sm:inline-block text-xs text-slate-400">
            Gunakan tombol panah keyboard atau usap layar untuk navigasi
          </span>
        </div>

        {/* Center: Dot Indicators */}
        <div className="flex items-center gap-2 order-1 sm:order-2">
          {room.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Buka foto ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-7 bg-[#C5A880] shadow-sm shadow-[#C5A880]/50'
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Right: Room size tag ("Ukuran Kamar: 36 sqm") */}
        <div className="flex items-center gap-2 order-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/20 text-xs font-medium text-slate-200">
            <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Ukuran Kamar: {formattedSize}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
