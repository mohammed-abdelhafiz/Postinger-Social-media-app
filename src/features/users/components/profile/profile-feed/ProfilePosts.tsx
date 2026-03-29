import { useCustomInfiniteQuery } from "@/shared/hooks/useCustomInfiniteQuery";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver";
import { Post } from "@/features/posts/types";
import { PostProvider } from "@/features/posts/context/PostContext";
import { PostsSkeleton } from "@/features/posts/components/posts/PostsSkeleton";
import PostCard from "@/features/posts/components/posts/post/PostCard";
import { useEffect } from "react";
import { PostsError } from "@/features/posts/components/posts/PostsError";
import { EmptyProfilePosts } from "./EmptyProfilePosts";
import { getUserPosts } from "@/features/users/services/usersApi";
import { useProfileStore } from "@/shared/store/profile.store";
import { ProfileTab } from "@/features/users/types";

interface ProfilePostsProps {
  username: string;
}

export const ProfilePosts = ({ username }: ProfilePostsProps) => {
  const activeTab = useProfileStore((s) => s.activeTab);
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCustomInfiniteQuery<
    {
      activeTab: ProfileTab;
      username: string;
    },
    Post
  >({
    queryKey: ["profile-posts",username, activeTab],
    queryFn: getUserPosts,
    extraParams: {username, activeTab },
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

  const profilePosts = data?.pages.flatMap((page) => page.data) || [];
  return (
    <div className="flex flex-col gap-1">
      {profilePosts.length > 0 ? (
        <>
          {profilePosts.map((post: Post, index: number) => (
            <PostProvider key={post._id} post={post}>
              <PostCard priority={index < 2} />
            </PostProvider>
          ))}
          {isFetchingNextPage && <PostsSkeleton />}
          {profilePosts.length > 0 && hasNextPage && (
            <div ref={ref} className="h-4 w-full" />
          )}
        </>
      ) : (
        <EmptyProfilePosts activeTab={activeTab} />
      )}
    </div>
  );
};
