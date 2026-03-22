"use client";
import { useEffect } from "react";
import PostCard from "./post/PostCard";
import { Post } from "../../types/feed.types";
import { NoPostsYet } from "./NoPostsYet";
import { PostsSkeleton } from "./PostsSkeleton";
import { PostsError } from "./PostsError";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useFeedStore } from "@/store/feed.store";
import { PostProvider } from "../../contexts/PostContext";
import { useCustomInfiniteQuery } from "@/hooks/useCustomInfiniteQuery";
import { getPosts } from "../../services/feedApi";

export const Posts = () => {
  const { activeTab } = useFeedStore();
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCustomInfiniteQuery({
    queryKey: ["posts", activeTab],
    queryFn: getPosts,
    extraParams: { activeTab },
  });

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

  const posts = data?.pages.flatMap((page) => page.data) || [];
  return (
    <div className="flex flex-col gap-1">
      {posts.length > 0 ? (
        <>
          {posts.map((post: Post, index: number) => (
            <PostProvider key={post._id} post={post}>
              <PostCard priority={index < 2} />
            </PostProvider>
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
