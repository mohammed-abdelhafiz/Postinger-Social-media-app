import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ApiError } from "@/shared/lib/apiError";
import { likePost } from "../services/postsApi";
import { useFeedStore } from "@/shared/store/feed.store";
import { usePostContext } from "../context/PostContext";
import { Post, PostsQueryPage } from "../types";
import { useParams } from "next/navigation";

export const useLikePost = () => {
  const { username } = useParams();
  const { post } = usePostContext();
  const queryClient = useQueryClient();
  const feedActiveTab = useFeedStore((s) => s.activeTab);
  const feedQueryKey = ["feed-posts", feedActiveTab];
  const profileMyPostsQueryKey = ["profile-posts",username, "posted"];
  const profileLikedPostsQueryKey = ["profile-posts",username, "liked"];

  return useMutation({
    mutationFn: likePost,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: feedQueryKey });
      await queryClient.cancelQueries({ queryKey: profileMyPostsQueryKey });
      await queryClient.cancelQueries({ queryKey: profileLikedPostsQueryKey });
      const prevFeedPostsData = queryClient.getQueryData(feedQueryKey);
      const prevProfileMyPostsData = queryClient.getQueryData(
        profileMyPostsQueryKey,
      );
      const prevProfileLikedPostsData = queryClient.getQueryData(
        profileLikedPostsQueryKey,
      );
      const newFeedData = likePostInCache(
        prevFeedPostsData as InfiniteData<PostsQueryPage> | undefined,
        post._id,
      );
      const newProfileMyPostsData = likePostInCache(
        prevProfileMyPostsData as InfiniteData<PostsQueryPage> | undefined,
        post._id,
      );
      const newProfileLikedPostsData = likePostInCacheForLikedPosts(
        prevProfileLikedPostsData as InfiniteData<PostsQueryPage> | undefined,
        post,
      );
      queryClient.setQueryData(feedQueryKey, newFeedData);
      queryClient.setQueryData(profileMyPostsQueryKey, newProfileMyPostsData);
      queryClient.setQueryData(
        profileLikedPostsQueryKey,
        newProfileLikedPostsData,
      );
      return {
        prevFeedPostsData,
        prevProfileMyPostsData,
        prevProfileLikedPostsData,
      };
    },
    onError: (error, _vars, context) => {
      if (context?.prevFeedPostsData)
        queryClient.setQueryData(feedQueryKey, context.prevFeedPostsData);
      if (context?.prevProfileMyPostsData)
        queryClient.setQueryData(
          profileMyPostsQueryKey,
          context.prevProfileMyPostsData,
        );
      if (context?.prevProfileLikedPostsData)
        queryClient.setQueryData(
          profileLikedPostsQueryKey,
          context.prevProfileLikedPostsData,
        );

      if (error instanceof ApiError) toast.error(error.message);
      else toast.error("Unexpected error occurred");
    },
    onSettled: () => {
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

function likePostInCache(
  oldData: InfiniteData<PostsQueryPage> | undefined,
  postId: string,
) {
  if (!oldData?.pages) return oldData;
  return {
    ...oldData,
    pages: oldData.pages.map((page: PostsQueryPage) => {
      if (!page?.data) return page;
      return {
        ...page,
        data: page.data.map((item: Post) =>
          item._id === postId
            ? {
                ...item,
                likesCount: item.likesCount + 1,
                isLiked: true,
              }
            : item,
        ),
      };
    }),
  };
}

function likePostInCacheForLikedPosts(
  oldData: InfiniteData<PostsQueryPage> | undefined,
  post: Post,
) {
  if (!oldData?.pages) return oldData;

  const updatedPost: Post = {
    ...post,
    likesCount: post.likesCount + 1,
    isLiked: true,
  };

  return {
    ...oldData,
    pages: oldData.pages.map((page, index) => {
      if (!page?.data) return page;
      // Filter out the post to avoid duplicates, then prepend to the first page
      const filteredData = page.data.filter((item) => item._id !== post._id);
      return {
        ...page,
        data: index === 0 ? [updatedPost, ...filteredData] : filteredData,
      };
    }),
  };
}

