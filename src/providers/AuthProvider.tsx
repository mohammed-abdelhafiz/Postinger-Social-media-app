"use client";

import { useInitAuth } from "@/hooks/useInitAuth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useInitAuth();
  return children;
};
