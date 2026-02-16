"use server";
import { apiClient } from "@/lib/api-client";
import { getCookies } from "./helper";
import {
  BracketsResponse,
  JoinTournamentParams,
  JoinTournamentResponse,
  ParticipantsResponse,
  TournamentGroupParams,
  TournamentGroupsResponse,
  TournamentParams,
  TournamentResponse,
} from "@/types/tournament";
import { FilterParams } from "@/types/global";

export const getTournament = async (
  tournamentId: string,
): Promise<TournamentResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<TournamentResponse>(
      `/tournaments/${tournamentId}`,
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
      id: "",
      event_id: "",
      format: "",
      category: "",
      participants_count: 0,
      courts_count: 0,
      match_rule: {} as any,
      tournament_brackets: [],
      tournament_groups: [],
      error: error?.message || "Failed to fetch tournament",
    } as TournamentResponse;
  }
};

export const createTournament = async (
  eventId: string,
  params: TournamentParams,
): Promise<TournamentResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<TournamentResponse>(
      `/events/${eventId}/tournaments`,
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
      error: error?.message || "Failed to create tournament",
    } as TournamentResponse;
  }
};

export const updateTournament = async (
  tournamentId: string,
  params: TournamentParams,
): Promise<TournamentResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<TournamentResponse>(
      `/tournaments/${tournamentId}`,
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
      error: error?.message || "Failed to update tournament",
    } as TournamentResponse;
  }
};

export const deleteTournament = async (
  tournamentId: string,
): Promise<{ message: string; error?: string }> => {
  const token = await getCookies();

  try {
    const response = await apiClient<{ message: string }>(
      `/tournaments/${tournamentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    return {
      message: "",
      error: error?.message || "Failed to delete tournament",
    };
  }
};

export const joinTournament = async (
  tournamentId: string,
  params: JoinTournamentParams,
): Promise<JoinTournamentResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<JoinTournamentResponse>(
      `/tournaments/${tournamentId}/join`,
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
      error: error?.message || "Failed to join tournament",
    } as JoinTournamentResponse;
  }
};

export const getTournamentParticipants = async (
  tournamentId: string,
  filters: FilterParams,
): Promise<ParticipantsResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<ParticipantsResponse>(
      `/tournaments/${tournamentId}/participants`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
        params: filters,
      },
    );

    return response;
  } catch (error: any) {
    return {
      participants: [],
      page: 0,
      page_size: 0,
      total: 0,
      error: error?.message || "Failed to fetch participants",
    };
  }
};

export const createGroupTournament = async (
  tournamentId: string,
  params: TournamentGroupParams,
): Promise<TournamentGroupsResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<TournamentGroupsResponse>(
      `/tournaments/${tournamentId}/group_participants`,
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
      error: error?.message || "Failed to create group",
    } as TournamentGroupsResponse;
  }
};

export const deleteTournamentParticipant = async (
  tournamentId: string,
  participantId: string,
): Promise<{ message: string; error?: string }> => {
  const token = await getCookies();

  try {
    const response = await apiClient<{ message: string }>(
      `/tournaments/${tournamentId}/participants/${participantId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    return {
      message: "",
      error: error?.message || "Failed to delete participant",
    };
  }
};

export const getBrackets = async (
  tournamentId: string,
): Promise<BracketsResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<BracketsResponse>(
      `/tournaments/${tournamentId}/brackets`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error("Failed to fetch brackets:", error);
    return [] as BracketsResponse;
  }
};
