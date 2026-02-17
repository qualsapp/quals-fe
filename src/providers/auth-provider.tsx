"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const loginInState = useAuthStore((state) => state.login);

  useEffect(() => {
    async function getUser() {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data?.token && data?.user) {
        loginInState(data.token, data.user);
      }
    }
    getUser();
  }, [loginInState]);

  return children;
}
