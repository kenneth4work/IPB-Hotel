import React from 'react';
import { Link } from 'react-router-dom';
import { useConsent } from '../context/ConsentContext';
import { useLanguage } from '../context/LanguageContext';
import { LEGAL_ROUTES, LEGAL_UI } from '../data/legalContent';

export const CookieConsent: React.FC = () => {
  const { language } = useLanguage();
  const { isBannerOpen, setChoice } = useConsent();
  const ui = LEGAL_UI[language];

  if (!isBannerOpen) return null;

  return (
    <section
      id="cookie-consent"
      aria-label={ui.bannerTitle}
      className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md z-[55] bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 sm:p-5 text-xs sm:text-sm text-slate-700"
    >
      <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-1 sm:mb-1.5">{ui.bannerTitle}</h2>
      <p className="leading-relaxed">
        {ui.bannerText}{' '}
        <Link to={LEGAL_ROUTES.cookies} className="font-semibold text-[#1E3A2B] underline">
          {ui.cookies}
        </Link>
      </p>
      <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={() => setChoice('rejected')}
          className="py-2 sm:py-2.5 px-3 rounded-lg sm:rounded-xl border border-[#1E3A2B] text-[#1E3A2B] bg-white hover:bg-slate-50 text-xs font-bold cursor-pointer transition-colors"
        >
          {ui.reject}
        </button>
        <button
          type="button"
          onClick={() => setChoice('accepted')}
          className="py-2 sm:py-2.5 px-3 rounded-lg sm:rounded-xl border border-[#1E3A2B] bg-[#1E3A2B] hover:bg-[#13261C] text-white text-xs font-bold cursor-pointer transition-colors"
        >
          {ui.accept}
        </button>
      </div>
    </section>
  );
};
