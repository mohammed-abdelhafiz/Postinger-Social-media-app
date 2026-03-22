"use client";

import { CreatePostForm } from "./create-post-form/CreatePostForm";
import { PostsFilterTabs } from "./posts/PostsFilterTabs";
import { Posts } from "./posts/Posts";

export const Feed = () => {
  return (
    <div className="flex-1 space-y-1 overflow-y-auto pr-1.5 hide-scrollbar">
      <CreatePostForm />
      <PostsFilterTabs />
      <Posts />
    </div>
  );
};
