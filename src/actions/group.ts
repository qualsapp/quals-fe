"use server";
import { apiClient } from "@/lib/api-client";
import { getCookies } from "./helper";
import { GroupResponse, GroupsResponse } from "@/types/group";

export const getGroups = async (
  tournamentId: string,
): Promise<GroupsResponse> => {
  const token = await getCookies();

  const response = await apiClient<GroupsResponse>(
    `/tournaments/${tournamentId}/groups`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  return response;
};

export const createGroupParticipants = async (
  groupId: string,
  params: {
    participant_ids: number[];
  },
): Promise<GroupResponse> => {
  const token = await getCookies();

  const response = await apiClient<GroupResponse>(
    `/tournament_groups/${groupId}/participants`,
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
