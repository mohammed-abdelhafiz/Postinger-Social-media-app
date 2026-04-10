import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ApiError } from "@/shared/lib/apiError";
import { createPost } from "../services/postsApi";
import { useAuthStore } from "@/shared/store/auth.store";
import { CreatePostData, Post, PostsQueryPage } from "../types";
import { useParams } from "next/navigation";

export const useCreatePost = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();
  const feedQueryKey = ["feed-posts", "for-you"];
  const profileQueryKey = ["profile-posts",username, "posted"];

  return useMutation({
    mutationFn: createPost,

    onMutate: async (postData: CreatePostData) => {
      await queryClient.cancelQueries({ queryKey: feedQueryKey });
      await queryClient.cancelQueries({ queryKey: profileQueryKey });

      const prevFeedData = queryClient.getQueryData(feedQueryKey);
      const prevProfileData = queryClient.getQueryData(profileQueryKey);

      queryClient.setQueryData(
        feedQueryKey,
        (oldData: InfiniteData<PostsQueryPage>) => {
          if (!oldData?.pages) return oldData;
          const optimisticPost = createOptimisticPost(postData);
          return {
            ...oldData,
            pages: oldData.pages.map((page: PostsQueryPage, index: number) =>
              index === 0
                ? {
                    ...page,
                    data: [optimisticPost, ...page.data],
                  }
                : page,
            ),
          };
        },
      );
      queryClient.setQueryData(
        profileQueryKey,
        (oldData: InfiniteData<PostsQueryPage>) => {
          if (!oldData?.pages) return oldData;
          const optimisticPost = createOptimisticPost(postData);
          return {
            ...oldData,
            pages: oldData.pages.map((page: PostsQueryPage, index: number) =>
              index === 0
                ? {
                    ...page,
                    data: [optimisticPost, ...page.data],
                  }
                : page,
            ),
          };
        },
      );

      return { prevFeedData, prevProfileData };
    },

    onError: (error, _vars, context) => {
      if (context?.prevFeedData) {
        queryClient.setQueryData(feedQueryKey, context.prevFeedData);
      }
      if (context?.prevProfileData) {
        queryClient.setQueryData(profileQueryKey, context.prevProfileData);
      }

      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    },

    onSettled: () => {
      const currentFeedData = queryClient.getQueryData(
        feedQueryKey,
      ) as InfiniteData<PostsQueryPage>;
      if (currentFeedData?.pages?.[0]?.data) {
        const optimisticPost = currentFeedData.pages[0].data.find((p: Post) =>
          p._id.startsWith("temp-"),
        );
        if (optimisticPost?.content?.image?.url?.startsWith("blob:")) {
          URL.revokeObjectURL(optimisticPost.content.image.url);
        }
      }
      const currentProfileData = queryClient.getQueryData(
        profileQueryKey,
      ) as InfiniteData<PostsQueryPage>;
      if (currentProfileData?.pages?.[0]?.data) {
        const optimisticPost = currentProfileData.pages[0].data.find(
          (p: Post) => p._id.startsWith("temp-"),
        );
        if (optimisticPost?.content?.image?.url?.startsWith("blob:")) {
          URL.revokeObjectURL(optimisticPost.content.image.url);
        }
      }
      queryClient.invalidateQueries({ queryKey: feedQueryKey, exact: true });
      queryClient.invalidateQueries({ queryKey: profileQueryKey, exact: true });
    },
  });
};

function createOptimisticPost(postData: CreatePostData): Post {
  const newPostText = postData.text;
  const newPostImage = postData.image;
  const imageUrl = newPostImage && URL.createObjectURL(newPostImage as File);
  const user = useAuthStore.getState().user;
  if (!user) {
    throw new Error("User not found");
  }
  const optimisticPost:Post = {
    _id: `temp-${Date.now()}`,
    content: {
      text: newPostText,
      image: imageUrl ? {
        url: imageUrl,
        publicId: "",
      } : undefined,
    },
    author: user,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likesCount: 0,
    commentsCount: 0,
    isLiked:false
  };
  return optimisticPost;
}

