import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/authApi";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export const useLogoutMutation = () => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();
  return useMutation({
    mutationFn: logout,

    onSuccess: ({ message }) => {
      setAccessToken(null);
      setUser(null);
      toast.success(message);
      router.replace("/login");
    },

    onError: (error) => {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        console.log(error);
        toast.error("Unexpected error occurred");
      }
    },
  });
};
