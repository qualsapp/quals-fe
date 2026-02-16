"use server";

import { SportResponse } from "@/types/global";
import { getCookies } from "./helper";
import { apiClient } from "@/lib/api-client";

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
  } catch (error: any) {
    return {
      sport_types: [],
      error: error?.message || "Failed to fetch sports",
    };
  }
};
