"use client";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ProfileTab } from "../../../types";
import { ProfilePosts } from "./ProfilePosts";
import { CreatePostForm } from "@/features/posts/components/create-post-form/CreatePostForm";
import { useProfileStore } from "@/shared/store/profile.store";

interface ProfileFeedProps {
  username: string;
}

export const ProfileFeed = ({ username }: ProfileFeedProps) => {
  const activeTab = useProfileStore((s) => s.activeTab);
  const setActiveTab = useProfileStore((s) => s.setActiveTab);
  return (
    <Card className="border md:w-7/12 w-full p-1">
      <CardHeader className="p-0">
        <CreatePostForm />
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
      <CardContent className="overflow-y-auto hide-scrollbar">
        <ProfilePosts username={username}/>
      </CardContent>
    </Card>
  );
};
