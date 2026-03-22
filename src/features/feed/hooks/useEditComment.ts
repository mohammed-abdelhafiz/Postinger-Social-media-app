import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { editComment, EditCommentData } from "../services/feedApi";
import { usePostContext } from "../contexts/PostContext";

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

      queryClient.setQueryData(postCommentsQueryKey, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.map((comment: any) =>
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
