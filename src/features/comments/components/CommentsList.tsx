import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver";
import { CommentCard } from "./CommentCard";
import { NoComments } from "./NoComments";
import { useEffect } from "react";
import { CommentsError } from "./CommentsError";
import { CommentsSkeleton } from "./CommentsSkeleton";

import { usePostContext } from "@/features/posts/context/PostContext";
import { useCustomInfiniteQuery } from "@/shared/hooks/useCustomInfiniteQuery";
import { getComments } from "../services/commentsApi";
import { CommentProvider } from "../context/CommentContext";
import { Comment } from "../types";

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
  } = useCustomInfiniteQuery<{ postId: string }, Comment>({
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
