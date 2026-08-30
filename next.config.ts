import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
  devIndicators: false,
};

export default nextConfig;
