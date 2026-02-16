"use server";

import { apiClient } from "@/lib/api-client";
import { getCookies } from "./helper";
import { CommunityListResponse, CommunityResponse } from "@/types/community";

export const getCommunities = async (): Promise<CommunityListResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<CommunityListResponse>("/communities", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    return response;
  } catch (error: any) {
    return {
      communities: [],
      page: 0,
      page_size: 0,
      total: 0,
      error: error?.message || "Failed to fetch communities",
    };
  }
};

export const getCommunity = async (
  communityId: string,
): Promise<CommunityResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<CommunityResponse>(
      `/communities/${communityId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    return {
      id: "",
      image_url: "",
      host_id: "",
      sport_types: [],
      name: "",
      address: "",
      error: error?.message || "Failed to fetch community details",
    } as CommunityResponse;
  }
};

export const createCommunity = async (
  formData: FormData,
): Promise<CommunityResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<CommunityResponse>("/communities/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      body: formData,
    });

    return response;
  } catch (error: any) {
    return {
      error: error?.message || "Failed to create community",
    } as CommunityResponse;
  }
};

export const updateCommunity = async (
  formData: FormData,
  communityId: string,
): Promise<CommunityResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<CommunityResponse>(
      `/communities/${communityId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
        body: formData,
      },
    );

    return response;
  } catch (error: any) {
    return {
      error: error?.message || "Failed to update community",
    } as CommunityResponse;
  }
};
