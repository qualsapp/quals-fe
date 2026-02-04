import { apiClient, internalApiClient } from "@/lib/api-client";
import {
  CommunityListResponse,
  CommunityProps,
  CommunityResponse,
} from "@/types/community";
import { User, UserProfile, UserProps } from "@/types/user";

export const communityService = {
  // Fetch all users
  getAll: async (token: string) => {
    return apiClient<CommunityListResponse>("/communities", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 }, // Revalidate cache every hour
    });
  },

  // Get single user
  getById: async (id: string, option: RequestInit) => {
    return apiClient<CommunityResponse>(`/communities/${id}`, option);
  },

  // Create user (Mutation)
  create: async (userData: FormData) => {
    return internalApiClient<CommunityResponse>("/api/communities", {
      method: "POST",
      body: userData,
    });
  },
  // Update user (Mutation)
  update: async (id: string, userData: FormData) => {
    return internalApiClient<CommunityResponse>(`/api/communities/${id}`, {
      method: "PUT",
      body: userData,
    });
  },
};
