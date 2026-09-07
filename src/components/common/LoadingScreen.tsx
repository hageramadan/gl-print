'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
     
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-[9999] flex flex-col items-center justify-center
        bg-gradient-to-br from-white via-white to-white
        transition-opacity duration-500 ease-out
        ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      {/* ===== اللوجو ===== */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 ">
        <Image
          src="/logo2.png"
          alt="GL Print"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* ===== اسم الموقع ===== */}
      {/* <h1 className="text-2xl md:text-4xl font-bold text-primary mb-8 tracking-wider">
        GL PRINT
      </h1> */}

      {/* ===== شريط التحميل ===== */}
      <div className="relative w-48 md:w-64 h-1 bg-white/20 rounded-full overflow-hidden mt-3">
        <div 
          className="absolute inset-0 bg-primary rounded-full "
          style={{
            width: '0%',
            animation: 'loadingProgress 1.5s ease-in-out infinite',
          }}
        />
      </div>

      {/* ===== نص التحميل ===== */}
      <p className="text-white/60 text-sm mt-4 animate-pulse">
        Loading...
      </p>

      {/* ===== CSS للأنيميشن ===== */}
      <style jsx>{`
        @keyframes loadingProgress {
          0% {
            width: 0%;
            transform: translateX(0);
          }
          50% {
            width: 70%;
            transform: translateX(10%);
          }
          100% {
            width: 100%;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};