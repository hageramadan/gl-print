'use client';

import { useState } from 'react';
import { useLanguage } from '@/src/hooks/useLanguage';
import { MdLockOutline } from 'react-icons/md';
import { submitQuickInquiry } from '@/src/services/quotesApi';
import toast from 'react-hot-toast';

export const QuickInquiryForm = () => {
  const { t, dir, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const response = await submitQuickInquiry(formData, language);

      if (response.result) {
        toast.success(response.message || 'Inquiry submitted successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error: any) {
      console.error('Failed to submit inquiry:', error);
      toast.error(error.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir={dir}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
        <div>
          <label className="block text-sm font-medium text-[#171A21] mb-2">
            {t.quote?.contactName || 'Contact Name'}{' '}
            <span className="text-secondary">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g. Ahmed Ali"
            className="w-full px-4 py-3 rounded-xl border border-[#E1E3E4] bg-[#F9FAFB] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#171A21] mb-2">
            {t.quote?.emailAddress || 'Email Address'}{' '}
            <span className="text-secondary">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="company@example.com"
            required
            className="w-full px-4 py-3 rounded-xl border border-[#E6E8ED] bg-[#F9FAFB] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#171A21] mb-2">
          {t.quote?.yourMessage || 'Your Message'}{' '}
          <span className="text-secondary">*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          placeholder={
            t.quote?.messagePlaceholder ||
            "Tell us about your project, requirements, or any details you'd like us to know."
          }
          required
          className="w-full px-4 py-3 rounded-xl border border-[#E6E8ED] bg-[#F9FAFB] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
        />
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
  );
};