import * as Sentry from "@sentry/nextjs";

// Next.js calls register() once per server runtime at startup.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

// Global net for UNCAUGHT server-side errors (incl. inside server actions,
// server components, and route handlers). Note: errors that are caught and
// returned by src/lib/error-handler.ts are reported there instead.
export const onRequestError = Sentry.captureRequestError;
