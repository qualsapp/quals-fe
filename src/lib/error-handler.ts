import * as Sentry from "@sentry/nextjs";
import { ApiError, ApiResponse } from "@/types/global";

// Server actions catch errors and return them as values, so they never reach
// Sentry's onRequestError net. This chokepoint reports them instead.
// Expected client errors (validation / auth / not-found, i.e. 4xx) are skipped
// to keep the signal clean; 5xx and thrown errors (network, unexpected) report.
const reportToSentry = (error: unknown) => {
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
  if (error instanceof Response) {
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
      error: "An unknown error occurred while fetching host details",
    } as ApiResponse<T>;
  }
};
