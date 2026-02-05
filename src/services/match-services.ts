import { apiClient, internalApiClient } from "@/lib/api-client";
import { MatchesResponse } from "@/types/match";

export const matchServices = {
  // getById: async (communityId: string, eventId: string, matchId: string) => {
  //   return apiClient<MatchResponse>(
  //     `/communities/${communityId}/events/${eventId}/matches/${matchId}`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     },
  //   );
  // },
  getAll: async (
    communityId: string,
    eventId: string,
    tournamentId: string,
    token: string,
  ) => {
    return apiClient<MatchesResponse>(
      `/communities/${communityId}/events/${eventId}/tournaments/${tournamentId}/matches?page=1&page_size=10`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },

  updateParticipant: async (
    communityId: string,
    eventId: string,
    tournamentId: string,
    token: string,
    participant_a: number,
    participant_b: number,
  ) => {
    return internalApiClient<MatchesResponse>(`/matches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        community_id: communityId,
        event_id: eventId,
        tournament_id: tournamentId,
        participant_a: participant_a,
        participant_b: participant_b,
      }),
    });
  },
};
