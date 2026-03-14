import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/authApi";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export function useGetMeQuery(options?: { enabled: boolean }) {
  const setUser = useAuthStore((state) => state.setUser);

  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: options ? options.enabled : true,
  });

  useEffect(() => {
    if (meQuery.isSuccess && meQuery.data) {
      setUser(meQuery.data.user);
    }
  }, [meQuery.data, meQuery.isSuccess, setUser]);

  return meQuery;
}
