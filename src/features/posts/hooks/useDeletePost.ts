import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ApiError } from "@/shared/lib/apiError";
import { deletePost } from "../services/postsApi";
import { DeletePostData, Post, PostsQueryPage } from "../types";
import { useParams } from "next/navigation";

import { useFeedStore } from "@/shared/store/feed.store";

export const useDeletePost = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();
  const activeTab = useFeedStore((s) => s.activeTab);
  const feedQueryKey = ["feed-posts", activeTab];
  const profileMyPostsQueryKey = ["profile-posts",username, "posted"];
  const profileLikedPostsQueryKey = ["profile-posts",username, "liked"];

  return useMutation({
    mutationFn: deletePost,

    onMutate: async ({ postId }: DeletePostData) => {
      await queryClient.cancelQueries({ queryKey: feedQueryKey });
      await queryClient.cancelQueries({ queryKey: profileMyPostsQueryKey });
      await queryClient.cancelQueries({ queryKey: profileLikedPostsQueryKey });

      const prevFeedData = queryClient.getQueryData(feedQueryKey);
      const prevProfileMyPostsData = queryClient.getQueryData(
        profileMyPostsQueryKey,
      );
      const prevProfileLikedPostsData = queryClient.getQueryData(
        profileLikedPostsQueryKey,
      );

      queryClient.setQueryData(
        feedQueryKey,
        (oldData: InfiniteData<PostsQueryPage>) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: PostsQueryPage) => ({
              ...page,
              data: page.data.filter((post: Post) => post._id !== postId),
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
              data: page.data.filter((post: Post) => post._id !== postId),
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
              data: page.data.filter((post: Post) => post._id !== postId),
            })),
          };
        },
      );

      return {
        prevFeedData,
        prevProfileMyPostsData,
        prevProfileLikedPostsData,
      };
    },

    onError: (error, _vars, context) => {
      if (context?.prevFeedData) {
        queryClient.setQueryData(feedQueryKey, context.prevFeedData);
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

      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: feedQueryKey, exact: true });
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

