'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  videoSrc?: string;
}

export const LoadingScreen = ({
  isLoading,
  videoSrc = '/videos/loading.mp4',
}: LoadingScreenProps) => {
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
        fixed inset-0 z-[9999] flex items-center justify-center
        bg-white
        transition-opacity duration-500 ease-out
        ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      {/* ===== الفيديو ===== */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain"
      >
        <source src={videoSrc} type="video/mp4" />
        {/* Fallback */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};