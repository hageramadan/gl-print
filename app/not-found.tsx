import Link from 'next/link';
import { FiArrowRight, FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-linear-to-br from-white via-gray-50 to-gray-100 px-4 py-16">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* ===== الصورة أو الأيقونة ===== */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative">
              {/* رقم 404 */}
              <div className="text-8xl md:text-9xl lg:text-[150px] font-extrabold text-primary/10 select-none">
                404
              </div>
              
              {/* أيقونة أو صورة فوق الرقم */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-secondary/10 rounded-full p-6 md:p-8">
                  <svg 
                    className="w-20 h-20 md:w-28 md:h-28 text-secondary" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ===== المحتوى ===== */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-4">
              Page Not Found
            </h1>
            
           
            {/* ===== الأزرار ===== */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <FiHome className="text-lg" />
                <span>Back to Home</span>
              </Link>
              
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span>Explore Services</span>
                <FiArrowRight className="text-lg" />
              </Link>
            </div>

            {/* ===== روابط مساعدة ===== */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
              <span>Quick Links:</span>
              <Link href="/about" className="hover:text-secondary transition-colors">About</Link>
              <span className="text-gray-300">|</span>
              <Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link>
              <span className="text-gray-300">|</span>
              <Link href="/blog" className="hover:text-secondary transition-colors">Blog</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}