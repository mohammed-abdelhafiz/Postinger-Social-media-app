"use client";
import { useEffect } from "react";
import PostCard from "./post/PostCard";
import { Post } from "../../types";
import { NoPostsYet } from "./NoPostsYet";
import { PostsSkeleton } from "./PostsSkeleton";
import { PostsError } from "./PostsError";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver";
import { useFeedStore } from "@/shared/store/feed.store";
import { PostProvider } from "../../context/PostContext";
import { useCustomInfiniteQuery } from "@/shared/hooks/useCustomInfiniteQuery";
import { getFeedPosts } from "../../services/postsApi";

export const FeedPosts = () => {
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
    queryKey: ["feed-posts", activeTab],
    queryFn: getFeedPosts,
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

  const feedPosts: Post[] =
    data?.pages.flatMap((page) => page.data as Post[]) || [];
  return (
    <div className="flex flex-col gap-1">
      {feedPosts.length > 0 ? (
        <>
          {feedPosts.map((post: Post, index: number) => (
            <PostProvider key={post._id} post={post}>
              <PostCard priority={index < 2} />
            </PostProvider>
          ))}
          {isFetchingNextPage && <PostsSkeleton />}
          {feedPosts.length > 0 && hasNextPage && (
            <div ref={ref} className="h-4 w-full" />
          )}
        </>
      ) : (
        <NoPostsYet activeTab={activeTab} />
      )}
    </div>
  );
};
