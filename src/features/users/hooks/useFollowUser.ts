import { useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/shared/lib/apiError";
import { followUser } from "../services/usersApi";
import { User } from "@/features/users/types";
export const useFollowUser = () => {
  const queryClient = useQueryClient();
  const queryKey = ["users", "follow-suggestions"];

  return useMutation({
    mutationFn: followUser,

    onMutate: async ({ username }: { username: string }) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData =
        queryClient.getQueryData<InfiniteData<{ data: User[] }>>(queryKey);

      queryClient.setQueryData(
        queryKey,
        (oldData?: InfiniteData<{ data: User[] }>) => {
          if (!oldData?.pages) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.filter((user) => user.username !== username),
            })),
          };
        }
      );

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
      }
    },

    onSuccess: () => {
      toast.success("Followed successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};