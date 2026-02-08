import {
  AuthResponse,
  HostDetailResponse,
  PlayerDetailResponse,
} from "@/types/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthState {
  user: AuthResponse | null;
  player: PlayerDetailResponse | null;
  host: HostDetailResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: AuthResponse) => void;
  setPlayer: (player: PlayerDetailResponse) => void;
  setHost: (host: HostDetailResponse) => void;
  setToken: (token: string | null) => void;
  login: (user: AuthResponse, token: string) => void;
  logout: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      player: null,
      host: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setPlayer: (player) => set({ player }),
      setHost: (host) => set({ host }),
      setToken: (token) => set({ token }),
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () =>
        set({
          player: null,
          host: null,
          user: null,
          token: null,
          isAuthenticated: false,
        }),
      loading: false,
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "auth-storage", // unique name for localStorage/sessionStorage key
      storage: createJSONStorage(() => localStorage), // or sessionStorage
    },
  ),
);
