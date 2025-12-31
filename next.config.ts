import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages / Vercel
  // output: 'export',
  
  // Image optimization
  images: { 
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  
  // Trailing slash for static hosting
  // trailingSlash: true,
  
  // Performance optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['framer-motion', 'gsap'],
  },

  // Enable React 19 Compiler for automatic memoization (moved from experimental in Next.js 16)
  reactCompiler: true,
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;