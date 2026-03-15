import { useMutation } from "@tanstack/react-query";
import { refreshToken } from "../services/authApi";
import { useEffect } from "react";
import { useGetMeQuery } from "./useGetMeQuery";

export const useInitAuth = () => {
  const refreshMutation = useMutation({
    mutationFn: refreshToken,
  });

  useGetMeQuery({
    enabled: refreshMutation.isSuccess && !!refreshMutation.data?.accessToken,
  });

  useEffect(() => {
    refreshMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
