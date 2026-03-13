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
import { logout as onLogout } from "@/actions/auth";
import { getPlayerDetails } from "@/actions/player";
import { getHostDetails } from "@/actions/host";

const UserContext = createContext<AuthState | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleLogout = useCallback(async () => {
    const res = await onLogout();
    if (res.success) {
      auth.logout();
      window.location.href = "/login";
    }
  }, [auth]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (auth.user?.user_type === "player") {
        await getPlayerDetails().then((res) => {
          if (!res.error) {
            auth.setPlayer(res);
          } else if (res.status === 401) {
            auth.logout();
          }
        });
      } else if (auth.user?.user_type === "host") {
        await getHostDetails().then((res) => {
          if (!res.error) {
            auth.setHost(res);
          } else if (res.status === 401) {
            auth.logout();
          }
        });
      } else {
        auth.logout();
      }
    };
    if (isHydrated) {
      fetchUserDetails();
    }
  }, [auth.user?.user_type, auth, isHydrated]);

  if (!isHydrated) {
    return null;
  }

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
