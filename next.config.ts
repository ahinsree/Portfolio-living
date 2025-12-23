import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Commented out to allow API routes (Chat Assistant) to work. 
  // If you want to deploy to GitHub Pages, you must uncomment the line above, but the AI Chat will stop working.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
