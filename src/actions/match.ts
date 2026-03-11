"use server";
import { apiClient } from "@/lib/api-client";
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
  try {
    const response = await apiClient<MatchesResponse>(`/matches`, {
      params: filters,
      method: "GET",
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
  try {
    const response = await apiClient<MatchResponse>(`/matches/${matchId}`, {
      method: "GET",
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
  try {
    const response = await apiClient<MatchResponse>(
      `/tournament_brackets/${bracketId}/matches`,
      {
        method: "POST",
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
  try {
    const response = await apiClient<MatchRuleResponse>(
      `/matches/${matchId}/rules`,
      {
        method: "PUT",
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
  try {
    const response = await apiClient<MatchResponse>(
      `/matches/${matchId}/sets`,
      {
        method: "POST",
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
  try {
    const response = await apiClient<MatchResponse>(
      `/matches/${matchId}/sets/${setId}`,
      {
        method: "PUT",
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

export const decreaseMatchScore = async (
  matchId: string,
  setId: string,
  params: MatchSetParams,
): Promise<MatchResponse> => {
  try {
    const response = await apiClient<MatchResponse>(
      `/matches/${matchId}/sets/${setId}/decrease`,
      {
        method: "PATCH",
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

export const tiebreakActivation = async (
  matchId: string,
  setId: string,
): Promise<MatchResponse> => {
  try {
    const response = await apiClient<MatchResponse>(
      `/matches/${matchId}/sets/${setId}/tiebreak`,
      {
        method: "POST",
      },
    );

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to activate tiebreak"),
    } as MatchResponse;
  }
};

export const activeDeuceApi = async (
  matchId: string,
  setId: string,
  params: { enabled: boolean },
): Promise<MatchResponse> => {
  try {
    const response = await apiClient<MatchResponse>(
      `/matches/${matchId}/sets/${setId}/deuce`,
      {
        method: "POST",
        body: JSON.stringify(params),
      },
    );

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to activate deuce"),
    } as MatchResponse;
  }
};
export const finishMatchApi = async (
  matchId: string,
  params: { condition: string; winner_side?: string },
): Promise<MatchResponse> => {
  try {
    const response = await apiClient<MatchResponse>(
      `/matches/${matchId}/finish`,
      {
        method: "POST",
        body: JSON.stringify(params),
      },
    );

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to end match"),
    } as MatchResponse;
  }
};
