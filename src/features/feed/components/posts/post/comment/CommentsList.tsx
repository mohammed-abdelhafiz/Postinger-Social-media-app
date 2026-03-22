import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { CommentCard } from "./CommentCard";
import { Comment } from "@/features/feed/types/feed.types";
import { NoComments } from "./NoComments";
import { useEffect } from "react";
import { CommentsError } from "./CommentsError";
import { CommentsSkeleton } from "./CommentsSkeleton";

import { usePostContext } from "@/features/feed/contexts/PostContext";
import { CommentProvider } from "@/features/feed/contexts/CommentContext";
import { useCustomInfiniteQuery } from "@/hooks/useCustomInfiniteQuery";
import { getComments } from "@/features/feed/services/feedApi";

interface CommentsListProps {
  newCommentInputRef: React.RefObject<HTMLTextAreaElement | null>;
}

export const CommentsList = ({ newCommentInputRef }: CommentsListProps) => {
  const { post } = usePostContext();
  const postId = post._id;
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCustomInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: getComments,
    extraParams: { postId },
  });

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
  const comments = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="no-scrollbar px-6 -mx-6 max-h-[50vh] overflow-y-auto space-y-6">
      {comments.length > 0 ? (
        <>
          {comments.map((comment: Comment) => (
            <CommentProvider key={comment._id} comment={comment}>
              <CommentCard />
            </CommentProvider>
          ))}
          {isFetchingNextPage && <CommentsSkeleton />}
          <div ref={ref} className="h-4 w-full" />
        </>
      ) : (
        <NoComments newCommentInputRef={newCommentInputRef} />
      )}
    </div>
  );
};
