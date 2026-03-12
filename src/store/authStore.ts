import { User } from "@/features/auth/types/auth.types";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  setUser: (user: User | null) => void;
  clearAuthState: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  setAccessToken: (accessToken) => set({ accessToken }),
  setUser: (user) => set({ user }),
  clearAuthState: () => set({ user: null, accessToken: null }),
}));
