import * as Sentry from "@sentry/nextjs";
import { ApiError, ApiResponse } from "@/types/global";
import { ApiClientError } from "@/lib/api-client";

// Server actions catch errors and return them as values, so they never reach
// Sentry's onRequestError net. This chokepoint reports them instead.
// Expected client errors (validation / auth / not-found, i.e. 4xx) are skipped
// to keep the signal clean; 5xx and thrown errors (network, unexpected) report.
const reportToSentry = (error: unknown) => {
  if (error instanceof ApiClientError && error.status < 500) return;
  if (error instanceof Response && error.status < 500) return;
  Sentry.captureException(error);
};

export const errorHandler = (error: unknown, defaultMessage: string) => {
  reportToSentry(error);
  let errorMessage = defaultMessage;
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }
  return errorMessage;
};

export const errorResponseHandler = <T>(
  error: ApiError,
  defaultMessage: string,
): ApiResponse<T> => {
  reportToSentry(error);
  // Check ApiClientError before Error — it extends Error and carries the HTTP
  // status plus the backend's message, which we want to surface to the caller.
  if (error instanceof ApiClientError) {
    return {
      status: error.status,
      error: error.message || defaultMessage,
    } as ApiResponse<T>;
  } else if (error instanceof Response) {
    return {
      status: error.status,
      error: error.statusText || defaultMessage,
    } as ApiResponse<T>;
  } else if (error instanceof Error) {
    return {
      error: error.message || defaultMessage,
    } as ApiResponse<T>;
  } else {
    return {
      error: defaultMessage,
    } as ApiResponse<T>;
  }
};
