import { apiClient, internalApiClient } from "@/lib/api-client";

import { HostModel, HostProfileModel } from "@/types/user";

export const hostServices = {
  // Edit Profile (Mutation)
  create: async (formData: FormData) => {
    console.log("Host Service - Create called with FormData:", formData);
    return internalApiClient<HostModel>("/api/hosts", {
      method: "POST",
      body: formData,
    });
  },
  // Get Profile (Query)
  getProfile: async (token: string) => {
    return await apiClient<HostProfileModel>("/hosts/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
