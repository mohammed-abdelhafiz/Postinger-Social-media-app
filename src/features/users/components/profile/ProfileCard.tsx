"use client";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { Check } from "lucide-react";
import Image from "next/image";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { useAuthStore } from "@/shared/store/auth.store";
import { ProfileCardSkeleton } from "./ProfileCardSkeleton";
import { notFound } from "next/navigation";
import { ProfileCardError } from "./ProfileCardError";
import { useFollowUser } from "../../hooks/useFollowUser";
import { useUnfollowUser } from "../../hooks/useUnfollowUser";
import { useState } from "react";
import { EditProfileModal } from "./EditProfileModal";

interface ProfileCardProps {
  username: string;
}

export const ProfileCard = ({ username }: ProfileCardProps) => {
  const followUserMutation = useFollowUser();
  const unfollowUserMutation = useUnfollowUser();
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserProfile(username);
  const authUser = useAuthStore((state) => state.user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isOwner = user?._id === authUser?._id;
  const isFollowing = user?.isFollowing;
  
  if (isLoading || !authUser || username === "undefined") {
    return <ProfileCardSkeleton />;
  }

  if (!user || (error && error.message === "User not found")) {
    return notFound();
  }

  if (isError) {
    return <ProfileCardError refetch={refetch} />;
  }
  
  const handleFollow = () => {
    followUserMutation.mutate({ username });
  };

  const handleUnfollow = () => {
    unfollowUserMutation.mutate({ username });
  };

  return (
    <Card className="md:w-5/12 w-full p-0 h-fit!">
      <CardHeader className="p-0 w-full h-36 overflow-hidden relative">
        <Image
          src={
            user.coverImage?.url ||
            "https://images.unsplash.com/photo-1660491630578-4299a3c09db0?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="cover image"
          fill
        />
      </CardHeader>
      <CardContent className="space-y-4 pb-4">
        <div className="flex justify-between h-10">
          <div className="w-24 h-24 rounded-full overflow-hidden translate-y-[-65%] relative">
            <Image
              src={
                user.avatar?.url ||
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              }
              alt="avatar"
              fill
            />
          </div>
          {isOwner ? (
            <>
              <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
                Edit Profile
              </Button>
              {user && (
                <EditProfileModal
                  user={user}
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                />
              )}
            </>
          ) : (
            <div className="flex items-center">
              {isFollowing ? (
                <Button 
                  className="w-24" 
                  variant="outline" 
                  onClick={handleUnfollow}
                  disabled={unfollowUserMutation.isPending || followUserMutation.isPending}
                >
                  Following <Check />
                </Button>
              ) : (
                <Button 
                  className="w-24" 
                  onClick={handleFollow}
                  disabled={followUserMutation.isPending || unfollowUserMutation.isPending}
                >
                  Follow
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground text-sm pl-0.5">
            {user.username}
          </p>

        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{user.bio}</p>
        <Separator />
        <div className="flex items-center justify-around">
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold">{user.followersCount}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold">{user.followingCount}</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold">{user.postsCount}</p>
            <p className="text-sm text-muted-foreground">Posts</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
