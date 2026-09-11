import React from 'react';
import { REVIEWS } from '../data/hotelData';
import { Star, Quote, Award, ThumbsUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const GuestReviews: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="ulasan" className="py-20 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A8865B] block mb-3">
            {t.reviews.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-4 tracking-tight">
            {t.reviews.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mb-5" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* 3-Column Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((rev) => {
            const fullStars = Math.floor(rev.rating);
            const initials = rev.author
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase();

            return (
              <div
                key={rev.id}
                id={rev.id}
                className="flex flex-col justify-between bg-[#FDFBF7] rounded-3xl p-7 sm:p-8 border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all duration-300 relative group hover:-translate-y-1"
              >
                {/* Elegant quotation mark accent */}
                <div className="absolute top-6 right-6 text-[#C5A880]/30 group-hover:text-[#C5A880]/60 transition-colors pointer-events-none">
                  <Quote className="w-10 h-10 transform scale-x-[-1]" />
                </div>

                <div>
                  {/* Gold Star Ratings */}
                  <div className="flex items-center gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= fullStars
                            ? 'text-[#D4AF37] fill-[#D4AF37]'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">
                      {rev.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Quote text */}
                  <p className="font-serif italic text-slate-700 text-sm sm:text-base leading-relaxed mb-8 relative z-10">
                    "{rev.quote}"
                  </p>
                </div>

                {/* Author Info & Initial Avatar Chip */}
                <div className="flex items-center gap-3.5 pt-5 border-t border-[#E2E8F0]/80">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-serif font-bold text-sm border shadow-xs ${rev.avatarBg}`}>
                    {initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">
                      {rev.author}
                    </h4>
                    <span className="text-xs text-slate-500 block">
                      {rev.datePlatform}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Aggregate Ratings Footnote */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 pt-6 border-t border-slate-100 text-center">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#C5A880]" />
            <span>Skor Kepuasan Tamu: <strong>4.8 / 5.0</strong> dari 1.200+ ulasan terverifikasi</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-[#1E3A2B]" />
            <span>Terpilih sebagai salah satu akomodasi bisnis paling direkomendasikan di Bogor</span>
          </div>
        </div>

      </div>
    </section>
  );
};
