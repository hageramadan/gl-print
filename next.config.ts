/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'glprint-eg.com',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;