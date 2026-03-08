"use client";

import { getMe, refreshToken } from "@/features/auth/services/authApi";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    async function refresh() {
      try {
        const { accessToken } = await refreshToken();

        if (!accessToken) {
          throw new Error("No access token");
        }

        setAccessToken(accessToken);

        const { user } = await getMe();
        setUser(user);
      } catch (error) {
        console.log("Refresh failed:", error);
      }
    }

    refresh();
  }, [setAccessToken, setUser]);

  return children;
};
