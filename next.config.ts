import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],

  },
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
