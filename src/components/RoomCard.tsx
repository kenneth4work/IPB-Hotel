import React, { useState, useRef, useEffect } from 'react';
import { RoomData } from '../types';
import { getRoomImageUrl } from '../data/hotelData';
import { 
  optimizeImageFile, 
  saveRoomImages, 
  getPersistedRoomImages, 
  resetRoomImages,
  pruneRoomSlides
} from '../utils/imageStorage';
import { Info, Camera, Plus, Check, RotateCcw, Trash2 } from 'lucide-react';

export interface RoomCardProps {
  key?: React.Key;
  room: RoomData | any;
  onOpenGallery?: (room: RoomData, initialIndex: number) => void;
  onOpenDetail?: (room: RoomData) => void;
}

export function RoomCard({ room, onOpenGallery, onOpenDetail }: RoomCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hasSavedCustom, setHasSavedCustom] = useState(false);

  const [imagesList, setImagesList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`ipb_hotel_room_images_${room.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const pruned = pruneRoomSlides(room.id, parsed);
          if (pruned.length !== parsed.length) {
            try {
              localStorage.setItem(`ipb_hotel_room_images_${room.id}`, JSON.stringify(pruned));
            } catch {}
          }
          return pruned;
        }
      }
    } catch {
      // ignore
    }
    return room.images && room.images.length > 0 ? room.images : [];
  });

  // Pastikan currentIdx tidak melebihi jumlah slide
  useEffect(() => {
    if (currentIdx >= imagesList.length && imagesList.length > 0) {
      setCurrentIdx(imagesList.length - 1);
    }
  }, [imagesList.length, currentIdx]);

  // Sync dengan IndexedDB saat mount untuk memastikan gambar besar tidak hilang
  useEffect(() => {
    let isMounted = true;
    getPersistedRoomImages(room.id).then((saved) => {
      if (isMounted && saved && saved.length > 0) {
        const pruned = pruneRoomSlides(room.id, saved);
        if (pruned.length !== saved.length || pruned[0] !== saved[0]) {
          saveRoomImages(room.id, pruned);
        }
        setImagesList(pruned);
        setHasSavedCustom(true);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [room.id]);

  useEffect(() => {
    // Deteksi jika ada gambar yang diubah/ditambahkan
    try {
      const saved = localStorage.getItem(`ipb_hotel_room_images_${room.id}`);
      if (saved) setHasSavedCustom(true);
    } catch {
      // ignore
    }
  }, [imagesList, room.id]);

  const replaceInputRef = useRef<HTMLInputElement>(null);
  const addInputRef = useRef<HTMLInputElement>(null);

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  // Handler: Ganti foto pada slide aktif saat ini & simpan permanen
  const handleReplacePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const optimizedUrl = await optimizeImageFile(file);
      setImagesList((prev) => {
        const updated = [...prev];
        updated[currentIdx] = optimizedUrl;
        saveRoomImages(room.id, updated);
        return updated;
      });
      setHasSavedCustom(true);
    } catch {
      const fallbackUrl = URL.createObjectURL(file);
      setImagesList((prev) => {
        const updated = [...prev];
        updated[currentIdx] = fallbackUrl;
        saveRoomImages(room.id, updated);
        return updated;
      });
      setHasSavedCustom(true);
    }

    e.target.value = '';
  };

  // Handler: Tambah foto baru ke carousel kamar & simpan permanen
  const handleAddPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const optimizedUrl = await optimizeImageFile(file);
      setImagesList((prev) => {
        const updated = [...prev, optimizedUrl];
        setCurrentIdx(updated.length - 1);
        saveRoomImages(room.id, updated);
        return updated;
      });
      setHasSavedCustom(true);
    } catch {
      const fallbackUrl = URL.createObjectURL(file);
      setImagesList((prev) => {
        const updated = [...prev, fallbackUrl];
        setCurrentIdx(updated.length - 1);
        saveRoomImages(room.id, updated);
        return updated;
      });
      setHasSavedCustom(true);
    }

    e.target.value = '';
  };

  // Handler: Hapus slide foto aktif saat ini
  const handleDeleteCurrentSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imagesList.length <= 1) {
      alert('Kamar harus memiliki minimal 1 foto.');
      return;
    }
    if (window.confirm(`Hapus foto slide ${currentIdx + 1} dari ${imagesList.length}?`)) {
      const updated = imagesList.filter((_, idx) => idx !== currentIdx);
      setImagesList(updated);
      saveRoomImages(room.id, updated);
      setHasSavedCustom(true);
      if (currentIdx >= updated.length) {
        setCurrentIdx(Math.max(0, updated.length - 1));
      }
    }
  };

  // Reset kembali ke foto bawaan
  const handleResetToDefault = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Kembalikan foto ${room.name} ke foto bawaan katalog?`)) {
      resetRoomImages(room.id);
      setImagesList(room.images || []);
      setCurrentIdx(0);
      setHasSavedCustom(false);
    }
  };

  const activePhoto = imagesList[currentIdx] || '';
  const currentImgSrc = activePhoto.startsWith('blob:') || activePhoto.startsWith('data:')
    ? activePhoto
    : (getRoomImageUrl(activePhoto) || activePhoto);

  const activeRoomData: RoomData = {
    ...room,
    images: imagesList,
  };

  return (
    <div 
      id={`room-card-${room.id}`}
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow"
    >
      {/* Container Foto Carousel */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden group cursor-pointer bg-slate-900 select-none"
        onClick={() => onOpenGallery?.(activeRoomData, currentIdx)}
      >
        <img
          src={currentImgSrc}
          alt={`${room.name} foto ${currentIdx + 1}`}
          onError={(e) => {
            const fallback = getRoomImageUrl(imagesList[currentIdx]);
            if (fallback && e.currentTarget.src !== fallback) {
              e.currentTarget.src = fallback;
            }
          }}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Badge Kiri & Kanan Atas */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10 pointer-events-none">
          <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm border border-white/40">
            {room.badge}
          </span>
          {hasSavedCustom && (
            <span className="bg-emerald-950/75 backdrop-blur-md text-emerald-200 text-[10px] font-medium px-2 py-1 rounded-md flex items-center gap-1 border border-emerald-400/30 shadow-sm">
              <Check className="w-2.5 h-2.5 text-emerald-300" /> Tersimpan
            </span>
          )}
        </div>
        <span 
          className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1 cursor-pointer border border-white/20 shadow-sm hover:bg-black/80 transition-colors"
          onClick={(e) => {
            if (onOpenGallery) {
              e.stopPropagation();
              onOpenGallery(activeRoomData, currentIdx);
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
              aria-label="Foto sebelumnya"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 cursor-pointer z-10 text-lg shadow"
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Foto berikutnya"
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

        {/* Floating Action Controls di Pojok Kanan Bawah: Ganti Foto & Tambah Foto */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {/* Tombol Ganti Foto Ini */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              replaceInputRef.current?.click();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium text-white bg-black/65 hover:bg-black/90 backdrop-blur-md rounded-md border border-white/25 transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap"
            title="Ganti foto slide ini menggunakan file dari laptop"
          >
            <Camera className="w-3 h-3 text-[#C5A880]" />
            <span>Ganti Foto Ini</span>
          </button>

          {/* Tombol + Tambah Foto */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addInputRef.current?.click();
            }}
            className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-white bg-black/65 hover:bg-black/90 backdrop-blur-md rounded-md border border-white/25 transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap"
            title="Tambah foto baru ke carousel kamar ini"
          >
            <Plus className="w-3 h-3 text-[#C5A880]" />
            <span>+ Tambah Foto</span>
          </button>

          {/* Tombol Hapus Slide Ini */}
          {imagesList.length > 1 && (
            <button
              type="button"
              onClick={handleDeleteCurrentSlide}
              className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-white/90 bg-red-950/70 hover:bg-red-900/90 backdrop-blur-md rounded-md border border-red-400/30 transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap"
              title="Hapus foto slide ini"
            >
              <Trash2 className="w-3 h-3 text-red-300" />
              <span>Hapus Slide</span>
            </button>
          )}

          {/* Tombol Reset jika ada foto kustom tersimpan */}
          {hasSavedCustom && (
            <button
              type="button"
              onClick={handleResetToDefault}
              className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-red-100 bg-red-950/70 hover:bg-red-900/90 backdrop-blur-md rounded-md border border-red-500/30 transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap"
              title="Reset kembali ke foto katalog awal"
            >
              <RotateCcw className="w-3 h-3 text-red-300" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Hidden File Inputs untuk Pengunggahan Lokal */}
        <input
          ref={replaceInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleReplacePhoto}
        />
        <input
          ref={addInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAddPhoto}
        />
      </div>

      {/* Detail Konten & Tombol Pesan */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 
            className="font-serif text-xl font-bold text-slate-900 cursor-pointer hover:text-[#1B3D2F] transition-colors"
            onClick={() => onOpenDetail?.(activeRoomData)}
          >
            {room.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{room.description}</p>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {room.amenities.map((item: any, i: number) => {
              const label = typeof item === 'string' ? item : item.name;
              return (
                <span key={i} className="text-[11px] bg-slate-50 border border-slate-200/60 rounded px-2 py-1 text-slate-600 truncate">
                  ✓ {label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100">
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">MULAI DARI</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-slate-900">
              {room.priceFormatted || (typeof room.price === 'number' ? `Rp ${room.price.toLocaleString('id-ID')}` : room.price)}
            </span>
            <span className="text-xs text-slate-500">
              {room.priceUnit || '/ malam'}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            {onOpenDetail && (
              <button
                type="button"
                onClick={() => onOpenDetail(activeRoomData)}
                className="p-2.5 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                title="Detail Kamar"
                aria-label={`Detail Kamar ${room.name}`}
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
              PESAN KAMAR INI
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
