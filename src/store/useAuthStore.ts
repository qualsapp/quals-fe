import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  user: any | null; // Replace 'any' with your actual User type
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: any | null) => void;
  setToken: (token: string | null) => void;
  login: (user: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage", // unique name for localStorage/sessionStorage key
      storage: createJSONStorage(() => localStorage), // or sessionStorage
    }
  )
);
