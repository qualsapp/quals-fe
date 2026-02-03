import { apiClient, internalApiClient } from "@/lib/api-client";
import { EventsResponse } from "@/types/events";
import { TournamentParams, TournamentResponse } from "@/types/tournament";

export const tournamentServices = {
  // Fetch all users
  getAll: async (communityId: string, token: string) => {
    return apiClient<EventsResponse>(
      `/communities/${communityId}/events?page=1&page_size=10`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  getById: async (
    communityId: string,
    eventId: string,
    tournamentId: string,
    token: string,
  ) => {
    return apiClient<TournamentResponse>(
      `/communities/${communityId}/events/${eventId}/tournaments/${tournamentId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  create: async (params: TournamentParams) => {
    return internalApiClient<TournamentResponse>(`/api/tournament`, {
      method: "POST",
      body: JSON.stringify(params),
    });
  },
  update: async (params: TournamentParams) => {
    return internalApiClient<TournamentResponse>(
      `/api/tournament/${params.id}`,
      {
        method: "PUT",
        body: JSON.stringify(params),
      },
    );
  },
};
