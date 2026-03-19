import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { createComment, CreateCommentData } from "../services/feedApi";
import { useAuthStore } from "@/store/auth.store";
import { Comment, Post } from "../types/feed.types";
import { usePostContext } from "../contexts/PostContext";
import { useFeedStore } from "@/store/feed.store";

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { post } = usePostContext();
  const activeTab = useFeedStore((s) => s.activeTab);
  const postsQueryKey = ["posts", activeTab];
  const commentsQueryKey = ["comments", post._id];

  return useMutation({
    mutationFn: createComment,

    onMutate: async ({ postId, content }: CreateCommentData) => {
      await queryClient.cancelQueries({ queryKey: postsQueryKey });
      await queryClient.cancelQueries({ queryKey: commentsQueryKey });

      const prevPostsData = queryClient.getQueryData(postsQueryKey);
      const prevCommentsData = queryClient.getQueryData(commentsQueryKey);

      // Optimistically update post's comments count
      queryClient.setQueryData(postsQueryKey, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.map((p: Post) =>
              p._id === postId
                ? { ...p, commentsCount: (p.commentsCount || 0) + 1 }
                : p,
            ),
          })),
        };
      });

      // Optimistically add the comment
      queryClient.setQueryData(commentsQueryKey, (oldData: any) => {
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

      return { prevPostsData, prevCommentsData };
    },

    onError: (error, _vars, context) => {
      if (context?.prevPostsData) {
        queryClient.setQueryData(postsQueryKey, context.prevPostsData);
      }
      if (context?.prevCommentsData) {
        queryClient.setQueryData(commentsQueryKey, context.prevCommentsData);
      }

      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred");
        console.log(error);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKey });
      queryClient.invalidateQueries({ queryKey: commentsQueryKey });
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
