import { internalApiClient } from "@/lib/api-client";
import { HostModel } from "@/types/user";

export const hostService = {
  // Edit Profile (Mutation)
  create: async (formData: FormData) => {
    console.log("Host Service - Create called with FormData:", formData);
    return internalApiClient<HostModel>("/api/hosts", {
      method: "POST",
      body: formData,
    });
  },
};
