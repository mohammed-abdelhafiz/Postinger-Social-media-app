import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { editComment } from "../services/feedApi";

export const useEditCommentMutation = (postId: string) => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: editComment,

    onSuccess: () => {
      toast.success("Your comment was edited successfully");
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
