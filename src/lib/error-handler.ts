import { ApiError, ApiResponse } from "@/types/global";

export const errorHandler = (error: unknown, defaultMessage: string) => {
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
  if (error instanceof Response) {
    return {
      status: error.status,
      error: error.statusText || defaultMessage,
    } as ApiResponse<T>;
  } else if (error instanceof Error) {
    return {
      error: errorHandler(error, defaultMessage),
    } as ApiResponse<T>;
  } else {
    return {
      error: "An unknown error occurred while fetching host details",
    } as ApiResponse<T>;
  }
};
