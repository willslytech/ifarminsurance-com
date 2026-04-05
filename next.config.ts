import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: false,

  // Optimize images for Vercel
  images: {
    remotePatterns: [],
    unoptimized: false,
  },

  // Disable static optimization for dynamic routes
  output: undefined,
};

export default nextConfig;
