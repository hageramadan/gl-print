import { useContext } from 'react';
import { LanguageContext } from '@/src/context/LanguageProvider';
import en from '@/src/translations/en.json';
import ar from '@/src/translations/ar.json';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  
  const translations = context.language === 'en' ? en : ar;
  
  return {
    ...context, // language, toggleLanguage, dir
    t: translations, // الترجمة
  };
};