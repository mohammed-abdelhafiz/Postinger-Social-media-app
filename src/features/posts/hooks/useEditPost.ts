import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ApiError } from "@/shared/lib/apiError";
import { editPost } from "../services/postsApi";
import { EditPostData, PostsQueryPage } from "../types";
import { useFeedStore } from "@/shared/store/feed.store";
import { useParams } from "next/navigation";

export const useEditPost = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();
  const activeTab = useFeedStore((s) => s.activeTab);
  const feedQueryKey = ["feed-posts", activeTab];
  const profileMyPostsQueryKey = ["profile-posts",username, "posted"];
  const profileLikedPostsQueryKey = ["profile-posts",username, "liked"];

  return useMutation({
    mutationFn: editPost,

    onMutate: async ({
      postId,
      text,
      image,
      removeOldImage,
    }: EditPostData) => {
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

      const newFeedData = updatePostInCache(
        prevFeedData as InfiniteData<PostsQueryPage> | undefined,
        postId,
        text,
        image,
        removeOldImage,
      );
      queryClient.setQueryData(feedQueryKey, newFeedData?.updatedData);

      const newProfileMyPostsData = updatePostInCache(
        prevProfileMyPostsData as InfiniteData<PostsQueryPage> | undefined,
        postId,
        text,
        image,
        removeOldImage,
      );
      queryClient.setQueryData(
        profileMyPostsQueryKey,
        newProfileMyPostsData?.updatedData,
      );

      const newProfileLikedPostsData = updatePostInCache(
        prevProfileLikedPostsData as InfiniteData<PostsQueryPage> | undefined,
        postId,
        text,
        image,
        removeOldImage,
      );
      queryClient.setQueryData(
        profileLikedPostsQueryKey,
        newProfileLikedPostsData?.updatedData,
      );

      return {
        prevFeedData,
        prevProfileMyPostsData,
        prevProfileLikedPostsData,
        objectUrls: [
          newFeedData?.newObjectUrl,
          newProfileMyPostsData?.newObjectUrl,
          newProfileLikedPostsData?.newObjectUrl,
        ].filter(Boolean),
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

    onSettled: (_data, _error, _vars, context) => {
      if (context?.objectUrls) {
        context.objectUrls.forEach((url) => url && URL.revokeObjectURL(url));
      }
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

function updatePostInCache(
  oldData: InfiniteData<PostsQueryPage> | undefined,
  postId: string,
  text?: string,
  image?: File,
  removeOldImage?: boolean,
) {
  if (!oldData) return oldData;

  let newObjectUrl: string | undefined;

  const updatedData = {
    ...oldData,
    pages: oldData.pages.map((page) => ({
      ...page,
      data: page.data.map((post) => {
        if (post._id !== postId) return post;

        let updatedImage = post.content.image;

        if (image) {
          newObjectUrl = URL.createObjectURL(image);
          updatedImage = {
            url: newObjectUrl,
            publicId: "",
          };
        } else if (removeOldImage) {
          updatedImage = undefined;
        }

        return {
          ...post,
          content: {
            ...post.content,
            text: text ?? post.content.text,
            image: updatedImage,
          },
        };
      }),
    })),
  };

  return { updatedData, newObjectUrl };
}

