// Sentry init for the Node.js server runtime (server components, server actions,
// route handlers). Loaded from src/instrumentation.ts.
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  // No DSN (e.g. local dev) → SDK is a no-op, so this is safe to leave wired in.
  enabled: Boolean(dsn),
  // Tune down as traffic grows; 1.0 captures every transaction.
  tracesSampleRate: 1.0,
});
