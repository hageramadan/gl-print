'use client';

import { useEffect, useState, useCallback } from 'react';
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
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function IndustryDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const industryId = Number(params.id);
  const { language, t, dir } = useLanguage();

  const [industry, setIndustry] = useState<IndustryDetails | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const fetchData = useCallback(async (id: number, lang: string) => {
    try {
      setLoading(true);
      const response = await getIndustryDetails(id, lang);
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

  // ✅ جلب المنتجات حسب industry و category
  const fetchProducts = useCallback(
    async (id: number, categoryId: number | null, lang: string) => {
      try {
        setProductsLoading(true);
        const response = await getProducts(
          1,
          null,
          lang,
          id,
          categoryId
        );
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
    if (industryId) {
      fetchData(industryId, language);
      fetchProducts(industryId, null, language);
    }
  }, [industryId, language, fetchData, fetchProducts]);

  const handleCategoryChange = (categoryId: number | null) => {
    setActiveCategory(categoryId);
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
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

            {/* ===== الموبايل: سلايدر ===== */}
            <div className="lg:hidden mb-10 overflow-hidden">
              <Swiper
                modules={[FreeMode]}
                spaceBetween={10}
                slidesPerView="auto"
                freeMode={true}
                className="!overflow-visible"
              >
                <SwiperSlide className="!w-auto">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={`
                      px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap
                      transition-all duration-300 border-2
                      ${
                        activeCategory === null
                          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                          : 'bg-white text-[#667085] border-[#E6E8ED]'
                      }
                    `}
                  >
                    {t.industryDetails?.all || 'All'}
                  </button>
                </SwiperSlide>

                {industry.categories.map((category) => (
                  <SwiperSlide key={category.id} className="!w-auto">
                    <button
                      onClick={() => handleCategoryChange(category.id)}
                      className={`
                        px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap
                        transition-all duration-300 border-2
                        ${
                          activeCategory === category.id
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                            : 'bg-white text-[#667085] border-[#E6E8ED]'
                        }
                      `}
                    >
                      {category.name}
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* ===== الديسكتوب ===== */}
            <div className="hidden lg:flex flex-wrap items-center gap-3 mb-10">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`
                  px-5 py-3 rounded-xl text-base font-semibold
                  transition-all duration-300 border-2
                  ${
                    activeCategory === null
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                      : 'bg-white text-[#667085] border-[#E6E8ED] hover:border-primary/40 hover:text-primary'
                  }
                `}
              >
                {t.industryDetails?.all || 'All'}
              </button>

              {industry.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`
                    px-5 py-3 rounded-xl text-base font-semibold
                    transition-all duration-300 border-2
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
            </div>

            {/* ===== المنتجات ===== */}
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
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      <div className="relative w-full h-56 md:h-64 lg:h-72">
                        <Image
                          src={product.image?.[0]?.url || '/images/products/placeholder.png'}
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
                            <span>{t.industryDetails?.getQuote || 'Get a Quote'}</span>
                            <FaArrowRight className={dir === 'rtl' ? 'rotate-180' : ''} />
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