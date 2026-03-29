import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/shared/lib/apiError";
import { usePostContext } from "../../posts/context/PostContext";
import { useFeedStore } from "@/shared/store/feed.store";
import { deleteComment } from "../services/commentsApi";
import { DeleteCommentData } from "../types";
import { Post, PostsQueryPage } from "../../posts/types";
import { Comment, CommentsQueryPage } from "../types";
import { useParams } from "next/navigation";

export const useDeleteComment = () => {
  const {username} = useParams();
  const queryClient = useQueryClient();
  const activeTab = useFeedStore((s) => s.activeTab);
  const {
    post: { _id: postId },
  } = usePostContext();
  const feedQueryKey = ["feed-posts", activeTab];
  const profileMyPostsQueryKey = ["profile-posts",username, "posted"];
  const profileLikedPostsQueryKey = ["profile-posts",username, "liked"];
  const postCommentsQueryKey = ["comments", postId];
  return useMutation({
    mutationFn: deleteComment,

    onMutate: async ({ commentId }: DeleteCommentData) => {
      await queryClient.cancelQueries({ queryKey: feedQueryKey, exact: true });
      await queryClient.cancelQueries({
        queryKey: profileMyPostsQueryKey,
        exact: true,
      });
      await queryClient.cancelQueries({
        queryKey: profileLikedPostsQueryKey,
        exact: true,
      });
      await queryClient.cancelQueries({
        queryKey: postCommentsQueryKey,
        exact: true,
      });

      const prevFeedPostsData = queryClient.getQueryData(feedQueryKey);
      const prevProfileMyPostsData = queryClient.getQueryData(
        profileMyPostsQueryKey,
      );
      const prevProfileLikedPostsData = queryClient.getQueryData(
        profileLikedPostsQueryKey,
      );
      const prevCommentsData = queryClient.getQueryData(postCommentsQueryKey);

      queryClient.setQueryData(
        feedQueryKey,
        (oldData: InfiniteData<PostsQueryPage>) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: PostsQueryPage) => ({
              ...page,
              data: page.data.map((p: Post) =>
                p._id === postId
                  ? {
                      ...p,
                      commentsCount: Math.max((p.commentsCount || 1) - 1, 0),
                    }
                  : p,
              ),
            })),
          };
        },
      );
      queryClient.setQueryData(
        profileMyPostsQueryKey,
        (oldData: InfiniteData<PostsQueryPage>) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: PostsQueryPage) => ({
              ...page,
              data: page.data.map((p: Post) =>
                p._id === postId
                  ? {
                      ...p,
                      commentsCount: Math.max((p.commentsCount || 1) - 1, 0),
                    }
                  : p,
              ),
            })),
          };
        },
      );
      queryClient.setQueryData(
        profileLikedPostsQueryKey,
        (oldData: InfiniteData<PostsQueryPage>) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: PostsQueryPage) => ({
              ...page,
              data: page.data.map((p: Post) =>
                p._id === postId
                  ? {
                      ...p,
                      commentsCount: Math.max((p.commentsCount || 1) - 1, 0),
                    }
                  : p,
              ),
            })),
          };
        },
      );

      queryClient.setQueryData(
        postCommentsQueryKey,
        (oldData: InfiniteData<CommentsQueryPage>) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: CommentsQueryPage) => ({
              ...page,
              data: page.data.filter(
                (comment: Comment) => comment._id !== commentId,
              ),
            })),
          };
        },
      );

      return {
        prevFeedPostsData,
        prevProfileMyPostsData,
        prevProfileLikedPostsData,
        prevCommentsData,
      };
    },

    onError: (error, _vars, context) => {
      if (context?.prevFeedPostsData) {
        queryClient.setQueryData(feedQueryKey, context.prevFeedPostsData);
      }
      if (context?.prevProfileMyPostsData) {
        queryClient.setQueryData(
          profileMyPostsQueryKey,
          context.prevProfileMyPostsData,
        );
      }
      if (context?.prevProfileLikedPostsData) {
        queryClient.setQueryData(
          profileLikedPostsQueryKey,
          context.prevProfileLikedPostsData,
        );
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
        queryKey: feedQueryKey,
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: profileMyPostsQueryKey,
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: profileLikedPostsQueryKey,
        exact: true,
      });
    },
  });
};
