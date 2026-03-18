"use client";

import { CreatePostForm } from "./create-post-form/CreatePostForm";
import { PostsFilterTabs } from "./posts/PostsFilterTabs";
import { Posts } from "./posts/Posts";

export const Feed = () => {
  return (
    <>
      <CreatePostForm />
      <PostsFilterTabs />
      <Posts />
    </>
  );
};
