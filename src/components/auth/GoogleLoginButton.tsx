"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Google } from "@/icons";
import { loginWithGoogle } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { LoginByGoogleParams } from "@/types/auth";

type Props = {
  userType: "host" | "player";
};

export default function GoogleLoginButton({ userType }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        setIsLoading(true);
        const params: LoginByGoogleParams = {
          code: codeResponse.code,
          redirect_uri: window.location.origin,
          user_type: userType,
        };
        const response = await loginWithGoogle(params);
        console.log(response);

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
        console.error(error);
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
      {isLoading ? "Loading..." : `Login with Google as ${userType}`}
    </Button>
  );
}
