"use server";
import { apiClient } from "@/lib/api-client";
import { getCookies } from "./helper";
import { MatchesResponse, MatchParams, MatchResponse } from "@/types/match";
import { FilterParams } from "@/types/global";
import { DetailMatchResponse } from "@/types/tournament";

export const getMatches = async (
  filters: FilterParams,
): Promise<MatchesResponse> => {
  const token = await getCookies();

  const response = await apiClient<MatchesResponse>(`/matches`, {
    params: filters,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  return response;
};

export const getMatch = async (
  matchId: string,
): Promise<DetailMatchResponse> => {
  const token = await getCookies();

  const response = await apiClient<DetailMatchResponse>(`/matches/${matchId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  return response;
};

export const createMatch = async (
  bracketId: string,
  params: MatchParams,
): Promise<MatchResponse> => {
  const token = await getCookies();

  const response = await apiClient<MatchResponse>(
    `/tournament_brackets/${bracketId}/matches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(params),
    },
  );

  return response;
};
