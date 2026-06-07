"use server";

import { apiClient } from "@/lib/api-client";
import { TokenExpirationDays } from "@/lib/env";
import { errorResponseHandler } from "@/lib/error-handler";
import { AuthResponse, LoginByGoogleParams, LoginParams } from "@/types/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (
  credentials: LoginParams,
): Promise<AuthResponse> => {
  const cookieStore = await cookies();
  try {
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

export const logout = async (): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.delete("token");
  cookieStore.delete("user_type");

  // Redirect server-side so the current route is NOT re-rendered after the
  // action (a Server Action auto-revalidates its origin route). Without this,
  // the page we're on refetches its data with the token already gone → 401.
  redirect("/login");
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
