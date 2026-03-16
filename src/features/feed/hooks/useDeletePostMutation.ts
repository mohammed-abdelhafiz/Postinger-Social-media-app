import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { deletePost } from "../services/feedApi";

export const useDeletePostMutation = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      toast.success("Post deleted successfully");
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
