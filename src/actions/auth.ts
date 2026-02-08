"use server";

import { apiClient } from "@/lib/api-client";
import { AuthResponse, LoginParams } from "@/types/auth";

export const login = async (
  credentials: LoginParams,
): Promise<AuthResponse> => {
  const response = await apiClient<AuthResponse>("/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  return response;
};

export const register = async (
  credentials: LoginParams,
): Promise<AuthResponse> => {
  const response = await apiClient<AuthResponse>("/users/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  return response;
};
