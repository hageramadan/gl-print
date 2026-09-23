"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { PageBanner } from "@/src/components/common/PageBanner";
import { BlogCard } from "@/src/components/blogs/BlogCard";
import { SocialShare } from "@/src/components/blogs/SocialShare";
import { useLanguage } from "@/src/hooks/useLanguage";
import { getBlogDetails, BlogDetails, Blog } from "@/src/services/blogsApi";
import { getHomeData } from "@/src/services/homeApi";
import { LoadingScreen } from "@/src/components/common/LoadingScreen";

export default function BlogDetailsPage() {
  const params = useParams();

  const { language, t } = useLanguage();
  const blogSlug = params.id as string;
  const [blog, setBlog] = useState<BlogDetails | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [socialLinks, setSocialLinks] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ جلب تفاصيل المدونة
  const fetchBlogData = useCallback(async (slug: string, lang: string) => {
    try {
      setLoading(true);
      const response = await getBlogDetails(slug, lang);
      setBlog(response.data.blog);
      setRelatedBlogs(response.data.related_blogs || []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch blog details:", err);
      setError("Failed to load blog details.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ جلب السوشيال لينكس من API /home
  const fetchSocialLinks = useCallback(async (lang: string) => {
    try {
      const response = await getHomeData(lang);
      setSocialLinks(response.footer?.social_links || null);
    } catch (err) {
      console.error("Failed to fetch social links:", err);
    }
  }, []);

  useEffect(() => {
    if (blogSlug) {
      fetchBlogData(blogSlug, language);
      fetchSocialLinks(language);
    }
  }, [blogSlug, language, fetchBlogData, fetchSocialLinks]);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }
  if (loading) {
    return <LoadingScreen isLoading={loading} videoSrc="/videos/loading.mp4" />;
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {t.blogs?.notFound || "Blog Not Found"}
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <PageBanner
        title={blog.title}
        backgroundImage={blog.image}
        breadcrumbs={[
          { label: t.banner?.home || "Home", href: "/" },
          { label: t.blogs?.pageTitle || "Blogs", href: "/blogs" },
          { label: blog.title, href: "#" },
        ]}
      />

      {/* ===== محتوى المدونة ===== */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div>
            <div className="mb-3 lg:mb-8">
              <SocialShare socialLinks={socialLinks} />
            </div>
            {/* <h1 className="text-3xl md:text-3xl lg:text-4xl font-extrabold text-primary mb-6">
              {blog.title}
            </h1> */}
            {/* <div
              className="prose prose-lg max-w-none text-[#667085] leading-relaxed
                prose-headings:text-primary prose-headings:font-bold
                prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:mb-4 prose-p:leading-relaxed
                prose-strong:text-primary
                prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
                prose-ul:my-4 prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: blog.title }}
            /> */}

            {/* <div
              className="blog-content prose prose-lg max-w-none text-[#667085] leading-relaxed
              prose-headings:text-primary prose-headings:font-bold
              prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:mb-4 prose-p:leading-relaxed
              prose-strong:text-primary
              prose-a:text-[#667085] prose-a:no-underline 
              no-underline
              prose-ul:my-4 prose-li:my-1"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                      /> */}
            <div
              className="
                    blog-content
                    prose prose-lg max-w-none
                    text-[#667085]
                    leading-relaxed

                    prose-headings:text-primary
                    prose-headings:font-bold

                    prose-h2:text-2xl
                    prose-h2:md:text-3xl
                    prose-h2:mt-8
                    prose-h2:mb-4

                    prose-h3:text-xl
                    prose-h3:md:text-2xl
                    prose-h3:mt-6
                    prose-h3:mb-3

                    prose-p:mb-4
                    prose-p:leading-relaxed

                    prose-strong:text-primary

                    prose-a:text-[#667085]
                    prose-a:no-underline

                    prose-ul:my-4
                    prose-li:my-1
  "
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </section>

      {/* ===== مقالات ذات صلة ===== */}
      {relatedBlogs.length > 0 && (
        <section className="py-5 lg:pt-2 lg:pb-10">
          <div className="container mx-auto px-4">
            <div className="mb-6 md:mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#171A21]">
                {t.blogs?.relatedTitle || "Related Blogs"}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {relatedBlogs.map((relatedBlog, index) => (
                <BlogCard
                  key={relatedBlog.id}
                  blog={relatedBlog}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
