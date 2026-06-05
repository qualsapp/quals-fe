"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { AuthState, useAuthStore } from "@/store/useAuthStore";
import { logout as onLogout, checkTokenCookie } from "@/actions/auth";
import { getPlayerDetails } from "@/actions/player";
import { getHostDetails } from "@/actions/host";

const UserContext = createContext<AuthState | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const {
    user,
    player,
    host,
    setPlayer,
    setHost,
    logout: storeLogout,
  } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || !user) return;
    checkTokenCookie().then((hasToken) => {
      if (!hasToken) storeLogout();
    });
  }, [isHydrated, user, storeLogout]);

  const handleLogout = useCallback(async () => {
    const res = await onLogout();
    if (res.success) {
      storeLogout();
      window.location.href = "/login";
    }
  }, [storeLogout]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user?.user_type === "player" && !player) {
          const res = await getPlayerDetails();
          if (!res.error) {
            setPlayer(res);
          } else if (res.status === 401) {
            storeLogout();
          }
        } else if (user?.user_type === "host" && !host) {
          const res = await getHostDetails();
          if (!res.error) {
            setHost(res);
          } else if (res.status === 401) {
            storeLogout();
          }
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    if (isHydrated && user?.user_type) {
      fetchUserDetails();
    }
  }, [isHydrated, user?.user_type, player, host, setPlayer, setHost, storeLogout]);

  if (!isHydrated) {
    return null;
  }

  const contextValue: AuthState = {
    ...useAuthStore.getState(), // Spread the current state to keep compatibility with AuthState interface
    user,
    player,
    host,
    setPlayer,
    setHost,
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
