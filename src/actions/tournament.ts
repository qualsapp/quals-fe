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
};

export const createTournament = async (
  eventId: string,
  params: TournamentParams,
): Promise<TournamentResponse> => {
  const token = await getCookies();

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
};

export const updateTournament = async (
  tournamentId: string,
  params: TournamentParams,
): Promise<TournamentResponse> => {
  const token = await getCookies();

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
};

export const deleteTournament = async (
  tournamentId: string,
): Promise<{ message: string }> => {
  const token = await getCookies();

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
};

export const joinTournament = async (
  tournamentId: string,
  params: JoinTournamentParams,
): Promise<JoinTournamentResponse> => {
  const token = await getCookies();

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
};

export const getTournamentParticipants = async (
  tournamentId: string,
  filters: FilterParams,
): Promise<ParticipantsResponse> => {
  const token = await getCookies();

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
};

export const createGroupTournament = async (
  tournamentId: string,
  params: TournamentGroupParams,
): Promise<TournamentGroupsResponse> => {
  const token = await getCookies();

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
};

export const deleteTournamentParticipant = async (
  tournamentId: string,
  participantId: string,
): Promise<{ message: string }> => {
  const token = await getCookies();

  const response = await apiClient<Promise<{ message: string }>>(
    `/tournaments/${tournamentId}/participants/${participantId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  return response;
};

export const getBrackets = async (
  tournamentId: string,
): Promise<BracketsResponse> => {
  const token = await getCookies();

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
};
