import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

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

export default withSentryConfig(nextConfig, {
  // From your Sentry project (Settings → General). Required for source-map upload.
  org: process.env.SENTRY_ORG ?? "YOUR_SENTRY_ORG",
  project: process.env.SENTRY_PROJECT ?? "YOUR_SENTRY_PROJECT",
  // Source-map upload needs SENTRY_AUTH_TOKEN at build time (set it in Vercel).
  // Without it the build still succeeds — it just skips the upload.
  silent: !process.env.CI,
  widenClientFileUpload: true,
  // Strips Sentry's debug-logging statements from the production bundle
  // (replaces the deprecated `disableLogger`).
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
