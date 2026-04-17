import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  crossOrigin: "anonymous",
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
      },
    ],
  },
};

export default nextConfig;
