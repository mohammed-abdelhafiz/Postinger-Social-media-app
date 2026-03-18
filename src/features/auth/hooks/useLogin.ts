import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authApi";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: ({ message, user }) => {
      queryClient.setQueryData(["me"], user);
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
