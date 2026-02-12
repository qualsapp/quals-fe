"use server";

import { apiClient } from "@/lib/api-client";
import { TokenExpirationDays } from "@/lib/env";
import { AuthResponse, LoginParams } from "@/types/auth";
import { cookies } from "next/headers";

export const login = async (
  credentials: LoginParams,
): Promise<AuthResponse> => {
  const cookieStore = await cookies();
  const response = await apiClient<AuthResponse>("/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (response.token) {
    cookieStore.set("token", response.token, {
      path: "/",
      expires: new Date(
        Date.now() + Number(TokenExpirationDays) * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    if (response.user_type) {
      cookieStore.set("user_type", response.user_type, {
        path: "/",
        expires: new Date(
          Date.now() + Number(TokenExpirationDays) * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
  }

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

export const logout = async (): Promise<{ success: boolean }> => {
  const cookie = await cookies();
  cookie.delete("token");
  cookie.delete("user_type");

  return { success: true };
};
