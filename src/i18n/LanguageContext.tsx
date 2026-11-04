import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { en, fr, type UiKey } from './ui';
import { contentByLanguage, type Content, type Language } from './content';

const STORAGE_KEY = 'portfolio-language';
const dictionaries: Record<Language, Record<UiKey, string>> = { en, fr };

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: UiKey, values?: Record<string, string | number>) => string;
  content: Content;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const readSavedLanguage = (): Language | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' || saved === 'fr' ? saved : null;
  } catch {
    return null;
  }
};

const detectLanguage = (): Language =>
  readSavedLanguage() ?? (navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en');

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(detectLanguage);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private browsing can block storage; the choice then lasts for this visit only.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = dictionaries[language]['meta.title'];
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => {
    const dictionary = dictionaries[language];
    const t: LanguageContextValue['t'] = (key, values) =>
      Object.entries(values ?? {}).reduce(
        (text, [name, replacement]) => text.split(`{${name}}`).join(String(replacement)),
        dictionary[key],
      );
    return { language, setLanguage, t, content: contentByLanguage[language] };
  }, [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return context;
};
