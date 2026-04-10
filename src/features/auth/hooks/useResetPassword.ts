import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ApiError } from "@/shared/lib/apiError";
import { resetPassword } from "../services/authApi";
import { useRouter } from "next/navigation";

export const useResetPasswordMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: resetPassword,

    onSuccess: ({ message }) => {
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

