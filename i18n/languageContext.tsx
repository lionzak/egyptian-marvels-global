// src/i18n/languageContext.tsx
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ru' | 'fr' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const stored = localStorage.getItem('language') as Language | null;
    if (stored && ['en', 'ru', 'fr', 'de'].includes(stored)) {
      setLanguage(stored);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);