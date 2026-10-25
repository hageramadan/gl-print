/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 96, 128, 192, 256, 384, 448, 512],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.glprint-eg.com',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
