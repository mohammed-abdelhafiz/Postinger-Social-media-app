import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { editPost } from "../services/feedApi";

export const useEditPost = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: editPost,

    onSuccess: () => {
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
