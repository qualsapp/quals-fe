import { apiClient, internalApiClient } from "@/lib/api-client";
import {
  EventParams,
  EventResponse,
  RulesParams,
  RulesResponse,
} from "@/types/events";

export const eventServices = {
  // Fetch all users
  getAll: async () => {
    return apiClient<EventResponse>("/events", {
      next: { revalidate: 3600 }, // Revalidate cache every hour
    });
  },
  create: async (params: EventParams) => {
    return internalApiClient<EventResponse>("/api/events", {
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
  createRules: async (params: RulesParams) => {
    return internalApiClient<RulesResponse>(`/api/tournament`, {
      method: "POST",
      body: JSON.stringify(params),
    });
  },
  updateRules: async (params: RulesParams) => {
    return internalApiClient<RulesResponse>(`/api/tournament/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params),
    });
  },
};
