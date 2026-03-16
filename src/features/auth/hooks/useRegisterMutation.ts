import { useMutation } from "@tanstack/react-query";
import { register } from "../services/authApi";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { useRouter } from "next/navigation";

export const useRegisterMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: register,

    onSuccess: ({ message }) => {
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
