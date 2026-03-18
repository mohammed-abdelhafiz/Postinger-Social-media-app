import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";
import { deletePost, DeletePostData } from "../services/feedApi";
import { Post } from "../types/feed.types";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const queryKey = ["posts", "for-you"];

  return useMutation({
    mutationFn: deletePost,

    onMutate: async ({ postId }: DeletePostData) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) =>
            index === 0
              ? {
                  ...page,
                  data: page.data.filter((post: Post) => post._id !== postId),
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
      toast.success("Post deleted successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey, exact: true });
    },
  });
};
