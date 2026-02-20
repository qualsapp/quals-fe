"use server";
import { apiClient } from "@/lib/api-client";
import { getCookies } from "./helper";
import {
  MatchesResponse,
  MatchParams,
  MatchResponse,
  MatchSetParams,
} from "@/types/match";
import { FilterParams } from "@/types/global";
import { MatchRuleParams, MatchRuleResponse } from "@/types/tournament";
import { errorHandler } from "@/lib/error-handler";

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
  } catch (error: unknown) {
    return {
      matches: [],
      page: 0,
      page_size: 0,
      total: 0,
      error: errorHandler(error, "Failed to fetch matches"),
    };
  }
};

export const getMatch = async (matchId: string): Promise<MatchResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<MatchResponse>(`/matches/${matchId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to fetch match details"),
    } as MatchResponse;
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
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to create match"),
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
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to update match rules"),
    } as MatchRuleResponse;
  }
};

export const createMatchSet = async (
  matchId: string,
  params: MatchSetParams,
): Promise<MatchResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<MatchResponse>(
      `/matches/${matchId}/sets`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(params),
      },
    );

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to create match"),
    } as MatchResponse;
  }
};

export const updateMatchSet = async (
  matchId: string,
  setId: string,
  params: MatchSetParams,
): Promise<MatchResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<MatchResponse>(
      `/matches/${matchId}/sets/${setId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(params),
      },
    );

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to create match"),
    } as MatchResponse;
  }
};
