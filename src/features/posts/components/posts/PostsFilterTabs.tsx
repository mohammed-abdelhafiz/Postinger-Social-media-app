"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useFeedStore } from "@/shared/store/feed.store";

export function PostsFilterTabs() {
  const { activeTab, setActiveTab } = useFeedStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-8 bg-muted/20 animate-pulse rounded-lg sticky top-0 z-10" />
    );
  }

  return (
    <Tabs
      className="w-full sticky top-0 z-10"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList className="w-full">
        <TabsTrigger value="for-you">For you</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}