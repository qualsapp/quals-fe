"use server";
import { apiClient } from "@/lib/api-client";

import {
  JoinCommunityResponse,
  PlayerDetailResponse,
  PlayerListResponse,
} from "@/types/player";
import { getCookies } from "./helper";

export const getPlayerDetails = async (): Promise<PlayerDetailResponse> => {
  const token = await getCookies();

  const response = await apiClient<PlayerDetailResponse>("/players", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  return response;
};

export const searchPlayer = async (
  search: string,
): Promise<PlayerListResponse> => {
  const token = await getCookies();

  const response = await apiClient<PlayerListResponse>(`/players/search`, {
    params: {
      q: search,
    },
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  return response;
};

export const createPlayerDetails = async (
  formData: FormData,
): Promise<PlayerDetailResponse> => {
  const token = await getCookies();

  const response = await apiClient<PlayerDetailResponse>("/players/details", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
    body: formData,
  });

  return response;
};

export const joinCommunity = async (
  communityId: string,
): Promise<JoinCommunityResponse> => {
  const token = await getCookies();

  const response = await apiClient<JoinCommunityResponse>(
    `/players/communities/${communityId}/join`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  return response;
};
