import { useMutation } from "@tanstack/react-query";
import { requestResetPassword } from "../services/authApi";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";

export const useRequestResetPasswordMutation = () => {
  return useMutation({
    mutationFn: requestResetPassword,

    onSuccess: ({ message }) => {
      toast.success(message);
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
