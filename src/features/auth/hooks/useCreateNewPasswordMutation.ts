import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { createNewPassword } from "../services/authApi";
import { useRouter } from "next/navigation";

export const useCreateNewPasswordMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: createNewPassword,

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
