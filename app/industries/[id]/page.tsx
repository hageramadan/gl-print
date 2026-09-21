'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PageBanner } from '@/src/components/common/PageBanner';
import { useLanguage } from '@/src/hooks/useLanguage';
import {
  getIndustryDetails,
  IndustryDetails,
} from '@/src/services/industriesApi';
import { getProducts, Product } from '@/src/services/productsApi';
import { FaArrowRight } from 'react-icons/fa6';
import { FiChevronDown } from 'react-icons/fi';
import { LoadingScreen } from '@/src/components/common/LoadingScreen';

export default function IndustryDetailsPage() {
  const params = useParams();
  const industrySlug = params.id as string;

  const industryId = Number(params.id);
  const { language, t, dir } = useLanguage();

  const [industry, setIndustry] = useState<IndustryDetails | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  // ✅ إدارة عرض الفئات
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async (slug: string, lang: string) => {
    try {
      setLoading(true);
      const response = await getIndustryDetails(slug, lang);
      setIndustry(response.data.industry);
      setActiveCategory(null);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch industry details:', err);
      setError('Failed to load industry details.');
    } finally {
      setLoading(false);
    }
  }, []);
 useEffect(() => {
    if (industrySlug) {
      fetchData(industrySlug, language);
    }
  }, [industrySlug, language, fetchData]);
  // ✅ جلب المنتاجات حسب industry و category
  const fetchProducts = useCallback(
    async (id: number, categoryId: number | null, lang: string) => {
      try {
        setProductsLoading(true);
        const response = await getProducts(1, null, lang, id, categoryId);
        setProducts(response.data.products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setProductsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (industrySlug) {
      fetchData(industrySlug, language);
    }
  }, [industrySlug, language, fetchData]);
    useEffect(() => {
    if (industry) {
      fetchProducts(industry.id, null, language);
    }
  }, [industry, language, fetchProducts]);

  // ✅ كل الفئات (مع "الكل")
  const allCategories = industry
    ? [
        { id: null, name: t.industryDetails?.all || 'All' },
        ...industry.categories,
      ]
    : [];

  const visibleCategories = allCategories.slice(0, visibleCount);
  const hiddenCategories = allCategories.slice(visibleCount);
  const hasHiddenCategories = hiddenCategories.length > 0;

  // ✅ قياس ديناميكي لعدد الفئات التي تتناسب مع السطر
  useEffect(() => {
    if (!industry) return;

    const calculateVisibleCount = () => {
      if (!containerRef.current || !measureRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const buttons =
        measureRef.current.querySelectorAll<HTMLElement>('[data-measure]');
      if (buttons.length === 0) return;

      const isMobile = window.innerWidth < 640;
      const gap = isMobile ? 8 : 12;

      const moreButtonWidth = isMobile ? 85 : 100;
      const moreButtonWithGap = moreButtonWidth + gap;

      let totalWidth = 0;
      let count = 0;

      for (let i = 0; i < buttons.length; i++) {
        const btnWidth = buttons[i].offsetWidth + gap;
        const isLast = i === buttons.length - 1;

        if (isLast) {
          if (totalWidth + btnWidth <= containerWidth) {
            count = i + 1;
          }
          break;
        }

        const remaining = buttons.length - (i + 1);
        const needsMoreButton = remaining > 0;

        if (
          totalWidth +
            btnWidth +
            (needsMoreButton ? moreButtonWithGap : 0) <=
          containerWidth
        ) {
          totalWidth += btnWidth;
          count = i + 1;
        } else {
          break;
        }
      }

      setVisibleCount(Math.max(1, count));
    };

    calculateVisibleCount();

    const resizeObserver = new ResizeObserver(calculateVisibleCount);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [industry, language, t]);

  // ✅ إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryChange = (categoryId: number | null) => {
    setActiveCategory(categoryId);
    setIsDropdownOpen(false);
    fetchProducts(industryId, categoryId, language);

    // ✅ تحديث الـ URL
    const url = new URL(window.location.href);
    if (categoryId) {
      url.searchParams.set('category', String(categoryId));
    } else {
      url.searchParams.delete('category');
    }
    window.history.pushState({}, '', url.toString());
  };

 if (loading) {
  return <LoadingScreen isLoading={loading} videoSrc="/videos/loading.mp4" />;
}

  if (error || !industry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Industry Not Found
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <PageBanner
        title={industry.name}
        backgroundImage={industry.image}
        breadcrumbs={[
          { label: t.banner?.home || 'Home', href: '/' },
          {
            label: t.industriesPage?.title || 'Industries',
            href: '/industries',
          },
          { label: industry.name, href: '#' },
        ]}
      />

      {industry.categories && industry.categories.length > 0 && (
        <section className="py-12 md:py-16 lg:py-20" dir={dir}>
          <div className="container mx-auto px-4">
            <div className="mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-0.5 bg-secondary"></div>
                <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
                  {t.industriesPage?.tag || 'Industries We Serve'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#171A21] max-w-xl">
                {t.industriesPage?.subtitle || 'Serving Diverse Industries'}
              </h2>
            </div>

            {/* ===== الفئات: نفس التصميم للموبايل والديسكتوب ===== */}
            <div
              ref={containerRef}
              className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 relative"
            >
              {/* ✅ عناصر قياس مخفية - معزولة تماماً */}
              <div
                ref={measureRef}
                className="absolute top-0 start-0 w-0 h-0 overflow-hidden flex gap-2 sm:gap-3"
                aria-hidden="true"
              >
                {allCategories.map((category, idx) => (
                  <button
                  aria-label={`go to ${category.name}`}
                    key={idx}
                    data-measure
                    className="px-4 sm:px-5 py-3 rounded-xl text-sm sm:text-base font-semibold border-2 border-[#E6E8ED] whitespace-nowrap"
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* ✅ الفئات المرئية */}
              {visibleCategories.map((category) => (
                <button
                aria-label={`go to ${category.name}`}
                  key={category.id ?? 'all'}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`
                    px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold
                    whitespace-nowrap transition-all duration-300 border-2 cursor-pointer
                    ${
                      activeCategory === category.id
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                        : 'bg-white text-[#667085] border-[#E6E8ED] hover:border-primary/40 hover:text-primary'
                    }
                  `}
                >
                  {category.name}
                </button>
              ))}

              {/* ✅ زر المزيد */}
              {hasHiddenCategories && (
                <div className="relative" ref={dropdownRef}>
                  <button
                  aria-label={`go to more categories`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`
                      flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold
                      whitespace-nowrap transition-all duration-300 border-2 cursor-pointer
                      ${
                        hiddenCategories.some(
                          (c) => c.id === activeCategory
                        )
                          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                          : 'bg-white text-[#667085] border-[#E6E8ED] hover:border-primary/40 hover:text-primary'
                      }
                    `}
                  >
                    <span>{t.products?.more || 'More'}</span>
                    <FiChevronDown
                      className={`transition-transform duration-300 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full -start-[1rem] lg:start-0 mt-2 bg-white rounded-xl shadow-2xl min-w-[150px] max-h-[300px] overflow-y-auto z-30 border border-gray-100 py-1">
                      {hiddenCategories.map((category) => (
                        <button
                        aria-label={`go to ${category.name}`}
                          key={category.id ?? 'all'}
                          onClick={() => handleCategoryChange(category.id)}
                          className={`
                            w-full text-start px-4 py-2.5 text-sm transition-colors  cursor-pointer
                            ${
                              activeCategory === category.id
                                ? 'bg-primary/5 text-primary font-semibold'
                                : 'text-gray-700 hover:bg-gray-50'
                            }
                          `}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ===== المنتاجات ===== */}
            {productsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/quote?product=${product.id}`}
                    className="block group"
                     aria-label='go get a quote'
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      <div className="relative w-full h-45 md:h-64 lg:h-72">
                        <Image
                          src={
                            product.image?.[0]?.url ||
                            '/images/products/placeholder.png'
                          }
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent lg:from-primary/0 lg:via-primary/0 lg:to-primary/0 lg:group-hover:from-primary/90 lg:group-hover:via-primary/50 lg:group-hover:to-primary/30 transition-all duration-500"></div>

                        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                          <h3 className="text-white text-sm sm:text-base md:text-lg font-bold mb-2 drop-shadow-lg line-clamp-2">
                            {product.name}
                          </h3>
                          <div className="inline-flex items-center gap-2 text-white font-medium text-sm">
                            <span>
                              {t.industryDetails?.getQuote || 'Get a Quote'}
                            </span>
                            <FaArrowRight
                              className={dir === 'rtl' ? 'rotate-180' : ''}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {t.industryDetails?.noProducts || 'No products found.'}
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}