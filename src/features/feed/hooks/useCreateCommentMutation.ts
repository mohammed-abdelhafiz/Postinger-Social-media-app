import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { createComment } from "../services/feedApi";
import { Post } from "../types/feed.types";

export const useCreateCommentMutation = (postId: string) => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: createComment,

    onSuccess: () => {
      toast.success("Comment added successfully");
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
