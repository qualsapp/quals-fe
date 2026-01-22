"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { UserProfile } from "@/types/user";
import { AuthState, useAuthStore } from "@/store/useAuthStore";
import { userService } from "@/services/user-service";
import { hostService } from "@/services/host-service";
import { useQuery } from "@tanstack/react-query";

const UserContext = createContext<Partial<AuthState> | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, logout, user, loading, setLoading, setUser } =
    useAuthStore();

  const handleLogout = useCallback(async () => {
    const res = await userService.logout();
    if (res.success) {
      logout();
    }
  }, []);

  // const { data: profile } = useQuery({
  //   queryKey: ["profile"],
  //   queryFn: async () => await hostService.getProfile(),
  // });

  // Use useEffect for operations that run after initial render, like fetching data or checking localStorage
  useEffect(() => {
    // Example: Fetch user data from an API or check local storage on mount
    const fetchUserData = async () => {
      // Your data fetching logic here
      // For example:
      // const response = await hostService.getProfile();
      // if (response) {
      //   setUser(response);
      // }
      // setLoading(false);
    };

    fetchUserData();
  }, []);

  const contextValue = {
    user,
    loading,
    logout: handleLogout,
    isAuthenticated,
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
