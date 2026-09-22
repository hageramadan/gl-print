'use client';

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';

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

  // ✅ دالة تحديث Meta Tag
  const updateMetaTag = useCallback(
    (
      name: string,
      content: string | undefined,
      attr: 'name' | 'property' = 'name'
    ) => {
      if (!content) return;

      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    },
    []
  );

  // ✅ دالة تحديث Canonical
  const updateCanonical = useCallback((url: string) => {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }, []);

  // ✅ دالة تحديث Metadata الكاملة
  const updateMetadata = useCallback(
    async (lang: Language) => {
      try {
        const response = await fetch('https://glprint-eg.com/api/home', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Accept-Language': lang,
            lang: lang,
          },
          cache: 'no-store',
        });

        if (!response.ok) return;

        const data = await response.json();
        const seo = data.data?.seo;

        if (!seo) return;

        // ✅ تحديث Title
        if (seo.meta_title) {
          document.title = seo.meta_title;
        }

        // ✅ تحديث Meta Description
        updateMetaTag('description', seo.meta_description);

        // ✅ تحديث Meta Keywords
        if (seo.focus_words?.length > 0) {
          updateMetaTag('keywords', seo.focus_words.join(', '));
        }

        // ✅ تحديث OpenGraph
        updateMetaTag('og:title', seo.meta_title, 'property');
        updateMetaTag('og:description', seo.meta_description, 'property');

        // ✅ تحديث Twitter
        updateMetaTag('twitter:title', seo.meta_title, 'name');
        updateMetaTag('twitter:description', seo.meta_description, 'name');

        // ✅ تحديث Canonical
        if (seo.canonical_url) {
          updateCanonical(seo.canonical_url);
        }
      } catch (error) {
        console.error('Failed to update metadata:', error);
      }
    },
    [updateMetaTag, updateCanonical]
  );

  // ✅ تحميل اللغة من localStorage
  useEffect(() => {
    const stored = localStorage.getItem('language') as Language;
    if (stored && (stored === 'en' || stored === 'ar')) {
      setLanguage(stored);
    } else {
      localStorage.setItem('language', 'en');
    }
  }, []);

  // ✅ تحديث اللغة والاتجاه والخط
  useEffect(() => {
    const newDir = language === 'ar' ? 'rtl' : 'ltr';
    setDir(newDir);
    document.documentElement.dir = newDir;
    document.documentElement.lang = language;
    localStorage.setItem('language', language);

    if (language === 'ar') {
      document.documentElement.classList.add('lang-ar');
      document.documentElement.classList.remove('lang-en');
      document.body.style.fontFamily = 'var(--font-almarai), sans-serif';
    } else {
      document.documentElement.classList.add('lang-en');
      document.documentElement.classList.remove('lang-ar');
      document.body.style.fontFamily = 'var(--font-montserrat), sans-serif';
    }

    // ✅ تحديث Metadata
    updateMetadata(language);
  }, [language, updateMetadata]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};