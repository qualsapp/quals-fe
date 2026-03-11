"use server";

import { apiClient } from "@/lib/api-client";
import { HostDetailResponse, HostProfileResponse } from "@/types/host";
import { errorHandler } from "@/lib/error-handler";
import { ApiResponse } from "@/types/global";

export const getHostDetails = async (): Promise<
  ApiResponse<HostDetailResponse>
> => {
  try {
    const response = await apiClient<ApiResponse<HostDetailResponse>>(
      "/hosts",
      {
        method: "GET",
      },
    );

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to fetch host details"),
    } as ApiResponse<HostDetailResponse>;
  }
};

export const getHostProfile = async (): Promise<
  ApiResponse<HostProfileResponse>
> => {
  try {
    const response = await apiClient<ApiResponse<HostProfileResponse>>(
      "/hosts/profile",
      {
        method: "GET",
      },
    );

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to fetch host profile"),
    } as ApiResponse<HostProfileResponse>;
  }
};

export const createHostDetails = async (
  formData: FormData,
): Promise<HostDetailResponse> => {
  try {
    const response = await apiClient<HostDetailResponse>("/hosts/", {
      method: "POST",
      body: formData,
    });

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to create host details"),
    };
  }
};
