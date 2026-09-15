'use client';

import { useState } from 'react';
import { useLanguage } from '@/src/hooks/useLanguage';
import { MdLockOutline } from 'react-icons/md';
import { submitQuickInquiry } from '@/src/services/quotesApi';
import toast from 'react-hot-toast';
import { SuccessPopup } from './SuccessPopup';

// ✅ الحقول المطلوبة
const REQUIRED_FIELDS = ['name', 'email', 'message'] as const;

// ✅ رسائل الأخطاء (مفاتيح + ترجمات)
const ERROR_MESSAGES: Record<string, { ar: string; en: string }> = {
  name_required: {
    ar: 'الاسم مطلوب',
    en: 'Name is required',
  },
  email_required: {
    ar: 'البريد الإلكتروني مطلوب',
    en: 'Email is required',
  },
  email_invalid: {
    ar: 'البريد الإلكتروني غير صحيح',
    en: 'Email is invalid',
  },
  message_required: {
    ar: 'الرسالة مطلوبة',
    en: 'Message is required',
  },
  message_min_length: {
    ar: 'الرسالة قصيرة جداً (10 أحرف على الأقل)',
    en: 'Message is too short (minimum 10 characters)',
  },
};

// ✅ مكوّن رسالة الخطأ - معرّف خارج المكوّن
interface ErrorMessageProps {
  errorKey?: string;
  language: string;
}

const ErrorMessage = ({ errorKey, language }: ErrorMessageProps) => {
  if (!errorKey) return null;

  const message =
    ERROR_MESSAGES[errorKey]?.[language === 'ar' ? 'ar' : 'en'];
  if (!message) return null;

  return (
    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
      <span className="w-1 h-1 rounded-full bg-red-500"></span>
      {message}
    </p>
  );
};

export const QuickInquiryForm = () => {
  const { t, dir, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // ✅ حالة Popup النجاح
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // ✅ حالات التحقق
  const [errorKeys, setErrorKeys] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isArabic = language === 'ar';

  // ✅ الحصول على رسالة الخطأ المترجمة
  const getErrorMessage = (key: string): string => {
    return ERROR_MESSAGES[key]?.[isArabic ? 'ar' : 'en'] || '';
  };

  // ✅ التحقق من صحة البريد الإلكتروني
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ✅ التحقق من حقل واحد - يُعيد مفتاح الخطأ
  const validateField = (name: string, value: string): string => {
    // الحقول المطلوبة الفارغة
    if (REQUIRED_FIELDS.includes(name as any) && !value.trim()) {
      return `${name}_required`;
    }

    // تحقق خاص للبريد الإلكتروني
    if (name === 'email' && value.trim() && !isValidEmail(value)) {
      return 'email_invalid';
    }

    // تحقق خاص للرسالة (الحد الأدنى 10 أحرف)
    if (name === 'message' && value.trim() && value.trim().length < 10) {
      return 'message_min_length';
    }

    return '';
  };

  // ✅ التحقق من جميع الحقول
  const validateAll = (): { isValid: boolean; errorFields: string[] } => {
    const newErrorKeys: Record<string, string> = {};

    Object.entries(formData).forEach(([key, value]) => {
      const errorKey = validateField(key, String(value));
      if (errorKey) newErrorKeys[key] = errorKey;
    });

    setErrorKeys(newErrorKeys);
    setTouched(
      Object.keys(formData).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );

    return {
      isValid: Object.keys(newErrorKeys).length === 0,
      errorFields: Object.keys(newErrorKeys),
    };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // ✅ مسح الخطأ عند التعديل
    if (errorKeys[name]) {
      setErrorKeys((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // ✅ إعادة التحقق فقط بعد اللمس
    if (touched[name]) {
      const errorKey = validateField(name, value);
      if (errorKey) {
        setErrorKeys((prev) => ({ ...prev, [name]: errorKey }));
      } else {
        setErrorKeys((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  // ✅ عند مغادرة الحقل
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const errorKey = validateField(name, value);

    if (errorKey) {
      setErrorKeys((prev) => ({ ...prev, [name]: errorKey }));
    } else {
      setErrorKeys((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ التحقق من جميع الحقول قبل الإرسال
    const { isValid, errorFields } = validateAll();

    if (!isValid) {
      const fieldNames = errorFields
        .map((f) =>
          f === 'name'
            ? t.quote?.contactName || 'Contact Name'
            : f === 'email'
            ? t.quote?.emailAddress || 'Email'
            : t.quote?.yourMessage || 'Message'
        )
        .join('، ');

      toast.error(
        isArabic
          ? `يرجى تصحيح: ${fieldNames}`
          : `Please fix: ${fieldNames}`,
        { duration: 4000, id: 'quick-inquiry-errors' }
      );

      // ✅ التمرير لأول حقل به خطأ
      const firstErrorField = errorFields[0];
      if (firstErrorField) {
        const element = document.querySelector(
          `[name="${firstErrorField}"]`
        ) as HTMLElement;
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element?.focus();
      }
      return;
    }

    try {
      setSubmitting(true);
      const response = await submitQuickInquiry(formData, language);

      if (response.result) {
        // ✅ إظهار Popup النجاح
        setShowSuccessPopup(true);
        setFormData({ name: '', email: '', message: '' });
        setErrorKeys({});
        setTouched({});
      }
    } catch (error: any) {
      console.error('Failed to submit inquiry:', error);
      toast.error(error.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ كلاسات الحقول
  const baseInputClass =
    'w-full px-4 py-3 rounded-xl border bg-[#F9FAFB] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all';

  const getInputClass = (name: string) => {
    const hasError = !!errorKeys[name];

    if (hasError) {
      return `${baseInputClass} border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-red-500/10`;
    }

    return `${baseInputClass} border-[#E1E3E4] focus:border-primary focus:ring-primary/10`;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
        dir={dir}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
          {/* Contact Name */}
          <div>
            <label className="block text-sm font-medium text-[#171A21] mb-2">
              {t.quote?.contactName || 'Contact Name'}{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Ahmed Ali"
              className={getInputClass('name')}
            />
            <ErrorMessage errorKey={errorKeys.name} language={language} />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#171A21] mb-2">
              {t.quote?.emailAddress || 'Email Address'}{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="company@example.com"
              className={getInputClass('email')}
            />
            <ErrorMessage errorKey={errorKeys.email} language={language} />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-[#171A21] mb-2">
            {t.quote?.yourMessage || 'Your Message'}{' '}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={6}
            placeholder={
              t.quote?.messagePlaceholder ||
              "Tell us about your project, requirements, or any details you'd like us to know."
            }
            className={`${getInputClass('message')} resize-none`}
          />
          <ErrorMessage errorKey={errorKeys.message} language={language} />
        </div>

        <div className="container mx-auto w-full text-center">
          <button
            type="submit"
            disabled={submitting}
            className="w-full min-w-40.25 lg:w-44 cursor-pointer bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {submitting
              ? t.quote?.sending || 'Sending...'
              : t.quote?.submit || 'Get a Quote'}
          </button>
        </div>

        <div className="flex items-center justify-center gap-1 text-[#45464F] text-xs font-medium">
          <MdLockOutline />
          <p className="text-xs">
            {t.quote?.secureNote ||
              'Your information is secure and will only be used to process your quote.'}
          </p>
        </div>
      </form>

      {/* ✅ Popup النجاح */}
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        language={language}
      />
    </>
  );
};