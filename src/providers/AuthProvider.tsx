"use client";

import { useInitAuth } from "@/features/auth/hooks/useInitAuth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  useInitAuth();

  return children;
};
