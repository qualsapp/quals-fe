import { apiClient } from "@/lib/api-client";
import { getCookies } from "./helper";
import { CommunityListResponse, CommunityResponse } from "@/types/community";

export const getCommunities = async (): Promise<CommunityListResponse> => {
  const token = await getCookies();

  const response = await apiClient<CommunityListResponse>("/communities", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  return response;
};

export const getCommunity = async (
  communityId: string,
): Promise<CommunityResponse> => {
  const token = await getCookies();

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
};

export const createCommunity = async (
  formData: FormData,
): Promise<CommunityResponse> => {
  const token = await getCookies();

  const response = await apiClient<CommunityResponse>("/communities", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
    body: formData,
  });

  return response;
};

export const updateCommunity = async (
  formData: FormData,
  communityId: string,
): Promise<CommunityResponse> => {
  const token = await getCookies();

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
};
