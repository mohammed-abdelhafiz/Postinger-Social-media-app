"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export const withAuth = (WrappedComponent: React.FC) => {
  const WithAuth: React.FC = (props) => {
    const router = useRouter();
    const { user } = useAuthStore((state) => state);

    useEffect(() => {
      if (!user) {
        router.replace("/login"); // redirect if not logged in
      }
    }, [user, router]);

    return user ? <WrappedComponent {...props} /> : null;
  };

  return WithAuth;
};
