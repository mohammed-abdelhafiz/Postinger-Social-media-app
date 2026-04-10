import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ApiError } from "@/shared/lib/apiError";
import { usePostContext } from "../../posts/context/PostContext";
import { editComment } from "../services/commentsApi";
import { Comment, CommentsQueryPage, EditCommentData } from "../types";


export const useEditComment = () => {
  const queryClient = useQueryClient();
  const {
    post: { _id: postId },
  } = usePostContext();
  const postCommentsQueryKey = ["comments", postId];
  return useMutation({
    mutationFn: editComment,

    onMutate: async ({ commentId, content }: EditCommentData) => {
      await queryClient.cancelQueries({
        queryKey: postCommentsQueryKey,
        exact: true,
      });

      const prevCommentsData = queryClient.getQueryData(postCommentsQueryKey);

      queryClient.setQueryData(postCommentsQueryKey, (oldData: InfiniteData<CommentsQueryPage> ) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: CommentsQueryPage) => ({
            ...page,
            data: page.data.map((comment: Comment) =>
              comment._id === commentId ? { ...comment, content } : comment,
            ),
          })),
        };
      });

      return { prevCommentsData };
    },

    onError: (error, _vars, context) => {
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
    },
  });
};

