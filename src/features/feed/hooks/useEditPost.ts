import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { editPost, EditPostData } from "../services/feedApi";
import { Post } from "../types/feed.types";

export const useEditPost = () => {
  const queryClient = useQueryClient();
  const queryKey = ["posts", "for-you"];

  return useMutation({
    mutationFn: editPost,

    onMutate: async ({ postId, formData }: EditPostData) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData(queryKey);

      const newText = formData.get("text") as string;
      const newImage = formData.get("image") as File | null;
      const removeOldImage = formData.get("removeOldImage") === "true";
      let newObjectUrl;

      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.map((post: Post) => {
              if (post._id === postId) {
                let updatedImage = post.content.image;
                if (newImage) {
                  newObjectUrl = URL.createObjectURL(newImage);
                  updatedImage = {
                    url: newObjectUrl,
                    publicId: "",
                  };
                } else if (removeOldImage) {
                  updatedImage = null;
                }

                return {
                  ...post,
                  content: {
                    ...post.content,
                    text: newText ?? post.content.text,
                    image: updatedImage,
                  },
                };
              }
              return post;
            }),
          })),
        };
      });

      return { prevData, newObjectUrl };
    },

    onError: (error, _vars, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(queryKey, context.prevData);
      }

      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    },

    onSettled: (_data, _error, _vars, context) => {
      if (context?.newObjectUrl) {
        URL.revokeObjectURL(context.newObjectUrl);
      }
      queryClient.invalidateQueries({ queryKey, exact: true });
    },
  });
};
