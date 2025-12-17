import { apiClient, internalApiClient } from "@/lib/api-client";
import { CommunityProps, CommunityResponse } from "@/types/community";
import { User, UserProfile, UserProps } from "@/types/user";

export const communityService = {
  // Fetch all users
  getAll: async () => {
    return apiClient<User[]>("/users", {
      next: { revalidate: 3600 }, // Revalidate cache every hour
    });
  },

  // Get single user
  getById: async (id: string, option: RequestInit) => {
    return apiClient<CommunityResponse>(`/communities/${id}`, option);
  },

  // Create user (Mutation)
  create: async (userData: CommunityProps) => {
    return internalApiClient<CommunityResponse>("/api/community", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
  // Update user (Mutation)
  update: async (id: string, userData: CommunityProps) => {
    return internalApiClient<CommunityResponse>(`/api/community/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },
};
