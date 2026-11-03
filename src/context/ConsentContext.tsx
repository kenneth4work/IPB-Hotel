import React, { createContext, useContext, useState } from 'react';

export type ConsentChoice = 'accepted' | 'rejected';

interface ConsentContextType {
  choice: ConsentChoice | null;
  isBannerOpen: boolean;
  setChoice: (choice: ConsentChoice) => void;
  openBanner: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const STORAGE_KEY = 'ipb_hotel_cookie_consent';

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [choice, setChoiceState] = useState<ConsentChoice | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'accepted' || saved === 'rejected') {
        return saved;
      }
    } catch {
      // ignore
    }
    return null;
  });
  const [isReopened, setIsReopened] = useState(false);

  const setChoice = (next: ConsentChoice) => {
    setChoiceState(next);
    setIsReopened(false);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  return (
    <ConsentContext.Provider
      value={{
        choice,
        isBannerOpen: choice === null || isReopened,
        setChoice,
        openBanner: () => setIsReopened(true),
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = (): ConsentContextType => {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
};
