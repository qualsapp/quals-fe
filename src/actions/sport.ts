"use server";

import { SportResponse } from "@/types/global";
import { getCookies } from "./helper";
import { apiClient } from "@/lib/api-client";
import { errorHandler } from "@/lib/error-handler";

export const getSports = async (): Promise<SportResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<SportResponse>(`/sport_types`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    return response;
  } catch (error: unknown) {
    return {
      sport_types: [],
      error: errorHandler(error, "Failed to fetch sports"),
    };
  }
};
