"use client";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { Check, Mail } from "lucide-react";
import Image from "next/image";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { useAuthStore } from "@/shared/store/auth.store";
import { ProfileCardSkeleton } from "./ProfileCardSkeleton";
import { notFound } from "next/navigation";
import { ProfileCardError } from "./ProfileCardError";
import { useFollowUser } from "../../hooks/useFollowUser";

interface ProfileCardProps {
  username: string;
}

export const ProfileCard = ({ username }: ProfileCardProps) => {
  const followUserMutation = useFollowUser();
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserProfile(username);
  const authUser = useAuthStore((state) => state.user);
  const isOwner = user?._id === authUser?._id;
  const isFollowing = user?.isFollowing;
  if (isLoading || !authUser) {
    return <ProfileCardSkeleton />;
  }

  if (!user || error?.message === "User not found") {
    return notFound();
  }

  if (isError) {
    return <ProfileCardError refetch={refetch} />;
  }
  const handleFollow = () => {
    followUserMutation.mutate({username});
  };
  return (
    <Card className="md:w-5/12 w-full p-0 h-fit!">
      <CardHeader className="p-0 w-full h-36 overflow-hidden relative">
        <Image src={user.coverImage.url} alt="profile image" fill />
      </CardHeader>
      <CardContent className="space-y-4 pb-4">
        <div className="flex justify-between h-10">
          <div className="w-24 h-24 rounded-full overflow-hidden translate-y-[-65%] relative">
            <Image src={user.avatar.url} alt="profile image" fill />
          </div>
          {isOwner && <Button variant="outline">Edit Profile</Button>}
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground text-sm pl-0.5">
            {user.username}
          </p>
        </div>
        {!isOwner && (
          <div className="flex items-center">
            {isFollowing ? (
              <Button className="w-24" variant="outline">
                Following <Check />
              </Button>
            ) : (
              <Button className="w-24" onClick={handleFollow}>
                Follow
              </Button>
            )}
            <Button variant="ghost" size="icon-lg" aria-label="Send message">
              <Mail />
            </Button>
          </div>
        )}
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
