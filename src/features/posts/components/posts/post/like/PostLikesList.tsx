import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver";
import { LikeCard } from "./LikeCard";
import { useEffect } from "react";

import { LikesError } from "./LikesError";
import { LikesSkeleton } from "./LikesSkeleton";
import { NoLikes } from "./NoLikes";
import { useCustomInfiniteQuery } from "@/shared/hooks/useCustomInfiniteQuery";
import { User } from "@/features/users/types";
import { usePostContext } from "@/features/posts/context/PostContext";
import { getPostLikes } from "@/features/posts/services/postsApi";

export const PostLikesList = () => {
  const { post } = usePostContext();
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCustomInfiniteQuery<{ postId: string }, User>({
    queryKey: ["post-likes", post._id],
    queryFn: getPostLikes,
    extraParams: {
      postId: post._id,
    },
  });

  const { isIntersecting, ref } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return <LikesError refetch={refetch} />;
  }
  if (isLoading) {
    return <LikesSkeleton />;
  }
  const likes = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="no-scrollbar px-6 -mx-6 max-h-[50vh] overflow-y-auto space-y-6">
      {likes.length > 0 ? (
        <>
          {likes.map((like: User) => (
            <LikeCard key={like._id} like={like} />
          ))}
          {isFetchingNextPage && <LikesSkeleton />}
          <div ref={ref} className="h-4 w-full" />
        </>
      ) : (
        <NoLikes item={"post"} />
      )}
    </div>
  );
};
