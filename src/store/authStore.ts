import { User } from "@/features/auth/types/auth.types";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  authenticate: (user: User, token: string) => void;
  clearAuthState: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  authenticate: (user, token) => set({ user, accessToken: token }),
  clearAuthState: () => set({ user: null, accessToken: null }),
}));
