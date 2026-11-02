import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Language, translations, TranslationDictionary } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isSwitchingLang: boolean;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'ipb_hotel_language_preference';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'id' || saved === 'en') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'id';
  });
  const [isSwitchingLang, setIsSwitchingLang] = useState(false);
  const switchTimerRef = useRef<number | null>(null);
  const endTimerRef = useRef<number | null>(null);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;

    if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);
    if (endTimerRef.current) window.clearTimeout(endTimerRef.current);

    setIsSwitchingLang(true);

    switchTimerRef.current = window.setTimeout(() => {
      setLanguageState(lang);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // ignore
      }
    }, 150);

    endTimerRef.current = window.setTimeout(() => {
      setIsSwitchingLang(false);
    }, 460);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  useEffect(() => {
    return () => {
      if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);
      if (endTimerRef.current) window.clearTimeout(endTimerRef.current);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    if (language === 'en') {
      document.title = 'IPB Convention Hotel - In the Heart of Bogor City';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', 'Official website of IPB Convention Hotel Bogor - In the Heart of Bogor. Premier accommodation and convention center at Botani Square.');
    } else {
      document.title = 'IPB Convention Hotel - Di Jantung Kota Bogor';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', 'Website resmi IPB Convention Hotel Bogor - Di Jantung Kota Bogor. Pilihan akomodasi dan convention bergengsi di kawasan Botani Square.');
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isSwitchingLang,
        t: translations[language]
      }}
    >
      {/* Soft Light Veil Animation when switching language */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-40 transition-opacity duration-300 ease-out ${
          isSwitchingLang ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 15%, rgba(255, 252, 245, 0.55) 0%, rgba(197, 168, 128, 0.14) 45%, rgba(253, 251, 247, 0.35) 100%)',
          backdropFilter: isSwitchingLang ? 'blur(2px)' : 'blur(0px)',
        }}
      />
      <div
        className={`transition-opacity duration-300 ease-out ${
          isSwitchingLang ? 'opacity-85' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
