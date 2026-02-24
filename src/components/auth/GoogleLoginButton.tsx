"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Google } from "@/icons";
import { loginWithGoogle } from "@/actions/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function GoogleLoginButton() {
  const router = useRouter();
  const setLogin = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        setIsLoading(true);
        const response = await loginWithGoogle(codeResponse.code);

        if (response.error) {
          toast.error(response.error);
        } else if (response.token) {
          // Assume backend returns user data in slightly different format, or we need to refetch profile
          // The useAuthStore login function accepts token and user object
          // Since auth action sets the cookie, we could redirect and let providers sync, or just redirect
          toast.success("Successfully logged in with Google!");
          router.push("/");
          router.refresh();
        }
      } catch (error) {
        toast.error("An error occurred during Google Login");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Google Login Error", errorResponse);
      toast.error("Failed to connect to Google");
    },
  });

  return (
    <Button
      variant="outline"
      size="lg"
      className="py-6"
      onClick={() => login()}
      disabled={isLoading}
      type="button"
    >
      <Google />
      {isLoading ? "Loading..." : "Google"}
    </Button>
  );
}
