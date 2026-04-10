import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../services/authApi";
import { toast } from "react-hot-toast";
import { ApiError } from "@/shared/lib/apiError";

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: forgotPassword,

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

