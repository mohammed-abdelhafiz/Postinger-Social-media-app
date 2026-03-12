import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { createPost } from "../services/feedApi";

export const useCreatePostMutation = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: createPost,

    onSuccess: ({ message }) => {
      toast.success(message);
      queryclient.invalidateQueries({ queryKey: ["posts"] });
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
