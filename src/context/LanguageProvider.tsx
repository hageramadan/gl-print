'use client';

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { getHomeData, seedHomeData, type HomeData } from '@/src/services/homeApi';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  dir: 'ltr' | 'rtl';
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children, initialHomeData }: { children: ReactNode; initialHomeData?: HomeData }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (initialHomeData) seedHomeData('en', initialHomeData);
    return 'en';
  });
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
        // The home page owns its metadata; other routes keep their own head tags.
        if (window.location.pathname !== '/') return;
        const data = await getHomeData(lang);
        const seo = data.seo;

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
        const canonical = process.env.NEXT_PUBLIC_SITE_URL || seo.canonical_url;
        if (canonical) {
          try {
            const url = new URL(canonical);
            if (['https:', 'http:'].includes(url.protocol)) updateCanonical(url.href);
          } catch {
            // Keep the server canonical if the CMS value is not a valid URL.
          }
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
