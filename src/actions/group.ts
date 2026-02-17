"use server";
import { apiClient } from "@/lib/api-client";
import { getCookies } from "./helper";
import { GroupResponse, GroupsResponse } from "@/types/group";
import { errorHandler } from "@/lib/error-handler";

export const getGroups = async (
  tournamentId: string,
): Promise<GroupsResponse> => {
  const token = await getCookies();

  try {
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
  } catch (error: unknown) {
    // GroupsResponse is an array, so we return empty array on error
    console.error(errorHandler(error, "Failed to fetch groups"));
    return [] as GroupsResponse;
  }
};

export const createGroupParticipants = async (
  groupId: string,
  params: {
    participant_ids: number[];
  },
): Promise<GroupResponse> => {
  const token = await getCookies();

  try {
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
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to create group participants"),
    } as GroupResponse;
  }
};
