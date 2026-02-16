"use server";
import { apiClient } from "@/lib/api-client";
import { getCookies } from "./helper";
import { MatchesResponse, MatchParams, MatchResponse } from "@/types/match";
import { FilterParams } from "@/types/global";
import {
  DetailMatchResponse,
  MatchRuleParams,
  MatchRuleResponse,
} from "@/types/tournament";

export const getMatches = async (
  filters: FilterParams,
): Promise<MatchesResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<MatchesResponse>(`/matches`, {
      params: filters,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    return response;
  } catch (error: any) {
    return {
      matches: [],
      page: 0,
      page_size: 0,
      total: 0,
      error: error?.message || "Failed to fetch matches",
    };
  }
};

export const getMatch = async (
  matchId: string,
): Promise<DetailMatchResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<DetailMatchResponse>(
      `/matches/${matchId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    return {
      error: error?.message || "Failed to fetch match details",
    } as DetailMatchResponse;
  }
};

export const createMatch = async (
  bracketId: string,
  params: MatchParams,
): Promise<MatchResponse> => {
  const token = await getCookies();

  try {
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
  } catch (error: any) {
    return {
      error: error?.message || "Failed to create match",
    } as MatchResponse;
  }
};
export const updateMatchRules = async (
  matchId: string,
  params: MatchRuleParams,
): Promise<MatchRuleResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<MatchRuleResponse>(
      `/matches/${matchId}/rules`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(params),
      },
    );

    return response;
  } catch (error: any) {
    return {
      error: error?.message || "Failed to update match rules",
    } as MatchRuleResponse;
  }
};
