'use client';

import { useEffect, useState, useCallback } from 'react';
import { PageBanner } from '@/src/components/common/PageBanner';
import { BlogCard } from '@/src/components/blogs/BlogCard';
import { Pagination } from '@/src/components/common/Pagination';
import { useLanguage } from '@/src/hooks/useLanguage';
import { getBlogs, Blog, Banner } from '@/src/services/blogsApi';
import { LoadingScreen } from '@/src/components/common/LoadingScreen';

export default function BlogsPage() {
  const { language, t } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(
    async (page: number, lang: string) => {
      try {
        setLoading(true);
        const response = await getBlogs(page, lang);
        setBlogs(response.data.blogs || []);
        if (response.data.banner) setBanner(response.data.banner);
        if (response.data.pagination) {
          setCurrentPage(response.data.pagination.current_page);
          setLastPage(response.data.pagination.last_page);
          setTotal(response.data.pagination.total);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData(currentPage, language);
  }, [currentPage, language, fetchData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // if (loading && blogs.length === 0) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }
  if (loading) {
  return <LoadingScreen isLoading={loading} videoSrc="/videos/loading.mp4" />;
}

  const bannerTitle = banner?.title || t.blogs?.pageTitle || 'Blogs';
  const bannerImage =
    banner?.image_url || '/images/banner/blogs-banner.png';

  return (
    <main>
      <PageBanner
        title={bannerTitle}
        backgroundImage={bannerImage}
        breadcrumbs={[
          { label: t.banner?.home || 'Home', href: '/' },
          { label: bannerTitle, href: '#' },
        ]}
      />

      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* ===== العنوان ===== */}
          {/* <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-secondary"></div>
              <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
                {t.blogs?.tag || 'Our Blog'}
              </span>
              <div className="w-10 h-0.5 bg-secondary"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#171A21] mb-4">
              {t.blogs?.title || 'Latest Articles'}
            </h2>
            <p className="text-base md:text-lg text-[#667085] max-w-2xl mx-auto">
              {t.blogs?.subtitle ||
                'Insights and tips from our printing experts.'}
            </p>
          </div> */}

          {/* ===== الكروت ===== */}
          {blogs.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
                {blogs.map((blog, index) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    delay={index * 0.1}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {t.blogs?.noBlogs || 'No blogs found.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}