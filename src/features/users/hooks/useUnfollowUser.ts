import { useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ApiError } from "@/shared/lib/apiError";
import { unfollowUser } from "../services/usersApi";
import { User } from "@/features/users/types";

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unfollowUser,

    onMutate: async ({ username }: { username: string }) => {
      // Optimistically update the user profile
      const queryKey = ["user-profile", username];
      await queryClient.cancelQueries({ queryKey });

      const prevUserProfile = queryClient.getQueryData<User>(queryKey);

      if (prevUserProfile) {
        queryClient.setQueryData<User>(queryKey, {
          ...prevUserProfile,
          isFollowing: false,
          followersCount: Math.max(0, (prevUserProfile.followersCount || 0) - 1),
        });
      }

      return { prevUserProfile };
    },

    onError: (error, { username }, context) => {
      if (context?.prevUserProfile) {
        queryClient.setQueryData(["user-profile", username], context.prevUserProfile);
      }

      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred while unfollowing");
      }
    },

    onSuccess: () => {
      toast.success("Unfollowed successfully");
    },

    onSettled: (data, error, { username }) => {
      queryClient.invalidateQueries({ queryKey: ["user-profile", username] });
      queryClient.invalidateQueries({ queryKey: ["users", "follow-suggestions"] });
    },
  });
};
