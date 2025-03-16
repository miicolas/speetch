import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
    pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "midday.ai",
            },
            {
                protocol: "https",
                hostname: "github.githubassets.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
    experimental: {
        authInterrupts: true,
    },
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    options: {
      remarkPlugins: [remarkGfm], // ✅ Correctly added        rehypePlugins: [],
    },
});

export default withMDX(nextConfig);
