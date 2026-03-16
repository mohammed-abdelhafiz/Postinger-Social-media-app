import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/authApi";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { useRouter } from "next/navigation";

export const useLogoutMutation = () => {

  const router = useRouter();
  return useMutation({
    mutationFn: logout,

    onSuccess: ({ message }) => {
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
