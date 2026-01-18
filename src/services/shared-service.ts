import { apiClient, internalApiClient } from "@/lib/api-client";
import { EventParams, EventResponse } from "@/types/events";
import { SportResponse } from "@/types/global";

export const sharedService = {
  // Fetch all users
  getAllSports: async () => {
    return internalApiClient<SportResponse>("/api/sports", {
      next: { revalidate: 3600 }, // Revalidate cache every hour
    });
  },
};
