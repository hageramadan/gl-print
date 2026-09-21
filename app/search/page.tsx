"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchBanner } from "@/src/components/search/SearchBanner";
import { SearchTabs } from "@/src/components/search/SearchTabs";
import { SearchServiceCard } from "@/src/components/search/SearchServiceCard";
import { ProductCard } from "@/src/components/products/ProductCard";
import { Pagination } from "@/src/components/common/Pagination";
import { useLanguage } from "@/src/hooks/useLanguage";
import {
  searchAll,
  SearchResponse,
  SearchType,
} from "@/src/services/searchApi";
import Link from "next/link";
import { LoadingScreen } from "@/src/components/common/LoadingScreen";

function SearchContent() {
  const { language, t, dir } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const typeParam = (searchParams.get("type") as SearchType) || "all";
  const pageParam = Number(searchParams.get("page")) || 1;

  const [data, setData] = useState<SearchResponse["data"] | null>(null);
  const [activeTab, setActiveTab] = useState<SearchType>(typeParam);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [loading, setLoading] = useState(true);

  // ✅ جلب نتائج البحث
  const fetchResults = useCallback(
    async (q: string, type: SearchType, page: number, lang: string) => {
      if (!q) {
        setData(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await searchAll(q, type, page, lang);
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // ✅ عند تغيير الرابط
  useEffect(() => {
    setActiveTab(typeParam);
    setCurrentPage(pageParam);
    fetchResults(query, typeParam, pageParam, language);
  }, [query, typeParam, pageParam, language, fetchResults]);

  const handleTabChange = (tab: SearchType) => {
    setActiveTab(tab);
    setCurrentPage(1);
    router.push(`/search?q=${encodeURIComponent(query)}&type=${tab}&page=1`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(
      `/search?q=${encodeURIComponent(query)}&type=${activeTab}&page=${page}`,
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ إذا لم يوجد بحث
  if (!query) {
    return (
      <main>
        <SearchBanner />
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xl text-gray-500">
              {t.search?.enterQuery || "Please enter a search query."}
            </p>
          </div>
        </section>
      </main>
    );
  }

  // ✅ إذا كان التحميل
  // if (loading) {
  //   return (
  //     <main>
  //       <SearchBanner initialQuery={query} />
  //       <div className="min-h-[400px] flex items-center justify-center bg-white">
  //         <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  //       </div>
  //     </main>
  //   );
  // }
  if (loading) {
  return <LoadingScreen isLoading={loading} videoSrc="/videos/loading.mp4" />;
}

  const counts = data?.counts || { all: 0, services: 0, products: 0 };
  const services = data?.services?.items || [];
  const products = data?.products?.items || [];
  const servicesPagination = data?.services?.pagination;
  const productsPagination = data?.products?.pagination;

  // ✅ النتائج المعروضة حسب التاب
  const showServices = activeTab === "all" || activeTab === "services";
  const showProducts = activeTab === "all" || activeTab === "products";

  const totalResults = counts.all;
  const activePagination =
    activeTab === "services"
      ? servicesPagination
      : activeTab === "products"
        ? productsPagination
        : null;

  return (
    <main>
      <SearchBanner initialQuery={query} />

      <section className="py-12 md:py-16 lg:py-20 bg-gray-50" dir={dir}>
        <div className="container mx-auto px-4">
          {/* ===== العنوان ===== */}
          {totalResults > 0 && (
            <div className="mb-6 flex items-center gap-1 font-bold text-sm lg:text-3xl text-[#051B4B]">
              <h1>{t.search.show}</h1>
              <p className="mx-2">{totalResults} </p>
              <h2 className="text-base md:text-3xl font-bold ">
                {t.search?.resultsFor || "Search Results for:"}{" "}
              </h2>
              <p className="text-secondary ">`{query}`</p>
            </div>
          )}

          {/* ===== التابات ===== */}
          {totalResults > 0 && (
            <SearchTabs
              activeTab={activeTab}
              counts={counts}
              onTabChange={handleTabChange}
            />
          )}

          {/* ===== النتائج ===== */}
          {totalResults === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl lg:text-3xl text-gray-700">
                {t.search?.noResults || "No results found."}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                {t.search?.tryDifferent || "Try a different search term."}
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* ===== الخدمات ===== */}
              {showServices && services.length > 0 && (
                <div>
                 <div className="flex items-center justify-between">
                     <h3 className="text-xl md:text-2xl font-bold text-[#171A21] mb-6">
                    {t.search?.services || "Services"}
                  </h3>
                  <Link  aria-label='go to services' href="/services" className="text-secondary font-bold ">{t.services2.viewAll}</Link>
                 </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    {services.map((service) => (
                      <SearchServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                </div>
              )}

              {/* ===== المنتاجات ===== */}
              {showProducts && products.length > 0 && (
                <div>
                  <div className="flex items-center justify-between">
                     <h3 className="text-xl md:text-2xl font-bold text-[#171A21] mb-6">
                    {t.search?.products || "Products"}
                  </h3>
                  <Link  aria-label='go to products' href="/products" className="text-secondary font-bold ">{t.products.viewAll2}</Link>
                 </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {products.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product as any}
                        delay={index * 0.1}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ===== Pagination ===== */}
              {activePagination && activePagination.last_page > 1 && (
                <Pagination
                  currentPage={activePagination.current_page}
                  lastPage={activePagination.last_page}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
