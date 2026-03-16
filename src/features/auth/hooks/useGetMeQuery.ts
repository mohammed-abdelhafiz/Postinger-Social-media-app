import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/authApi";

export function useGetMeQuery() {
  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
  return meQuery;
}
