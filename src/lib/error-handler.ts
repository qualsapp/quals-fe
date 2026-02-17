export const errorHandler = (error: unknown, defaultMessage: string) => {
  let errorMessage = defaultMessage;
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }
  return errorMessage;
};
