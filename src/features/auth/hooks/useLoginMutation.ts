import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authApi";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { useRouter } from "next/navigation";

export const useLoginMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: ({ message }) => {
      toast.success(message);
      router.replace("/");
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
