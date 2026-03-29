import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/usersApi";

export const useGetUserProfile = (username: string) => {
  return useQuery({
    queryKey: ["user-profile", username],
    queryFn: () => getUserProfile(username),
  });
};
