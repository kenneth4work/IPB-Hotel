import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const VISIBLE_FAQ_COUNT = 3;

interface FaqAccordionProps {
  items: { question: string; answer: string }[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const baseId = useId();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        const questionId = `${baseId}-question-${idx}`;
        const answerId = `${baseId}-answer-${idx}`;

        return (
          <div key={item.question} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs">
            <h3>
              <button
                type="button"
                id={questionId}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:px-6 text-left text-sm sm:text-base font-bold text-slate-900 hover:text-[#1E3A2B] transition-colors cursor-pointer"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-[#C5A880] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>

            {/* Animasi buka-tutup memakai transisi tinggi baris grid */}
            <div
              id={answerId}
              role="region"
              aria-labelledby={questionId}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 sm:px-6 pb-5 text-sm text-slate-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const FaqModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useLanguage();
  const titleId = useId();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 240);
  }, [onClose]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleClose]);

  return (
    // z-[60] agar berada di atas tombol WhatsApp melayang (z-50) di Footer
    <div
      data-popup
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`bg-[#FDFBF7] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-h-[85vh] flex flex-col transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-5 bg-white border-b border-slate-100 shrink-0">
          <div>
            <h2 id={titleId} className="text-xl sm:text-2xl text-slate-900 font-bold tracking-tight">
              {t.faq.title}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-1">
              {t.faq.subtitle}
            </p>
          </div>
          <button
            type="button"
            autoFocus
            onClick={handleClose}
            className="w-9 h-9 shrink-0 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label={t.modal.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto overscroll-contain p-4 sm:p-6">
          <FaqAccordion items={t.faq.items} />
        </div>
      </div>
    </div>
  );
};

export const FaqSection: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const seeAllButtonRef = useRef<HTMLButtonElement>(null);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    seeAllButtonRef.current?.focus();
  }, []);

  return (
    <section id="faq" className="py-20 bg-[#FDFBF7] relative scroll-mt-24 border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-4 tracking-tight">
            {t.faq.title}
          </h2>
          <div className="w-16 h-1 bg-[#C5A880] mx-auto mb-4 rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* FAQ Accordion */}
        <FaqAccordion items={t.faq.items.slice(0, VISIBLE_FAQ_COUNT)} />

        {/* Tombol Lihat Semua FAQ */}
        <div className="mt-8 flex justify-center">
          <button
            ref={seeAllButtonRef}
            type="button"
            aria-haspopup="dialog"
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 bg-[#1E3A2B] hover:bg-[#162e22] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            {t.faq.seeAll}
          </button>
        </div>

      </div>

      {isModalOpen && <FaqModal onClose={closeModal} />}
    </section>
  );
};
