"use server";
import { apiClient } from "@/lib/api-client";
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
import { errorHandler, errorResponseHandler } from "@/lib/error-handler";

export const getTournament = async (
  tournamentId: string,
): Promise<TournamentResponse> => {
  try {
    const response = await apiClient<TournamentResponse>(
      `/tournaments/${tournamentId}`,
      {
        method: "GET",
      },
    );

    return response;
  } catch (error: Response | Error | unknown) {
    return errorResponseHandler<TournamentResponse>(
      error,
      "Failed to fetch tournament details",
    );
  }
};

export const createTournament = async (
  eventId: string,
  params: TournamentParams,
): Promise<TournamentResponse> => {
  try {
    const response = await apiClient<TournamentResponse>(
      `/events/${eventId}/tournaments`,
      {
        method: "POST",

        body: JSON.stringify(params),
      },
    );

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to create tournament"),
    } as TournamentResponse;
  }
};

export const updateTournament = async (
  tournamentId: string,
  params: TournamentParams,
): Promise<TournamentResponse> => {
  try {
    const response = await apiClient<TournamentResponse>(
      `/tournaments/${tournamentId}`,
      {
        method: "PUT",

        body: JSON.stringify(params),
      },
    );

    return response;
  } catch (error: Response | Error | unknown) {
    return errorResponseHandler<TournamentResponse>(
      error,
      "Failed to update tournament",
    );
  }
};

export const deleteTournament = async (
  tournamentId: string,
): Promise<{ message: string; error?: string }> => {
  try {
    const response = await apiClient<{ message: string }>(
      `/tournaments/${tournamentId}`,
      {
        method: "DELETE",
      },
    );

    return response;
  } catch (error: Response | Error | unknown) {
    return errorResponseHandler<{ message: string }>(
      error,
      "Failed to delete tournament",
    );
  }
};

export const joinTournament = async (
  tournamentId: string,
  params: JoinTournamentParams,
): Promise<JoinTournamentResponse> => {
  try {
    const response = await apiClient<JoinTournamentResponse>(
      `/tournaments/${tournamentId}/join`,
      {
        method: "POST",

        body: JSON.stringify(params),
      },
    );

    return response;
  } catch (error: Response | Error | unknown) {
    return errorResponseHandler<JoinTournamentResponse>(
      error,
      "Failed to join tournament",
    );
  }
};

export const getTournamentParticipants = async (
  tournamentId: string,
  filters: FilterParams,
): Promise<ParticipantsResponse> => {
  try {
    const response = await apiClient<ParticipantsResponse>(
      `/tournaments/${tournamentId}/participants`,
      {
        method: "GET",

        params: filters,
      },
    );

    return response;
  } catch (error: Response | Error | unknown) {
    return errorResponseHandler<ParticipantsResponse>(
      error,
      "Failed to fetch tournament participants",
    );
  }
};

export const createGroupTournament = async (
  tournamentId: string,
  params: TournamentGroupParams,
): Promise<TournamentGroupsResponse> => {
  try {
    const response = await apiClient<TournamentGroupsResponse>(
      `/tournaments/${tournamentId}/group_participants`,
      {
        method: "POST",

        body: JSON.stringify(params),
      },
    );

    return response;
  } catch (error: Response | Error | unknown) {
    return errorResponseHandler<TournamentGroupsResponse>(
      error,
      "Failed to create group tournament",
    );
  }
};

export const deleteTournamentParticipant = async (
  tournamentId: string,
  participantId: string,
): Promise<{ message: string; error?: string }> => {
  try {
    const response = await apiClient<{ message: string }>(
      `/tournaments/${tournamentId}/participants/${participantId}`,
      {
        method: "DELETE",
      },
    );

    return response;
  } catch (error: Response | Error | unknown) {
    return errorResponseHandler<{ message: string }>(
      error,
      "Failed to delete tournament participant",
    );
  }
};

export const getBrackets = async (
  tournamentId: string,
): Promise<BracketsResponse> => {
  try {
    const response = await apiClient<BracketsResponse>(
      `/tournaments/${tournamentId}/brackets`,
      {
        method: "GET",
      },
    );

    return response;
  } catch (error: Response | Error | unknown) {
    return errorResponseHandler<BracketsResponse>(
      error,
      "Failed to fetch tournament brackets",
    );
  }
};
