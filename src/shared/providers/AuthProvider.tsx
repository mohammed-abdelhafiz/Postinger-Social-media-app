"use client";

import { useInitAuth } from "@/shared/hooks/useInitAuth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useInitAuth();
  return children;
};
