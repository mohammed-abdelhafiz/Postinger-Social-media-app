"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ProfileTab } from "../../../types";
import { ProfilePosts } from "./ProfilePosts";
import { CreatePostForm } from "@/features/posts/components/create-post-form/CreatePostForm";
import { useProfileStore } from "@/shared/store/profile.store";
import { useAuthStore } from "@/shared/store/auth.store";

interface ProfileFeedProps {
  username: string;
}

export const ProfileFeed = ({ username }: ProfileFeedProps) => {
  const activeTab = useProfileStore((s) => s.activeTab);
  const setActiveTab = useProfileStore((s) => s.setActiveTab);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const currentUser = useAuthStore((s) => s.user);
  const isOwner = currentUser?.username === username;

  return (
    <Card className="border md:w-7/12 w-full p-1 border-border/50">
      <CardHeader className="p-0">
        {mounted && isOwner && <CreatePostForm />}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ProfileTab)}
        >
          <TabsList className="w-full">
            <TabsTrigger value="posted">{username}&apos;s Posts</TabsTrigger>
            <TabsTrigger value="liked">Liked</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="overflow-y-auto hide-scrollbar p-2">
        <ProfilePosts username={username} />
      </CardContent>
    </Card>
  );
};
