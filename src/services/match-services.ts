import { apiClient } from "@/lib/api-client";
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
};
