"use server";

import { SportResponse } from "@/types/global";
import { apiClient } from "@/lib/api-client";
import { errorHandler } from "@/lib/error-handler";

export const getSports = async (): Promise<SportResponse> => {
  try {
    const response = await apiClient<SportResponse>(`/sport_types`, {
      method: "GET",
    });

    return response;
  } catch (error: unknown) {
    return {
      sport_types: [],
      error: errorHandler(error, "Failed to fetch sports"),
    };
  }
};
