import type { Metadata } from 'next';
import type { HomeData } from '@/src/services/homeApi';

function absoluteUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

function getSiteUrl(data?: HomeData) {
  return absoluteUrl(process.env.NEXT_PUBLIC_SITE_URL) || absoluteUrl(data?.seo?.canonical_url);
}

export function getHomeMetadata(data?: HomeData): Metadata {
  const seo = data?.seo;
  const title = seo?.meta_title || 'GL Print - Printing Excellence';
  const description = seo?.meta_description || 'We bring your ideas to life with high-quality printing, packaging, branding and advertising solutions in Egypt.';
  const url = getSiteUrl(data);
  const image = absoluteUrl(data?.hero_section.slides_images[0]?.url);
  const images = image ? [{ url: image, alt: seo?.image_alt || 'GL Print printing solutions' }] : undefined;

  return {
    title,
    description,
    keywords: seo?.focus_words,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title, description, url, siteName: 'GL Print', type: 'website',
      locale: /[\u0600-\u06ff]/.test(title) ? 'ar_EG' : 'en_US',
      images,
    },
    twitter: { card: image ? 'summary_large_image' : 'summary', title, description, images },
    robots: { index: true, follow: true },
  };
}

export function getHomeStructuredData(data: HomeData) {
  const url = getSiteUrl(data);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': url ? `${url}#organization` : undefined,
        name: 'GL Print',
        url,
        logo: url ? new URL('/logo1.png', url).href : undefined,
        telephone: data.footer?.phone || undefined,
        email: data.footer?.email || undefined,
        sameAs: Object.values(data.footer?.social_links || {}).map(absoluteUrl).filter(Boolean),
      },
      {
        '@type': 'WebSite',
        name: 'GL Print',
        url,
        publisher: url ? { '@id': `${url}#organization` } : undefined,
      },
    ],
  };
}
