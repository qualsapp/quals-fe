"use server";

import { apiClient } from "@/lib/api-client";
import { HostDetailResponse, HostProfileResponse } from "@/types/host";
import { errorResponseHandler } from "@/lib/error-handler";
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
  } catch (error: Response | Error | unknown) {
    return errorResponseHandler<HostDetailResponse>(
      error,
      "Failed to fetch host details",
    );
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

    console.log(response);

    return response;
  } catch (error: Response | Error | unknown) {
    console.log(error);
    return errorResponseHandler<HostDetailResponse>(
      error,
      "Failed to fetch host details",
    );
  }
};

export const createHostDetails = async (
  formData: FormData,
): Promise<HostDetailResponse> => {
  try {
    const response = await apiClient<HostDetailResponse>("/hosts", {
      method: "POST",
      body: formData,
    });

    return response;
  } catch (error: Response | Error | unknown) {
    console.error("Create host details failed:", error);
    return errorResponseHandler<HostDetailResponse>(
      error,
      "Failed to create host details",
    );
  }
};
