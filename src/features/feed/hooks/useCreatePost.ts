import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { createPost, CreatePostData } from "../services/feedApi";
import { useAuthStore } from "@/store/auth.store";
import { Post } from "../types/feed.types";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const queryKey = ["posts", "for-you"];

  return useMutation({
    mutationFn: createPost,

    onMutate: async ({ formData }: CreatePostData) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;
        const optimisticPost = createOptimisticPost(formData);
        return {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) =>
            index === 0
              ? {
                  ...page,
                  data: [optimisticPost, ...page.data],
                }
              : page,
          ),
        };
      });

      return { prevData };
    },

    onError: (error, _vars, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(queryKey, context.prevData);
      }

      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred");
        console.log(error);
      }
    },

    onSuccess: () => {
      toast.success("Post created successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey, exact: true });
    },
  });
};

function createOptimisticPost(formData: FormData): Post {
  const newPostText = formData.get("text");
  const newPostImage = formData.get("image");
  const imageUrl = newPostImage
    ? URL.createObjectURL(newPostImage as File)
    : "";
  const optimisticPost = {
    _id: `temp-${Date.now()}`,
    content: {
      text: newPostText as string,
      image: {
        url: imageUrl,
        publicId: "",
      },
    },
    author: useAuthStore.getState().user!,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likesCount: 0,
    commentsCount: 0,
    likedByCurrentUser: false,
  };
  return optimisticPost;
}
