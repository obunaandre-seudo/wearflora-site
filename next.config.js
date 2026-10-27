/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.novasunhub.com' },
      { protocol: 'https', hostname: '**.neon.tech', pathname: '/product-images/**' },
    ],
  },
  eslint: { ignoreDuringBuilds: false },
};

module.exports = nextConfig;
