import React, { useState, useEffect } from 'react';
import { RoomData } from '../types';
import { getRoomImageUrl } from '../data/hotelData';
import { Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface RoomCardProps {
  key?: React.Key;
  room: RoomData;
  onOpenGallery?: (room: RoomData, initialIndex: number) => void;
  onOpenDetail?: (room: RoomData) => void;
}

export function RoomCard({ room, onOpenGallery, onOpenDetail }: RoomCardProps) {
  const { t } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const imagesList = room.images && room.images.length > 0 ? room.images : [];

  // Pastikan currentIdx tidak melebihi jumlah slide
  useEffect(() => {
    if (currentIdx >= imagesList.length && imagesList.length > 0) {
      setCurrentIdx(imagesList.length - 1);
    }
  }, [imagesList.length, currentIdx]);

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  const activePhoto = imagesList[currentIdx] || '';
  const currentImgSrc = getRoomImageUrl(activePhoto) || activePhoto;

  const translatedBadge = t.rooms.badges[room.id] || room.badge;
  const translatedDesc = t.rooms.descriptions[room.id] || room.description;

  return (
    <div 
      id={`room-card-${room.id}`}
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow"
    >
      {/* Container Foto Carousel */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden group cursor-pointer bg-slate-900 select-none"
        onClick={() => onOpenGallery?.(room, currentIdx)}
      >
        <img
          src={currentImgSrc}
          alt={`${room.name} ${currentIdx + 1}`}
          onError={(e) => {
            const fallback = getRoomImageUrl(imagesList[currentIdx]);
            if (fallback && e.currentTarget.src !== fallback) {
              e.currentTarget.src = fallback;
            }
          }}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        />

        {/* Badge Kiri Atas */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10 pointer-events-none">
          <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm border border-white/40">
            {translatedBadge}
          </span>
        </div>

        {/* Ukuran Kamar di Kanan Atas */}
        <span 
          className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1 cursor-pointer border border-white/20 shadow-sm hover:bg-black/80 transition-colors"
          onClick={(e) => {
            if (onOpenGallery) {
              e.stopPropagation();
              onOpenGallery(room, currentIdx);
            }
          }}
        >
          {room.size}
        </span>

        {/* Tombol Navigasi Kiri & Kanan (Hanya muncul jika foto > 1) */}
        {imagesList.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label={t.gallery.prevAria}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 cursor-pointer z-10 text-lg shadow"
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label={t.gallery.nextAria}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 cursor-pointer z-10 text-lg shadow"
            >
              &#8250;
            </button>

            {/* Counter Slide Kiri Bawah */}
            <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded border border-white/20 pointer-events-none">
              {currentIdx + 1}/{imagesList.length}
            </span>

            {/* Titik Indikator Tengah Bawah */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {imagesList.map((_: string, idx: number) => (
                <span
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIdx(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIdx ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
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
              href={`https://wa.me/628111330659?text=Halo%20IPB%20Convention%20Hotel,%20saya%20ingin%20memesan%20${encodeURIComponent(room.name)}`}
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
