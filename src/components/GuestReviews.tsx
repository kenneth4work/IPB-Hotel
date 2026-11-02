import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Award, Star } from 'lucide-react';
import { REVIEWS } from '../data/hotelData';
import { useLanguage } from '../context/LanguageContext';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-1" role="img" aria-label={`${rating.toFixed(1)} / 5`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-3.5 h-3.5 ${
          star <= Math.floor(rating) ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-slate-300'
        }`}
      />
    ))}
  </div>
);

export const GuestReviews: React.FC = () => {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const prevSlide = () => setActiveIdx((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  const nextSlide = () => setActiveIdx((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const minSwipeDistance = 35;
    if (diffX > minSwipeDistance) nextSlide();
    else if (diffX < -minSwipeDistance) prevSlide();
    touchStartXRef.current = null;
  };

  return (
    <section id="ulasan" className="py-20 bg-white border-t border-slate-100 relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-4 tracking-tight">
            {t.reviews.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mb-5" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Testimonial Slider: semua kartu ditumpuk di satu sel grid, posisi diatur lewat transform */}
        <div
          className="relative grid grid-cols-1 w-[82%] sm:w-[26rem] lg:w-[28rem] mx-auto touch-pan-y select-none"
          aria-live="polite"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {REVIEWS.map((rev, idx) => {
            // Jarak kartu dari kartu aktif secara melingkar: 0 = tengah, -1/1 = samping, sisanya tersembunyi
            const half = Math.floor(REVIEWS.length / 2);
            const offset = ((idx - activeIdx + REVIEWS.length + half) % REVIEWS.length) - half;
            const positionClass =
              offset === 0
                ? 'opacity-100 z-10 shadow-md'
                : Math.abs(offset) === 1
                  ? 'opacity-60 shadow-sm'
                  : 'opacity-0 pointer-events-none';

            const initials = rev.author
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase();

            const reviewTrans = t.reviews.items[rev.id];
            const displayQuote = reviewTrans?.quote || rev.quote;
            const displayDatePlatform = reviewTrans?.datePlatform || rev.datePlatform;

            return (
              <article
                key={rev.id}
                id={rev.id}
                aria-hidden={offset !== 0}
                style={{ transform: `translateX(${offset * 100}%) scale(${offset === 0 ? 1 : 0.9})` }}
                className={`[grid-area:1/1] min-w-0 flex flex-col rounded-3xl p-6 sm:p-7 bg-[#FDFBF7] border border-[#E2E8F0] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none ${positionClass}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center font-serif font-bold text-sm border ${rev.avatarBg}`}>
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm truncate">{rev.author}</h4>
                    <span className="text-xs text-slate-500 block truncate">{displayDatePlatform}</span>
                  </div>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">"{displayQuote}"</p>
                <div className="mt-auto pt-4">
                  <StarRating rating={rev.rating} />
                </div>
              </article>
            );
          })}

          {/* Tombol Panah Kiri */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label={t.reviews.prevAria}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#FDFBF7] text-slate-700 hover:text-[#C5A880] border border-slate-200 flex items-center justify-center transition-colors shadow-lg z-20 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Tombol Panah Kanan */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label={t.reviews.nextAria}
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#FDFBF7] text-slate-700 hover:text-[#C5A880] border border-slate-200 flex items-center justify-center transition-colors shadow-lg z-20 cursor-pointer"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Aggregate Ratings Footnote */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-slate-500 pt-6 border-t border-slate-100 text-center">
          <Award className="w-4 h-4 shrink-0 text-[#C5A880]" />
          <span>{t.reviews.scoreText}</span>
        </div>

      </div>
    </section>
  );
};
