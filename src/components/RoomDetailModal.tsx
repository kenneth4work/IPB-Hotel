import React, { useState } from 'react';
import { RoomData, Room } from '../types';
import { getRoomImageUrl } from '../data/hotelData';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  Check, 
  Maximize2, 
  Users, 
  BedDouble, 
  MessageCircle, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Tv,
  Coffee,
  Briefcase,
  Wind,
  Wifi
} from 'lucide-react';

interface RoomDetailModalProps {
  room: RoomData | Room;
  onClose: () => void;
  onBook: (room: RoomData | Room) => void;
  onOpenGallery?: (room: RoomData, initialIndex: number) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ 
  room, 
  onClose, 
  onBook,
  onOpenGallery 
}) => {
  const { language, t } = useLanguage();
  const roomName = ('name' in room && room.name) ? room.name : room.type;
  const roomPriceFormatted = room.priceFormatted || (typeof room.price === 'number' ? `Rp ${room.price.toLocaleString('id-ID')}` : room.price);
  const images = (room.images && room.images.length > 0) ? room.images : [room.image || 'images/rooms/suite-1.jpg'];
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % images.length);
  };

  const renderAmenityIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'tv':
        return <Tv className="w-3.5 h-3.5" />;
      case 'coffee':
        return <Coffee className="w-3.5 h-3.5" />;
      case 'briefcase':
        return <Briefcase className="w-3.5 h-3.5" />;
      case 'wind':
        return <Wind className="w-3.5 h-3.5" />;
      case 'wifi':
        return <Wifi className="w-3.5 h-3.5" />;
      case 'check':
      default:
        return <Check className="w-3.5 h-3.5" />;
    }
  };

  const activeImgUrl = getRoomImageUrl(images[activePhotoIdx]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative max-h-[92vh] flex flex-col animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center shadow-md border border-white/20 transition-transform hover:scale-105"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Image Carousel */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900 shrink-0 group">
          <img
            key={activeImgUrl}
            src={activeImgUrl}
            alt={`${roomName} - Foto ${activePhotoIdx + 1}`}
            onError={(e) => {
              const fallback = getRoomImageUrl(images[activePhotoIdx]);
              if (e.currentTarget.src !== fallback) {
                e.currentTarget.src = fallback;
              }
            }}
            className="w-full h-full object-cover transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

          {/* Prev/Next buttons if multiple images */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Foto sebelumnya"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Foto berikutnya"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Photo indicator chip */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest bg-[#C5A880] text-slate-950 rounded-md">
              Tipe {room.badge}
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between z-10">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {roomName}
              </h3>
              <span className="text-xs text-slate-300">
                {language === 'id' ? `Foto ${activePhotoIdx + 1} dari ${images.length}` : `Photo ${activePhotoIdx + 1} of ${images.length}`}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-300 block uppercase tracking-wider">
                {t.rooms.startingFrom}
              </span>
              <span className="font-serif text-2xl font-bold text-[#EFE4D2]">
                {roomPriceFormatted}
              </span>
              <span className="text-xs text-slate-300"> {t.rooms.perNight}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-[#FDFBF7] rounded-2xl border border-slate-200/80 text-center">
            <div>
              <span className="text-[11px] text-slate-500 uppercase flex items-center justify-center gap-1 mb-1 font-medium">
                <Maximize2 className="w-3 h-3 text-[#A8865B]" /> {t.modal.size}
              </span>
              <span className="text-sm font-bold text-slate-800">{room.size}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase flex items-center justify-center gap-1 mb-1 font-medium">
                <BedDouble className="w-3 h-3 text-[#A8865B]" /> {t.modal.bedType}
              </span>
              <span className="text-sm font-bold text-slate-800">
                {room.bedType || (room.badge === 'SUITE' ? 'King Bed (200x200)' : room.badge === 'EXECUTIVE' ? 'King Bed (180x200)' : room.badge === 'DELUXE' ? 'Queen Bed (160x200)' : 'Double Bed / Twin Bed')}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase flex items-center justify-center gap-1 mb-1 font-medium">
                <Users className="w-3 h-3 text-[#A8865B]" /> {t.modal.capacity}
              </span>
              <span className="text-sm font-bold text-slate-800">
                {language === 'id' 
                  ? (room.capacity || (room.badge === 'SUITE' ? '2 Dewasa + 1 Anak' : room.badge === 'STANDARD' ? '1 - 2 Dewasa' : '2 Dewasa'))
                  : (room.badge === 'SUITE' ? '2 Adults + 1 Child' : room.badge === 'STANDARD' ? '1 - 2 Adults' : '2 Adults')}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              {t.modal.description}
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Facilities & Amenities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              {t.modal.facilities}
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {room.amenities.map((item) => {
                const name = typeof item === 'string' ? item : item.name;
                const icon = typeof item === 'string' ? 'check' : item.icon;
                const translatedName = t.rooms.amenityLabels[name] || name;
                return (
                  <div key={name} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-800 text-xs font-medium border border-slate-100">
                    <div className="w-5 h-5 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B] flex items-center justify-center shrink-0">
                      {renderAmenityIcon(icon)}
                    </div>
                    <span>{translatedName}</span>
                  </div>
                );
              })}
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-800 text-xs font-medium border border-slate-100">
                <div className="w-5 h-5 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>{language === 'id' ? 'Kamar Mandi & Amenities Lengkap' : 'Ensuite Bathroom & Full Amenities'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-800 text-xs font-medium border border-slate-100">
                <div className="w-5 h-5 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>{language === 'id' ? 'Free High-Speed WiFi & Air Mineral' : 'Free High-Speed WiFi & Bottled Water'}</span>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#1E3A2B] shrink-0" />
            <div>
              <strong>{language === 'id' ? 'Jaminan Pemesanan:' : 'Booking Guarantee:'}</strong>{' '}
              {language === 'id'
                ? 'Konfirmasi cepat via WhatsApp Hotel Officer resmi. Check-in mulai 14:00 WIB, check-out maksimal 12:00 WIB.'
                : 'Fast confirmation via official Hotel WhatsApp Officer. Check-in from 14:00, check-out by 12:00.'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onBook(room)}
              className="flex-1 py-3.5 px-5 bg-[#1B3D2F] hover:bg-[#13261C] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 border border-[#C5A880]/30 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{language === 'id' ? `PESAN ${roomName.toUpperCase()} SEKARANG` : `BOOK ${roomName.toUpperCase()} NOW`}</span>
            </button>
            <button
              onClick={onClose}
              className="py-3.5 px-5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              {t.modal.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
