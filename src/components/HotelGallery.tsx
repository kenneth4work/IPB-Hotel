import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/hotelData';
import { GalleryItem } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModalFocus } from '../hooks/useModalFocus';

interface GalleryLightboxProps {
  title: string;
  category: string;
  image: string;
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ title, category, image, onClose, onNavigate }) => {
  const { t } = useLanguage();
  const dialogRef = useModalFocus<HTMLDivElement>(onClose);

  return (
    <div
      data-popup
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 sm:-top-12 sm:right-0 z-10 text-white p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 transition-colors"
          aria-label={t.gallery.closeAria}
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('prev')}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors border border-white/20"
          aria-label={t.gallery.prevAria}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('next')}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors border border-white/20"
          aria-label={t.gallery.nextAria}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <img
          src={image}
          alt={title}
          className="w-full max-h-[60vh] sm:max-h-[70vh] object-contain rounded-lg sm:rounded-xl shadow-2xl"
        />

        <div className="mt-3 sm:mt-4 text-center text-white bg-black/55 backdrop-blur-md rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 border border-white/15">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-0.5 sm:mb-1">
            {category}
          </span>
          <h3 className="font-serif text-lg sm:text-2xl font-bold">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

// Baris atas mendapat sisa jika jumlah foto ganjil
const galleryRows: GalleryItem[][] = [
  GALLERY_ITEMS.slice(0, Math.ceil(GALLERY_ITEMS.length / 2)),
  GALLERY_ITEMS.slice(Math.ceil(GALLERY_ITEMS.length / 2)),
];

export const HotelGallery: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const { t } = useLanguage();

  const getItemData = (item: GalleryItem) => {
    const itemTrans = t.gallery.items[item.id];
    return {
      title: itemTrans?.title || item.title,
      category: itemTrans?.category || item.category,
      image: item.image,
      id: item.id
    };
  };

  const openLightbox = (item: GalleryItem) => {
    setActiveItem(item);
  };

  const closeLightbox = () => {
    setActiveItem(null);
  };

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (!activeItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex((i) => i.id === activeItem.id);
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
      setActiveItem(GALLERY_ITEMS[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
      setActiveItem(GALLERY_ITEMS[prevIndex]);
    }
  };

  const activeTrans = activeItem ? getItemData(activeItem) : null;

  return (
    <section id="galeri" className="py-14 sm:py-20 bg-white border-t border-slate-100 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-4 tracking-tight">
            {t.gallery.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto" />
        </div>

        {/* Dua baris berjalan: atas bergerak ke kanan, bawah ke kiri. Berhenti saat disentuh/hover. */}
        <div className="space-y-3 sm:space-y-6">
          {galleryRows.map((row, rowIdx) => (
            <div key={rowIdx} className="gallery-marquee overflow-hidden rounded-xl sm:rounded-2xl">
              <div className={`gallery-marquee-track flex w-max ${rowIdx === 0 ? 'gallery-marquee-right' : 'gallery-marquee-left'}`}>
                {/* Isi baris diulang dua kali agar putaran tidak terlihat sambungannya */}
                {[0, 1].map((copy) => row.map((rawItem) => {
            const item = getItemData(rawItem);
            return (
              <button
                type="button"
                key={`${copy}-${rawItem.id}`}
                onClick={() => openLightbox(rawItem)}
                tabIndex={copy === 1 ? -1 : undefined}
                aria-hidden={copy === 1 || undefined}
                className="group relative block shrink-0 mr-3 sm:mr-6 w-[60vw] sm:w-[42vw] lg:w-[17.875rem] text-left h-40 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 bg-slate-900 border border-slate-100"
              >
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <span className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </button>
            );
                }))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && activeTrans && (
        <GalleryLightbox
          title={activeTrans.title}
          category={activeTrans.category}
          image={activeTrans.image}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </section>
  );
};
