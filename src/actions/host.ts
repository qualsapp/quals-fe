"use server";

import { apiClient } from "@/lib/api-client";
import { HostDetailResponse, HostProfileResponse } from "@/types/host";
import { cookies } from "next/headers";
import { getCookies } from "./helper";

export const getHostDetails = async (): Promise<HostDetailResponse> => {
  const token = await getCookies();

  const response = await apiClient<HostDetailResponse>("/hosts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  return response;
};

export const getHostProfile = async (): Promise<HostProfileResponse> => {
  const token = await getCookies();

  const response = await apiClient<HostProfileResponse>("/hosts/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  console.log("profile", response);

  return response;
};

export const createHostDetails = async (
  formData: FormData,
): Promise<HostDetailResponse> => {
  const token = await getCookies();

  const response = await apiClient<HostDetailResponse>("/hosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
    body: formData,
  });

  return response;
};
