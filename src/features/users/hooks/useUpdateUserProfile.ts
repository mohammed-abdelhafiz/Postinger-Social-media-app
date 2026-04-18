import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../services/usersApi";
import { toast } from "react-hot-toast";

export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUserProfile,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user-profile", data.user.username] });
            toast.success("Profile updated successfully");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update profile");
        },
    });
};
