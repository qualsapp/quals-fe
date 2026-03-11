"use server";
import { apiClient } from "@/lib/api-client";

import {
  JoinCommunityResponse,
  PlayerDetailResponse,
  PlayerListResponse,
} from "@/types/player";
import { errorHandler } from "@/lib/error-handler";
import { ApiResponse } from "@/types/global";

export const getPlayerDetails = async (): Promise<
  ApiResponse<PlayerDetailResponse>
> => {
  try {
    const response = await apiClient<ApiResponse<PlayerDetailResponse>>(
      "/players",
      {
        method: "GET",
      },
    );

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to fetch player details"),
    } as ApiResponse<PlayerDetailResponse>;
  }
};

export const searchPlayer = async (
  search: string,
): Promise<PlayerListResponse> => {
  try {
    const response = await apiClient<PlayerListResponse>(`/players/search`, {
      params: {
        q: search,
      },
      method: "GET",
    });

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to search players"),
    };
  }
};

export const createPlayerDetails = async (
  formData: FormData,
): Promise<PlayerDetailResponse> => {
  try {
    const response = await apiClient<PlayerDetailResponse>("/players/", {
      method: "POST",
      body: formData,
    });

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to create player details"),
    } as PlayerDetailResponse;
  }
};

export const joinCommunity = async (
  communityId: string,
): Promise<JoinCommunityResponse> => {
  try {
    const response = await apiClient<JoinCommunityResponse>(
      `/players/communities/${communityId}/join`,
      {
        method: "POST",
      },
    );

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to join community"),
    } as JoinCommunityResponse;
  }
};
