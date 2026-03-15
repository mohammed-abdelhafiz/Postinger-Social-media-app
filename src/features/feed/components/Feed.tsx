"use client";

import { CreatePostForm } from "./create-post-form/CreatePostForm";
import { PostsFilterTabs } from "./posts/PostsFilterTabs";
import { Posts } from "./posts/Posts";
import { useState } from "react";

export const Feed = () => {
  const [activeTab, setActiveTab] = useState("for-you");
  return (
    <>
      <CreatePostForm />
      <PostsFilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Posts activeTab={activeTab} />
    </>
  );
};
