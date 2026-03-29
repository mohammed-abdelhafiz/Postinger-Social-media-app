import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver";


import { useCustomInfiniteQuery } from "@/shared/hooks/useCustomInfiniteQuery";
import { User } from "@/features/users/types";
import { getCommentLikes } from "../services/commentsApi";
import { useCommentContext } from "../context/CommentContext";
import { LikesSkeleton } from "@/features/posts/components/posts/post/like/LikesSkeleton";
import { LikesError } from "@/features/posts/components/posts/post/like/LikesError";
import { useEffect } from "react";
import { LikeCard } from "@/features/posts/components/posts/post/like/LikeCard";
import { NoLikes } from "@/features/posts/components/posts/post/like/NoLikes";



export const CommentLikesList = () => {
  const { comment } = useCommentContext();
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCustomInfiniteQuery<{ commentId: string, postId: string }, User>({
    queryKey: ["comment-likes", comment._id],
    queryFn: getCommentLikes,
    extraParams: {
      commentId: comment._id,
      postId: comment.postId,
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
        <NoLikes item={"comment"} />
      )}
    </div>
  );
};
