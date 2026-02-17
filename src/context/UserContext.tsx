"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

import { AuthState, useAuthStore } from "@/store/useAuthStore";
import { logout as onLogout } from "@/actions/auth";

const UserContext = createContext<AuthState | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthStore();

  const handleLogout = useCallback(async () => {
    const res = await onLogout();
    if (res.success) {
      auth.logout();
      window.location.href = "/login";
    }
  }, [auth]);

  // Use useEffect for operations that run after initial render, like fetching data or checking localStorage
  useEffect(() => {
    // Example: Fetch user data from an API or check local storage on mount
    const fetchUserData = async () => {
      // Your data fetching logic here
    };

    fetchUserData();
  }, []);

  const contextValue = {
    ...auth,
    logout: handleLogout,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

// Custom hook to easily consume the context in components
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
