import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Kunci yang sama dibaca skrip kecil di <head> agar halaman tidak berkedip saat dimuat.
export const THEME_STORAGE_KEY = 'ipb_hotel_theme_preference';

// Selalu mulai dari mode terang; mode gelap hanya jika pengunjung pernah memilihnya sendiri.
const readSavedTheme = (): Theme => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

const applyThemeClass = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(readSavedTheme);

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next: Theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Penyimpanan diblokir: tema tetap berganti untuk sesi ini
    }

    const update = () => {
      applyThemeClass(next);
      flushSync(() => setTheme(next));
    };

    if (prefersReducedMotion()) {
      update();
      return;
    }

    // Peralihan lembut: crossfade seluruh halaman bila browser mendukung View Transitions,
    // selain itu transisi warna singkat lewat class "theme-fading" (lihat index.css).
    const doc = document as ViewTransitionDocument;
    if (doc.startViewTransition) {
      doc.startViewTransition(update);
      return;
    }
    const root = document.documentElement;
    root.classList.add('theme-fading');
    update();
    window.setTimeout(() => root.classList.remove('theme-fading'), 500);
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
