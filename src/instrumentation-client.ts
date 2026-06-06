// Sentry init for the browser (replaces the deprecated sentry.client.config.ts;
// required for Turbopack). Auto-loaded by Next.js on the client.
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  // No DSN (e.g. local dev) → SDK is a no-op, so this is safe to leave wired in.
  enabled: Boolean(dsn),
  // Tune down as traffic grows; 1.0 captures every transaction.
  tracesSampleRate: 1.0,
});

// Instruments client-side navigations for tracing.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
