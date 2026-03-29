import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/shared/lib/apiError";
import { usePostContext } from "../../posts/context/PostContext";
import { likeComment } from "../services/commentsApi";
import { useCommentContext } from "../context/CommentContext";
import { Comment, CommentsQueryPage } from "../types";

export const useLikeComment = () => {
  const queryClient = useQueryClient();
  const { post } = usePostContext();
  const { comment } = useCommentContext();
  const commentsQueryKey = ["comments", post._id];

  return useMutation({
    mutationFn: likeComment,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: commentsQueryKey });
      const prevCommentsData = queryClient.getQueryData(commentsQueryKey);

      queryClient.setQueryData(
        commentsQueryKey,
        (oldData: InfiniteData<CommentsQueryPage>) => {
          if (!oldData?.pages) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: CommentsQueryPage) => {
              if (!page?.data) return page;
              return {
                ...page,
                data: page.data.map((item: Comment) =>
                  item._id === comment._id
                    ? {
                        ...item,
                        likesCount: item.isLiked
                          ? item.likesCount - 1
                          : item.likesCount + 1,
                        isLiked: !item.isLiked,
                      }
                    : item,
                ),
              };
            }),
          };
        },
      );
      return { prevCommentsData };
    },
    onError: (error, _vars, context) => {
      if (context?.prevCommentsData)
        queryClient.setQueryData(commentsQueryKey, context.prevCommentsData);
      if (error instanceof ApiError) toast.error(error.message);
      else toast.error("Unexpected error occurred");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: commentsQueryKey,
        exact: true,
      });
    },
  });
};
