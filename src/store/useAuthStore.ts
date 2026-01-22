import { CommunityResponse } from "@/types/community";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthState {
  user: any | null; // Replace 'any' with your actual User type
  token: string | null;
  community: CommunityResponse | null;
  isAuthenticated: boolean;
  setUser: (user: any | null) => void;
  setCommunity: (community: CommunityResponse) => void;
  setToken: (token: string | null) => void;
  login: (user: any, token: string) => void;
  logout: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      community: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setCommunity: (community) => set({ community }),
      setToken: (token) => set({ token }),
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      loading: false,
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "auth-storage", // unique name for localStorage/sessionStorage key
      storage: createJSONStorage(() => localStorage), // or sessionStorage
    },
  ),
);
