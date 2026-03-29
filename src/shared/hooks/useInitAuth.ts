import { useEffect } from "react";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { useAuthStore } from "@/shared/store/auth.store";

export const useInitAuth = () => {
  const { data, isSuccess } = useCurrentUser();
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [data, isSuccess, setUser]);
};
