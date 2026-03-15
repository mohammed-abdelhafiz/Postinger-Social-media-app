"use client";
import { useEffect } from "react";
import PostCard from "./PostCard";
import { Post } from "../../types/feed.types";
import { useGetPostsQuery } from "../../hooks/useGetPostsQuery";
import { NoPostsYet } from "./NoPostsYet";
import { PostsSkeleton } from "./PostsSkeleton";
import { PostsError } from "./PostsError";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface PostsProps {
  activeTab: string;
}

export const Posts = ({ activeTab }: PostsProps) => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPostsQuery({ activeTab });

  const { isIntersecting, ref } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return <PostsError refetch={refetch} />;
  }
  if (isLoading) {
    return <PostsSkeleton />;
  }

  const posts = data?.pages.flatMap((page) => page) || [];

  return (
    <div className="flex flex-col gap-1">
      {posts.length > 0 ? (
        <>
          {posts.map((post: Post) => (
            <PostCard key={post._id} post={post} />
          ))}
          {isFetchingNextPage && <PostsSkeleton />}
          <div ref={ref} className="h-4 w-full" />
        </>
      ) : (
        <NoPostsYet activeTab={activeTab} />
      )}
    </div>
  );
};
