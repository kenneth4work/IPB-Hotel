import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/hotelData';
import { GalleryItem } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
    <section id="galeri" className="py-20 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A8865B] block mb-3">
            {t.gallery.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-4 tracking-tight">
            {t.gallery.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mb-5" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Asymmetric Magazine-Style Bento Grid (5-6 curated slots) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[220px] sm:auto-rows-[240px]">
          {/* Item 1: Large Feature Slot */}
          {(() => {
            const item = getItemData(GALLERY_ITEMS[0]);
            return (
              <div 
                onClick={() => openLightbox(GALLERY_ITEMS[0])}
                className="group relative sm:col-span-2 sm:row-span-2 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-900"
              >
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded bg-[#C5A880]/90 text-slate-950 text-[10px] font-bold uppercase tracking-wider mb-2 backdrop-blur-sm">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Item 2: Ballroom MICE */}
          {(() => {
            const item = getItemData(GALLERY_ITEMS[1]);
            return (
              <div 
                onClick={() => openLightbox(GALLERY_ITEMS[1])}
                className="group relative sm:col-span-1 sm:row-span-1 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-900"
              >
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[10px] font-semibold text-[#EFE4D2] uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })()}

          {/* Item 3: Terrace Dining */}
          {(() => {
            const item = getItemData(GALLERY_ITEMS[2]);
            return (
              <div 
                onClick={() => openLightbox(GALLERY_ITEMS[2])}
                className="group relative sm:col-span-1 sm:row-span-1 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-900"
              >
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[10px] font-semibold text-[#EFE4D2] uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })()}

          {/* Item 4: Room Suite Interior */}
          {(() => {
            const item = getItemData(GALLERY_ITEMS[3]);
            return (
              <div 
                onClick={() => openLightbox(GALLERY_ITEMS[3])}
                className="group relative sm:col-span-1 sm:row-span-1 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-900"
              >
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[10px] font-semibold text-[#EFE4D2] uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })()}

          {/* Item 5: Exterior Botani Square */}
          {(() => {
            const item = getItemData(GALLERY_ITEMS[4]);
            return (
              <div 
                onClick={() => openLightbox(GALLERY_ITEMS[4])}
                className="group relative sm:col-span-1 sm:row-span-1 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-900"
              >
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[10px] font-semibold text-[#EFE4D2] uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })()}

          {/* Item 6: Rooftop */}
          {(() => {
            const item = getItemData(GALLERY_ITEMS[5]);
            return (
              <div 
                onClick={() => openLightbox(GALLERY_ITEMS[5])}
                className="group relative sm:col-span-2 sm:row-span-1 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-900"
              >
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-[#EFE4D2] uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && activeTrans && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Controls */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10"
              aria-label={t.gallery.closeAria}
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors border border-white/20"
              aria-label={t.gallery.prevAria}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigateLightbox('next')}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors border border-white/20"
              aria-label={t.gallery.nextAria}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <img 
              src={activeTrans.image}
              alt={activeTrans.title}
              className="w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
            />
            
            <div className="mt-4 text-center text-white">
              <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-1">
                {activeTrans.category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                {activeTrans.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
