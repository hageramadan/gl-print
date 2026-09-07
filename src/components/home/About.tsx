"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/src/hooks/useLanguage";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

interface AboutProps {
  data: {
    id: number;
    tagline: string;
    title: string;
    description: string;
    button: {
      text: string;
      action_type: string;
    };
    home_images: string[];
  };
}

export const About = ({ data }: AboutProps) => {
  const { t, dir } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // استخدام الصور من الـ API أو الصور الافتراضية
  const images = data?.home_images || [
    '/images/about/ab1.png',
    '/images/about/ab2.png',
    '/images/about/ab3.png',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-2 pb-5 md:py-16 lg:py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          
          {/* ===== الجالري (الجهة اليسرى) ===== */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative w-full aspect-[4/3] max-w-[500px] mx-auto  lg:mx-0  overflow-hidden md:overflow-visible">
              
              {/* ===== الصورة الكبيرة (الخلفية) ===== */}
              <div
                className={`
                  absolute rounded-xl overflow-hidden shadow-2xl
                  transition-all duration-1000 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}
                `}
                style={{
                  width: "clamp(200px, 70%, 346px)",
                  height: "clamp(260px, 90%, 458px)",
                  top: "clamp(40px, 15%, 77px)",
                  left: "clamp(120px, 50%, 253px)",
                  borderRadius: "10.97px",
                  zIndex: 1,
                  transitionDelay: "0.1s",
                }}
              >
                <Image
                  src={images[0]}
                  alt={data?.tagline || "About GL Print"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* ===== الصورة الوسطى (يمين - أعلى) ===== */}
              <div
                className={`
                  absolute rounded-lg overflow-hidden shadow-xl z-20
                  transition-all duration-1000 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-12 scale-95'}
                `}
                style={{
                  width: "clamp(120px, 40%, 200px)",
                  height: "clamp(130px, 42%, 211px)",
                  top: "clamp(20px, 8%, 36px)",
                  left: "clamp(70px, 30%, 154px)",
                  borderRadius: "5.48px",
                  transitionDelay: "0.3s",
                }}
              >
                <Image
                  src={images[1]}
                  alt={data?.tagline || "About GL Print 2"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* ===== الصورة الصغيرة (يسار - أسفل) ===== */}
              <div
                className={`
                  absolute rounded-lg overflow-hidden shadow-xl z-30
                  transition-all duration-1000 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}
                `}
                style={{
                  width: "clamp(130px, 45%, 224px)",
                  height: "clamp(150px, 48%, 247px)",
                  top: "clamp(100px, 38%, 191px)",
                  left: "clamp(0px, 0%, 0px)",
                  borderRadius: "5.48px",
                  transitionDelay: "0.5s",
                }}
              >
                <Image
                  src={images[2]}
                  alt={data?.tagline || "About GL Print 3"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* ===== عناصر زخرفية متحركة ===== */}
              <div
                className={`
                  absolute -z-10 rounded-full bg-secondary/10
                  transition-all duration-1000 ease-out
                  ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                `}
                style={{
                  width: "clamp(60px, 20%, 120px)",
                  height: "clamp(60px, 20%, 120px)",
                  bottom: "clamp(-10px, -5%, -20px)",
                  right: "clamp(-10px, -5%, -20px)",
                  transitionDelay: "0.7s",
                }}
              />
              <div
                className={`
                  absolute -z-10 rounded-full bg-primary/5
                  transition-all duration-1000 ease-out
                  ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                `}
                style={{
                  width: "clamp(40px, 15%, 80px)",
                  height: "clamp(40px, 15%, 80px)",
                  top: "clamp(-5px, -2%, -10px)",
                  left: "clamp(40px, 20%, 100px)",
                  transitionDelay: "0.9s",
                }}
              />

              {/* ===== إطار زخرفي متحرك ===== */}
              <div
                className={`
                  absolute -z-5 border-2 border-secondary/20 rounded-2xl
                  transition-all duration-1000 ease-out
                  ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-6'}
                `}
                style={{
                  width: "clamp(220px, 75%, 380px)",
                  height: "clamp(280px, 95%, 490px)",
                  top: "clamp(30px, 12%, 60px)",
                  left: "clamp(10px, 6%, 30px)",
                  borderRadius: "16px",
                  transitionDelay: "0.2s",
                }}
              />
            </div>
          </div>

          {/* ===== المحتوى (الجهة اليمنى) ===== */}
          <div className="w-full lg:w-1/2" dir={dir}>
            <div className="max-w-xl mx-auto lg:mx-0">
              {/* ===== عنوان القسم ===== */}
              <div
                className={`
                  mb-6 transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
                `}
                style={{ transitionDelay: "0.2s" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-0.5 bg-secondary"></div>
                  <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
                    {data?.tagline || 'About GL Print'}
                  </span>
                </div>
              </div>

              {/* ===== الوصف - النص الكبير ===== */}
              <p
                className={`
                  text-xl md:text-2xl lg:text-[32px] text-primary font-extrabold mb-4 leading-relaxed
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
                `}
                style={{ transitionDelay: "0.4s" }}
              >
                {data?.title || 'GL Print delivers precision, consistency, and professional craftsmanship.'}
              </p>

              {/* ===== الوصف - النص الطويل ===== */}
              <p
                className={`
                  text-sm md:text-base lg:text-lg text-[#667085] font-medium md:font-semibold leading-relaxed mb-8
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
                `}
                style={{ transitionDelay: "0.6s" }}
              >
                {data?.description || 'GL Print (Cairo, Egypt) offers full-service design, printing, and outdoor advertising solutions, using advanced technologies to deliver high-quality prints that help businesses stand out and succeed.'}
              </p>

              {/* ===== زر Get a Quote ===== */}
              <Link
                href={data?.button?.action_type === 'request_quote' ? '/quote' : '/quote'}
                className={`
                  w-fit text-sm md:text-[14.5px] font-bold flex items-center gap-2 
                  bg-secondary hover:bg-secondary-dark text-white 
                  px-8 md:px-10 lg:px-12 py-3 md:py-3.5 lg:py-4 
                  rounded-2xl shadow-lg shadow-red-200 
                  transition-all duration-500 hover:-translate-y-1 hover:shadow-xl
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: "0.8s" }}
              >
                <span>{data?.button?.text || 'Get a Quote'}</span>
                <FaArrowRight className="ms-1 md:ms-2 text-white text-xs md:text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};