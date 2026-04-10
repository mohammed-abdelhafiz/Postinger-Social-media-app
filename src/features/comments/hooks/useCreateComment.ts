import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ApiError } from "@/shared/lib/apiError";
import { useAuthStore } from "@/shared/store/auth.store";
import { usePostContext } from "../../posts/context/PostContext";
import { useFeedStore } from "@/shared/store/feed.store";
import { createComment } from "../services/commentsApi";
import { Comment, CommentsQueryPage, CreateCommentData } from "../types";
import { Post, PostsQueryPage } from "@/features/posts/types";
import { useParams } from "next/navigation";

export const useCreateComment = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();
  const { post } = usePostContext();
  const activeTab = useFeedStore((s) => s.activeTab);
  const feedPostsQueryKey = ["feed-posts", activeTab];
  const profileMyPostsQueryKey = ["profile-posts",username, "posted"];
  const profileLikedPostsQueryKey = ["profile-posts",username, "liked"];
  const commentsQueryKey = ["comments", post._id];

  return useMutation({
    mutationFn: createComment,

    onMutate: async ({ postId, content }: CreateCommentData) => {
      await queryClient.cancelQueries({ queryKey: feedPostsQueryKey });
      await queryClient.cancelQueries({ queryKey: profileMyPostsQueryKey });
      await queryClient.cancelQueries({ queryKey: profileLikedPostsQueryKey });
      await queryClient.cancelQueries({ queryKey: commentsQueryKey });

      const prevFeedPostsData = queryClient.getQueryData(feedPostsQueryKey);
      const prevProfileMyPostsData = queryClient.getQueryData(
        profileMyPostsQueryKey,
      );
      const prevProfileLikedPostsData = queryClient.getQueryData(
        profileLikedPostsQueryKey,
      );
      const prevCommentsData = queryClient.getQueryData(commentsQueryKey);

      // Optimistically update post's comments count
      queryClient.setQueryData(
        feedPostsQueryKey,
        (oldData: InfiniteData<PostsQueryPage>) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: PostsQueryPage) => ({
              ...page,
              data: page.data.map((p: Post) =>
                p._id === postId
                  ? { ...p, commentsCount: (p.commentsCount || 0) + 1 }
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
                  ? { ...p, commentsCount: (p.commentsCount || 0) + 1 }
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
                  ? { ...p, commentsCount: (p.commentsCount || 0) + 1 }
                  : p,
              ),
            })),
          };
        },
      );

      // Optimistically add the comment
      queryClient.setQueryData(
        commentsQueryKey,
        (oldData: InfiniteData<CommentsQueryPage>) => {
          if (!oldData) return oldData;
          const optimisticComment = createOptimisticComment(postId, content);
          return {
            ...oldData,
            pages: oldData.pages.map(
              (page: CommentsQueryPage, index: number) =>
                index === 0
                  ? {
                      ...page,
                      data: [optimisticComment, ...page.data],
                    }
                  : page,
            ),
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
        queryClient.setQueryData(feedPostsQueryKey, context.prevFeedPostsData);
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
      queryClient.invalidateQueries({ queryKey: feedPostsQueryKey });
      queryClient.invalidateQueries({ queryKey: profileMyPostsQueryKey });
      queryClient.invalidateQueries({ queryKey: profileLikedPostsQueryKey });
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
    likesCount: 0,
    isLiked: false,
  };
  return optimisticComment;
}

