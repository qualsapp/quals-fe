import { apiClient } from "@/lib/api-client";
import { getCookies } from "./helper";
import {
  ParticipantsResponse,
  TournamentGroupParams,
  TournamentGroupsResponse,
  TournamentParams,
  TournamentResponse,
} from "@/types/tournament";
import { FilterParams } from "@/types/global";

export const getTournament = async (
  communityId: string,
  eventId: string,
  tournamentId: string,
): Promise<TournamentResponse> => {
  const token = await getCookies();

  const response = await apiClient<TournamentResponse>(
    `/communities/${communityId}/events/${eventId}/tournaments/${tournamentId}`,
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
  communityId: string,
  eventId: string,
  params: TournamentParams,
): Promise<TournamentResponse> => {
  const token = await getCookies();

  const response = await apiClient<TournamentResponse>(
    `/communities/${communityId}/events/${eventId}/tournaments`,
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
  communityId: string,
  eventId: string,
  tournamentId: string,
  params: TournamentParams,
): Promise<TournamentResponse> => {
  const token = await getCookies();

  const response = await apiClient<TournamentResponse>(
    `/communities/${communityId}/events/${eventId}/tournaments/${tournamentId}`,
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
  communityId: string,
  eventId: string,
  tournamentId: string,
): Promise<{ message: string }> => {
  const token = await getCookies();

  const response = await apiClient<{ message: string }>(
    `/communities/${communityId}/events/${eventId}/tournaments/${tournamentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  return response;
};

export const getTournamentParticipants = async (
  communityId: string,
  eventId: string,
  tournamentId: string,
  filters: FilterParams,
): Promise<ParticipantsResponse> => {
  const token = await getCookies();

  const response = await apiClient<ParticipantsResponse>(
    `/communities/${communityId}/events/${eventId}/tournaments/${tournamentId}/participants`,
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
  communityId: string,
  eventId: string,
  tournamentId: string,
  params: TournamentGroupParams,
): Promise<TournamentGroupsResponse> => {
  const token = await getCookies();

  const response = await apiClient<TournamentGroupsResponse>(
    `/communities/${communityId}/events/${eventId}/tournaments/${tournamentId}/group_participants`,
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
  communityId: string,
  eventId: string,
  tournamentId: string,
  participantId: string,
): Promise<{ message: string }> => {
  const token = await getCookies();

  const response = await apiClient<Promise<{ message: string }>>(
    `/communities/${communityId}/events/${eventId}/tournaments/${tournamentId}/participants/${participantId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  return response;
};
