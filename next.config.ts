import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export", // Your existing setting
   trailingSlash: true,
  images: {
    unoptimized: true, // Add this line
  },
};

export default nextConfig;