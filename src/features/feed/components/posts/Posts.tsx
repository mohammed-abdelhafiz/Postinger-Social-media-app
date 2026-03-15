"use client";
import PostCard from "./PostCard";
import { Post } from "../../types/feed.types";
import { useGetPostsQuery } from "../../hooks/useGetPostsQuery";
import { NoPostsYet } from "./NoPostsYet";
import { PostsSkeleton } from "./PostsSkeleton";
import { PostsError } from "./PostsError";

interface PostsProps {
  activeTab: string;
}

export const Posts = ({ activeTab }: PostsProps) => {
  const { data: posts, isLoading, isError,refetch } = useGetPostsQuery({ activeTab });
  if (isError) {
    return <PostsError refetch={refetch} />;
  }
  if (isLoading) {
    return <PostsSkeleton />;
  }
  return (
    <div className="flex flex-col gap-1">
      {posts?.length > 0 ? (
        posts.map((post: Post) => <PostCard key={post._id} post={post} />)
      ) : (
        <NoPostsYet activeTab={activeTab} />
      )}
    </div>
  );
};
