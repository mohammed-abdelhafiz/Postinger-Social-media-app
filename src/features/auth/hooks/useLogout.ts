import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/authApi";
import { toast } from "react-hot-toast";
import { ApiError } from "@/shared/lib/apiError";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/store/auth.store";

export const useLogoutMutation = () => {

  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useAuthStore(s => s.setUser);
  return useMutation({
    mutationFn: logout,

    onSuccess: ({ message }) => {
      queryClient.removeQueries();
      setUser(null);
      toast.success(message);
      router.replace("/login");
    },

    onError: (error) => {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    },
  });
};

