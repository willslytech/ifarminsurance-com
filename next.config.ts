import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove 'output: "standalone"' for Vercel deployment
  // Vercel handles this automatically

  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,

  // Optimize images for Vercel
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
