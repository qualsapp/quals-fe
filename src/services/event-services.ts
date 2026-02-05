import { apiClient, internalApiClient } from "@/lib/api-client";
import { EventParams, EventResponse, EventsResponse } from "@/types/events";
import { TournamentParams, TournamentResponse } from "@/types/tournament";

export const eventServices = {
  // Fetch all users
  getAllPublic: async (token: string) => {
    return apiClient<EventsResponse>(`/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAll: async (communityId: string, token: string) => {
    return apiClient<EventsResponse>(
      `/communities/${communityId}/events?page=1&page_size=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  getById: async (communityId: string, eventId: string, token: string) => {
    return apiClient<EventResponse>(
      `/communities/${communityId}/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
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
  createRules: async (params: TournamentParams) => {
    return internalApiClient<TournamentResponse>(`/api/tournament`, {
      method: "POST",
      body: JSON.stringify(params),
    });
  },
  updateRules: async (params: TournamentParams) => {
    return internalApiClient<TournamentResponse>(
      `/api/tournament/${params.id}`,
      {
        method: "PUT",
        body: JSON.stringify(params),
      },
    );
  },
};
