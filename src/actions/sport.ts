"use server";

import { SportResponse } from "@/types/global";
import { getCookies } from "./helper";
import { apiClient } from "@/lib/api-client";

export const getSports = async (): Promise<SportResponse> => {
  const token = await getCookies();

  const response = await apiClient<SportResponse>(`/sport_types`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  return response;
};
