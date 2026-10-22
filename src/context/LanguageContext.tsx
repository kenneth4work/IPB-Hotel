import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, TranslationDictionary } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
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

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  useEffect(() => {
    document.documentElement.lang = language;
    if (language === 'en') {
      document.title = 'IPB Convention Hotel - In the Heart of Bogor City';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', 'Official website of IPB Convention Hotel Bogor - In the Heart of Bogor, Close to Everything. Premier accommodation and convention center at Botani Square.');
    } else {
      document.title = 'IPB Convention Hotel - Di Jantung Kota Bogor';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', 'Website resmi IPB Convention Hotel Bogor - Di Jantung Kota Bogor, Dekat Segalanya. Pilihan akomodasi dan convention bergengsi di kawasan Botani Square.');
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translations[language]
      }}
    >
      {children}
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
