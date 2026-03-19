import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../auth/services/authApi";


export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });
};