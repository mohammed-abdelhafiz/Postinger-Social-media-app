import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { deleteComment } from "../services/feedApi";

export const useDeleteCommentMutation = (postId:string) => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,

    onSuccess: () => {
      toast.success("Your comment was deleted successfully");
      queryclient.invalidateQueries({ queryKey: ["comments", postId] });
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
