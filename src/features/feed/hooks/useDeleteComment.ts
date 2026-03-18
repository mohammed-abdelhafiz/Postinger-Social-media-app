import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { deleteComment, DeleteCommentData } from "../services/feedApi";
import { usePostContext } from "../contexts/PostContext";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const {
    post: { _id: postId },
  } = usePostContext();
  const postsQueryKey = ["posts", "for-you"];
  const postCommentsQueryKey = ["comments", postId];
  return useMutation({
    mutationFn: deleteComment,

    onMutate: async ({ commentId }: DeleteCommentData) => {
      await queryClient.cancelQueries({ queryKey: postsQueryKey, exact: true });
      await queryClient.cancelQueries({
        queryKey: postCommentsQueryKey,
        exact: true,
      });

      const prevPostsData = queryClient.getQueryData(postsQueryKey);
      const prevCommentsData = queryClient.getQueryData(postCommentsQueryKey);

      queryClient.setQueryData(postsQueryKey, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.map((p: any) =>
              p._id === postId
                ? {
                    ...p,
                    commentsCount: Math.max((p.commentsCount || 1) - 1, 0),
                  }
                : p,
            ),
          })),
        };
      });

      queryClient.setQueryData(postCommentsQueryKey, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.filter((comment: any) => comment._id !== commentId),
          })),
        };
      });

      return { prevPostsData, prevCommentsData };
    },

    onError: (error, _vars, context) => {
      if (context?.prevPostsData) {
        queryClient.setQueryData(postsQueryKey, context.prevPostsData);
      }
      if (context?.prevCommentsData) {
        queryClient.setQueryData(
          postCommentsQueryKey,
          context.prevCommentsData,
        );
      }

      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: postCommentsQueryKey,
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: postsQueryKey,
        exact: true,
      });
    },
  });
};
