"use client";

import { getMe, refreshToken } from "@/features/auth/services/authApi";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const InitialAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { accessToken } = await refreshToken();
        useAuthStore.setState({ accessToken });
        const { user } = await getMe();
        useAuthStore.setState({ user });
      } catch (error) {
        console.log(error);
      }
    };

    initAuth();
  }, [router]);

  return children;
};
