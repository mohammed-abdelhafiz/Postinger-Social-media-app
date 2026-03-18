import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import {
  createComment,
  CreateCommentData,
  createPost,
  CreatePostData,
} from "../services/feedApi";
import { useAuthStore } from "@/store/auth.store";
import { Comment, Post } from "../types/feed.types";
import { usePostContext } from "../contexts/PostContext";

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { post } = usePostContext();
  const queryKey = ["comments", post._id];

  return useMutation({
    mutationFn: createComment,

    onMutate: async ({ postId, content }: CreateCommentData) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;
        const optimisticComment = createOptimisticComment(postId, content);
        return {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) =>
            index === 0
              ? {
                  ...page,
                  data: [optimisticComment, ...page.data],
                }
              : page,
          ),
        };
      });

      return { prevData };
    },

    onError: (error, _vars, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(queryKey, context.prevData);
      }

      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred");
        console.log(error);
      }
    },

    onSuccess: () => {
      toast.success("Comment created successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey, exact: true });
    },
  });
};

function createOptimisticComment(postId: string, content: string): Comment {
  const user = useAuthStore.getState().user;
  if (!user) {
    throw new Error("Cannot create comment: user not authenticated");
  }
  const optimisticComment = {
    _id: `temp-${Date.now()}`,
    content: content,
    postId: postId,
    author: user,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likedBy: [],
    likesCount: 0,
    likedByAuthenticatedUser: false,
  };
  return optimisticComment;
}
