"use server";

import { apiClient } from "@/lib/api-client";
import { ApiUrl } from "@/lib/env";
import { HostDetailResponse, HostProfileResponse } from "@/types/host";
import { getCookies } from "./helper";

export const getHostDetails = async (): Promise<HostDetailResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<HostDetailResponse>("/hosts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    return response;
  } catch (error: any) {
    return {
      error: error?.message || "Failed to fetch host details",
    };
  }
};

export const getHostProfile = async (): Promise<HostProfileResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<HostProfileResponse>("/hosts/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    return response;
  } catch (error: any) {
    return {
      error: error?.message || "Failed to fetch host profile",
    };
  }
};

export const createHostDetails = async (
  formData: FormData,
): Promise<HostDetailResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<HostDetailResponse>("/hosts/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      body: formData,
    });

    return response;
  } catch (error: any) {
    return {
      error: error?.message || "Failed to create host details",
    };
  }
};
