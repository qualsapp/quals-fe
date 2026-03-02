"use server";

import { apiClient } from "@/lib/api-client";
import { CommunityListResponse, CommunityResponse } from "@/types/community";
import { errorHandler } from "@/lib/error-handler";

export const getCommunities = async (): Promise<CommunityListResponse> => {
  try {
    const response = await apiClient<CommunityListResponse>("/communities", {
      method: "GET",
    });

    return response;
  } catch (error: unknown) {
    return {
      communities: [],
      page: 0,
      page_size: 0,
      total: 0,
      error: errorHandler(error, "Failed to fetch communities"),
    };
  }
};

export const getCommunity = async (
  communityId: string,
): Promise<CommunityResponse> => {
  try {
    const response = await apiClient<CommunityResponse>(
      `/communities/${communityId}`,
      {
        method: "GET",
      },
    );

    return response;
  } catch (error: unknown) {
    return {
      id: "",
      image_url: "",
      host_id: "",
      sport_types: [],
      name: "",
      address: "",
      error: errorHandler(error, "Failed to fetch community details"),
    } as CommunityResponse;
  }
};

export const createCommunity = async (
  formData: FormData,
): Promise<CommunityResponse> => {
  try {
    const response = await apiClient<CommunityResponse>("/communities/", {
      method: "POST",
      body: formData,
    });

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to create community"),
    } as CommunityResponse;
  }
};

export const updateCommunity = async (
  formData: FormData,
  communityId: string,
): Promise<CommunityResponse> => {
  try {
    const response = await apiClient<CommunityResponse>(
      `/communities/${communityId}`,
      {
        method: "PUT",
        body: formData,
      },
    );

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to update community"),
    } as CommunityResponse;
  }
};
