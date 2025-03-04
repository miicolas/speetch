import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      "midday.ai",
      "github.githubassets.com",
    ],
  },
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
