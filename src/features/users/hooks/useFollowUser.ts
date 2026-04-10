import { useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ApiError } from "@/shared/lib/apiError";
import { followUser } from "../services/usersApi";
import { User } from "@/features/users/types";

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  const suggestionsQueryKey = ["users", "follow-suggestions"];

  return useMutation({
    mutationFn: followUser,

    onMutate: async ({ username }: { username: string }) => {
      const userProfileQueryKey = ["user-profile", username];
      
      await queryClient.cancelQueries({ queryKey: suggestionsQueryKey });
      await queryClient.cancelQueries({ queryKey: userProfileQueryKey });

      const prevSuggestions =
        queryClient.getQueryData<InfiniteData<{ data: User[] }>>(suggestionsQueryKey);
      const prevUserProfile = 
        queryClient.getQueryData<User>(userProfileQueryKey);

      // Optimistically update suggestions
      queryClient.setQueryData(
        suggestionsQueryKey,
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

      // Optimistically update user profile if we are looking at it
      if (prevUserProfile) {
        queryClient.setQueryData<User>(userProfileQueryKey, {
          ...prevUserProfile,
          isFollowing: true,
          followersCount: (prevUserProfile.followersCount || 0) + 1,
        });
      }

      return { prevSuggestions, prevUserProfile };
    },

    onError: (error, { username }, context) => {
      if (context?.prevSuggestions) {
        queryClient.setQueryData(suggestionsQueryKey, context.prevSuggestions);
      }
      if (context?.prevUserProfile) {
        queryClient.setQueryData(["user-profile", username], context.prevUserProfile);
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

    onSettled: (data, error, { username }) => {
      queryClient.invalidateQueries({ queryKey: suggestionsQueryKey });
      queryClient.invalidateQueries({ queryKey: ["user-profile", username] });
    },
  });
};
