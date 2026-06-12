import * as Sentry from "@sentry/nextjs";
import { ApiError, ApiResponse } from "@/types/global";
import { ApiClientError } from "@/lib/api-client";

// Server actions catch errors and return them as values, so they never reach
// Sentry's onRequestError net. This chokepoint reports them instead.
// Only expected client errors (validation / auth / not-found, i.e. 4xx) are
// skipped to keep the signal clean; everything else reports — 5xx, network
// failures (status 0), and unexpected thrown errors.
const isExpectedClientError = (status: number) => status >= 400 && status < 500;

const reportToSentry = (error: unknown) => {
  if (error instanceof ApiClientError && isExpectedClientError(error.status))
    return;
  if (error instanceof Response && isExpectedClientError(error.status)) return;
  if (error instanceof ApiClientError) {
    Sentry.captureException(error, {
      contexts: {
        api_response: {
          status: error.status,
          body: error.body,
        },
      },
    });
    return;
  }
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
