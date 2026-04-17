"use server";

import { apiClient } from "@/lib/api-client";
import { CommunityListResponse, CommunityResponse } from "@/types/community";
import { errorResponseHandler } from "@/lib/error-handler";

export const getCommunities = async (): Promise<CommunityListResponse> => {
  try {
    const response = await apiClient<CommunityListResponse>("/communities", {
      method: "GET",
    });

    return response;
  } catch (error: Response | Error | unknown) {
    return errorResponseHandler<CommunityListResponse>(
      error,
      "Failed to fetch communities",
    );
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
  } catch (error: Response | Error | unknown) {
    return errorResponseHandler<CommunityResponse>(
      error,
      "Failed to fetch community details",
    );
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
  } catch (error: Response | Error | unknown) {
    return errorResponseHandler<CommunityResponse>(
      error,
      "Failed to create community",
    );
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
  } catch (error: Response | Error | unknown) {
    return errorResponseHandler<CommunityResponse>(
      error,
      "Failed to update community",
    );
  }
};
