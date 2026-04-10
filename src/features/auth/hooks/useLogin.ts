import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authApi";
import { toast } from "react-hot-toast";
import { ApiError } from "@/shared/lib/apiError";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth.store";

export const useLoginMutation = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: login,
    onSuccess: ({ message, user }) => {
      setUser(user);
      toast.success(message);
      router.replace("/");
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

