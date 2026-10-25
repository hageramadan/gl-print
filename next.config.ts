/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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