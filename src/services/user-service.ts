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

  // Get single user
  getByUsername: async (username: string) => {
    return internalApiClient<User>(`/api/users/${username}`);
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
      body: JSON.stringify({ ...userData, user_type: "host" }),
    });
  },

  // Login (Mutation)
  logout: async () => {
    return internalApiClient<{ success: boolean }>("/api/logout", {
      method: "POST",
    });
  },

  // Create Player Details (Mutation)
  create: async (formData: FormData) => {
    return internalApiClient<UserProfile>("/players", {
      method: "POST",
      body: formData,
    });
  },

  // Edit Profile (Mutation)
  edit: async (userProfileData: FormData) => {
    return apiClient<UserProfile>("/users/edit", {
      method: "PUT",
      body: userProfileData,
    });
  },
};
