"use server";
import { apiClient } from "@/lib/api-client";
import { getCookies } from "./helper";
import { GroupsResponse } from "@/types/group";

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
