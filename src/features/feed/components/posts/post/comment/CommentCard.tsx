import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "@/lib/helperFuns";
import { Dot } from "lucide-react";
import { CommentCardActions } from "./CommentCardActions";
import { useAuthStore } from "@/store/auth.store";
import { useCommentContext } from "@/features/feed/contexts/CommentContext";
import { useOptimisticLike } from "@/features/feed/hooks/useOptimisticLike";
import { likeComment } from "@/features/feed/services/feedApi";
import { LikeButton } from "../../../LikeButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LikesDialog } from "../like/LikesDialog";

export const CommentCard = () => {
  const user = useAuthStore((s) => s.user);
  const { comment } = useCommentContext();
  const likeCommentMutation = useOptimisticLike({
    queryKey: ["comments", comment.postId],
    id: comment._id,
    field: "likesCount",
    toggleField: "likedByCurrentUser",
    mutationFn: () => likeComment(comment._id),
  });
  const isLiked = comment.likedByCurrentUser;
  const [isCommentLikesDialogOpen, setIsCommentLikesDialogOpen] =
    useState(false);
  return (
    <div className="flex gap-2 items-start group">
      <Avatar>
        <AvatarImage src={comment.author.avatar} />
        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center">
          <p className="font-semibold">{comment.author.name}</p>
          <Dot className="size-4" />
          <p className="text-xs text-muted-foreground">
            {timeAgo(comment.createdAt)}
          </p>
          {comment.author._id === user?._id && (
            <div className="opacity-0 group-hover:opacity-100 p-1">
              <CommentCardActions />
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground wrap-anywhere">
          {comment.content}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <LikeButton
          isLiked={isLiked}
          handleLike={() => likeCommentMutation.mutate()}
          disabled={likeCommentMutation.isPending}
        />
        <Button
          variant="link"
          className="text-sm text-muted-foreground"
          onClick={() => setIsCommentLikesDialogOpen(true)}
        >
          {comment.likesCount} likes
        </Button>
        <LikesDialog
          isOpen={isCommentLikesDialogOpen}
          setIsOpen={setIsCommentLikesDialogOpen}
          item="comment"
        />
      </div>
    </div>
  );
};
