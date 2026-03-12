"use client";
import PostCard from "./PostCard";
import { Post } from "../../types/feed.types";
import { useGetPostsQuery } from "../../hooks/useGetPostsQuery";
import { NoPostsYet } from "./NoPostsYet";

export const Posts = () => {
  const { data: posts } = useGetPostsQuery();
  return (
    <div className="flex flex-col gap-1">
      {posts?.length > 0 ? (
        posts.map((post: Post) => <PostCard key={post._id} post={post} />)
      ) : (
        <NoPostsYet />
      )}
    </div>
  );
};
