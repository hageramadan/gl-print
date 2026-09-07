'use client';

import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  dir: 'ltr' | 'rtl';
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    const stored = localStorage.getItem('language') as Language;
    if (stored && (stored === 'en' || stored === 'ar')) {
      setLanguage(stored);
    } else {
      localStorage.setItem('language', 'en');
    }
  }, []);

  useEffect(() => {
    const newDir = language === 'ar' ? 'rtl' : 'ltr';
    setDir(newDir);
    
    // تغيير اتجاه الصفحة
    document.documentElement.dir = newDir;
    
    // تغيير لغة الـ html
    document.documentElement.lang = language;
    
    localStorage.setItem('language', language);
    
    // تغيير الكلاسات للتحكم في الخط
    if (language === 'ar') {
      document.documentElement.classList.add('lang-ar');
      document.documentElement.classList.remove('lang-en');
      document.body.style.fontFamily = 'var(--font-almarai), sans-serif';
    } else {
      document.documentElement.classList.add('lang-en');
      document.documentElement.classList.remove('lang-ar');
      document.body.style.fontFamily = 'var(--font-montserrat), sans-serif';
    }


  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const newLang = prev === 'en' ? 'ar' : 'en';
      
      return newLang;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};