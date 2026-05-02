"use server";

import { apiClient } from "@/lib/api-client";
import { TokenExpirationDays } from "@/lib/env";
import { errorResponseHandler } from "@/lib/error-handler";
import { AuthResponse, LoginByGoogleParams, LoginParams } from "@/types/auth";
import { cookies } from "next/headers";

export const login = async (
  credentials: LoginParams,
): Promise<AuthResponse> => {
  const cookieStore = await cookies();
  try {
    const response = await apiClient<AuthResponse>("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    console.log(response);

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
  } catch (error: Response | Error | unknown) {
    console.error("Login failed:", error);
    return errorResponseHandler<AuthResponse>(error, "Failed to login");
  }
};

export const register = async (
  credentials: LoginParams,
): Promise<AuthResponse> => {
  const cookieStore = await cookies();
  try {
    const response = await apiClient<AuthResponse>("/users/register", {
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
  } catch (error: Response | Error | unknown) {
    console.error("Register failed:", error);
    return errorResponseHandler<AuthResponse>(error, "Failed to register");
  }
};

export const logout = async (): Promise<{ success: boolean }> => {
  try {
    const cookieStore = await cookies();

    cookieStore.delete("token");
    cookieStore.delete("user_type");

    return { success: true };
  } catch (error: Response | Error | unknown) {
    console.error("Logout failed:", error);
    return { success: false };
  }
};

export const checkTokenCookie = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  return cookieStore.has("token");
};

export const loginWithGoogle = async (
  params: LoginByGoogleParams,
): Promise<AuthResponse> => {
  const cookieStore = await cookies();
  try {
    const response = await apiClient<AuthResponse>("/users/login/google", {
      method: "POST",
      body: JSON.stringify(params),
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
  } catch (error: Response | Error | unknown) {
    return errorResponseHandler<AuthResponse>(
      error,
      "Failed to login with Google",
    );
  }
};
