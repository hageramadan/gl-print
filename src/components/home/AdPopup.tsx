'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { FaArrowRight, FaXmark } from 'react-icons/fa6';
import { PiSealPercentFill } from 'react-icons/pi';
import { getAd, type Ad, type AdButton } from '@/src/services/adApi';
import styles from './AdPopup.module.css';

const actionRoutes: Record<string, string> = {
  request_quote: '/quote',
  view_services: '/services',
};

export function AdPopup({ language }: { language: 'en' | 'ar' }) {
  const [ad, setAd] = useState<Ad | null>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const controller = new AbortController();
    const loadAd = async () => {
      try {
        const data = await getAd(language, controller.signal);
        if (!controller.signal.aborted) setAd(data);
      } catch (error) {
        if (!controller.signal.aborted) console.error('Failed to fetch ad:', error);
      }
    };

    // Wait for the initial page load; client-side visits are already loaded.
    if (document.readyState === 'complete') void loadAd();
    else window.addEventListener('load', loadAd, { once: true });

    return () => {
      controller.abort();
      window.removeEventListener('load', loadAd);
    };
  }, [language]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!ad || !dialog) return;

    let previousOverflow: string | undefined;
    const timer = window.setTimeout(() => {
      previousOverflow = document.body.style.overflow;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }, 1200);

    const restoreScroll = () => {
      if (previousOverflow !== undefined) {
        document.body.style.overflow = previousOverflow;
        previousOverflow = undefined;
      }
    };
    dialog.addEventListener('close', restoreScroll);
    return () => {
      window.clearTimeout(timer);
      dialog.removeEventListener('close', restoreScroll);
      dialog.close();
      restoreScroll();
    };
  }, [ad]);

  if (!ad) return null;

  const renderButton = (button: AdButton | null, primary: boolean) => {
    if (!button?.text || !Object.hasOwn(actionRoutes, button.action_type)) return null;

    return (
      <Link
        href={actionRoutes[button.action_type]}
        prefetch={false}
        onClick={() => dialogRef.current?.close()}
        className={`flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
          primary
            ? 'bg-secondary shadow-lg shadow-red-200/70 hover:bg-secondary-dark'
            : 'bg-primary hover:bg-primary-dark'
        }`}
      >
        <span>{button.text}</span>
        <FaArrowRight aria-hidden="true" className="shrink-0 rtl:rotate-180" />
      </Link>
    );
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      lang={language}
      className={`${styles.popup} fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-[480px] overflow-y-auto rounded-2xl border-0 bg-white p-6 text-center text-[#191c24] shadow-2xl backdrop:bg-black/55 sm:p-7`}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
          event.currentTarget.close();
        }
      }}
    >
      <button
        type="button"
        aria-label={language === 'ar' ? 'إغلاق الإعلان' : 'Close ad'}
        onClick={() => dialogRef.current?.close()}
        className="absolute start-3 top-3 flex size-9 cursor-pointer items-center justify-center rounded-lg text-primary transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-primary"
      >
        <FaXmark aria-hidden="true" className="size-4" />
      </button>

      <div className="mb-6 flex justify-center pt-1">
        {ad.image && !imageFailed ? (
          // CMS ads may use image hosts outside the site's optimized image allowlist.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={ad.image} alt="" onError={() => setImageFailed(true)} className="max-h-48 max-w-full rounded-lg object-contain" />
        ) : (
          <PiSealPercentFill aria-hidden="true" className="size-16 text-[#34C759]" />
        )}
      </div>

      <h2 id={titleId} className="mb-4 text-2xl font-extrabold leading-tight">{ad.title}</h2>
      <p id={descriptionId} className="mb-7 whitespace-pre-line text-sm leading-7 text-[#667085]">{ad.description}</p>
      <div className="flex flex-col gap-3 min-[380px]:flex-row">
        {renderButton(ad.primary_button, true)}
        {renderButton(ad.secondary_button, false)}
      </div>
    </dialog>
  );
}
