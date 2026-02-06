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
    params: {
      participant_a_id: number;
      participant_b_id: number;
      tournament_bracket_id: number;
      court_number: number;
      match_rule_id: number;
    },
  ) => {
    return await internalApiClient<MatchesResponse>(`/api/matches`, {
      method: "POST",
      body: JSON.stringify({
        community_id: Number(communityId),
        event_id: Number(eventId),
        tournament_id: Number(tournamentId),
        params,
      }),
    });
  },
};
