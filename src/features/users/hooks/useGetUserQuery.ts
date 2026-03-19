import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/usersApi";

export const useGetUserQuery = (userIdOrUsername: string) => {
  return useQuery({
    queryKey: ["user", userIdOrUsername],
    queryFn: () => getUser(userIdOrUsername),
  });
};
