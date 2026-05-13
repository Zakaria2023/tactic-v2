'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { translations, Language } from '@/lib/i18n/translations';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = (typeof window !== 'undefined' ? localStorage.getItem('takteeq_lang') : null) as Language | null;
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLangState(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-ar', lang === 'ar');
    document.body.classList.toggle('lang-en', lang === 'en');
    localStorage.setItem('takteeq_lang', lang);
  }, [lang, mounted]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const t = useCallback(
    (key: string): string => {
      const value = translations[lang]?.[key];
      if (value !== undefined) return value;
      // Fallback to English
      return translations.en?.[key] ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}

// Convenience component: renders translated text directly
export function T({ k }: { k: string }) {
  const { t } = useLanguage();
  const value = t(k);
  // Render HTML if value contains markup (like <strong>)
  if (value.includes('<')) {
    return <span dangerouslySetInnerHTML={{ __html: value }} />;
  }
  return <>{value}</>;
}
