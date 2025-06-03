import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: false,
};

export default nextConfig;
