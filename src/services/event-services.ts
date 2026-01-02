import { apiClient, internalApiClient } from "@/lib/api-client";
import { EventParams, EventResponse } from "@/types/events";

export const eventServices = {
  // Fetch all users
  getAll: async () => {
    return apiClient<EventResponse>("/events", {
      next: { revalidate: 3600 }, // Revalidate cache every hour
    });
  },
  create: async (params: EventParams) => {
    return internalApiClient<EventResponse>("/events", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },
  update: async (params: EventParams) => {
    if (!params.event_id) {
      throw new Error("Event ID is required");
    }

    const { event_id, ...rest } = params;
    return internalApiClient<EventResponse>(`/events/${event_id}`, {
      method: "PUT",
      body: JSON.stringify(rest),
    });
  },
};
