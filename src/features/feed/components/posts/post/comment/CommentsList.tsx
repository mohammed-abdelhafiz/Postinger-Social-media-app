import { useGetCommentsQuery } from "@/features/feed/hooks/useGetCommentsQuery";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { CommentCard } from "./CommentCard";
import { Comment } from "@/features/feed/types/feed.types";
import { NoComments } from "./NoComments";
import { useEffect } from "react";
import { CommentsError } from "./CommentsError";
import { CommentsSkeleton } from "./CommentsSkeleton";

interface CommentsListProps {
  postId: string;
}
export const CommentsList = ({ postId }: CommentsListProps) => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCommentsQuery(postId);

  const { isIntersecting, ref } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return <CommentsError refetch={refetch} />;
  }
  if (isLoading) {
    return <CommentsSkeleton />;
  }
  const comments = data?.pages.flatMap((page) => page) || [];

  return (
    <div className="no-scrollbar px-6 -mx-6 max-h-[50vh] overflow-y-auto space-y-6">
      {comments.length > 0 ? (
        <>
          {comments.map((comment: Comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
          {isFetchingNextPage && <CommentsSkeleton />}
          <div ref={ref} className="h-4 w-full" />
        </>
      ) : (
        <NoComments />
      )}
    </div>
  );
};
