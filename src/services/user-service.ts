import { apiClient, internalApiClient } from "@/lib/api-client";
import { User, UserProfile, UserProps } from "@/types/user";

export const userService = {
  // Fetch all users
  getAll: async () => {
    return apiClient<User[]>("/users", {
      next: { revalidate: 3600 }, // Revalidate cache every hour
    });
  },

  // Get single user
  getById: async (id: string) => {
    return apiClient<User>(`/users/${id}`);
  },

  // Create user (Mutation)
  register: async (userData: UserProps) => {
    return internalApiClient<User>("/api/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Login (Mutation)
  login: async (userData: UserProps) => {
    return internalApiClient<User>("/api/login", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
  // Edit Profile (Mutation)
  edit: async (userProfileData: Partial<UserProfile>) => {
    return apiClient<UserProfile>("/users/edit", {
      method: "PUT",
      body: JSON.stringify(userProfileData),
    });
  },
};
