import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Basic performance optimizations for static site
  compress: true,
  poweredByHeader: false,

  // Image optimization for static assets
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: process.env.NODE_ENV === "production" ? 31536000 : 0, // No cache in development
  },

  // Bundle optimization (only in production)
  experimental: {
    optimizeCss: process.env.NODE_ENV === "production",
  },

  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Static asset caching
  async headers() {
    return [
      {
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
