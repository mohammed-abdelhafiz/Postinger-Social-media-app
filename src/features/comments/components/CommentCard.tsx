import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { timeAgo } from "@/shared/lib/helperFuns";
import { Dot } from "lucide-react";
import { CommentCardActions } from "./CommentCardActions";
import { useAuthStore } from "@/shared/store/auth.store";
import { useCommentContext } from "../context/CommentContext";
import { LikeButton } from "../../posts/components/LikeButton";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { LikesDialog } from "../../posts/components/posts/post/like/LikesDialog";
import { useLikeComment } from "../hooks/useLikeComment";
import { useUnlikeComment } from "../hooks/useUnlikeComment";

export const CommentCard = () => {
  const user = useAuthStore((s) => s.user);
  const { comment } = useCommentContext();
  const likeCommentMutation = useLikeComment();
  const unlikeCommentMutation = useUnlikeComment();
  const isLiked = comment.isLiked;
  const [isCommentLikesDialogOpen, setIsCommentLikesDialogOpen] =
    useState(false);

  const handleLike = () => {
    likeCommentMutation.mutate({
      commentId: comment._id,
      postId: comment.postId,
    });
  };
  const handleUnlike = () => {
    unlikeCommentMutation.mutate({
      commentId: comment._id,
      postId: comment.postId,
    });
  };
  return (
    <div className="flex gap-2 items-start group">
      <Avatar>
        <AvatarImage src={comment.author.avatar.url} />
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
          handleUnlike={handleUnlike}
          handleLike={handleLike}
          disabled={
            likeCommentMutation.isPending || unlikeCommentMutation.isPending
          }
        />
        <Button
          variant="link"
          className="text-sm text-muted-foreground"
          onClick={() => setIsCommentLikesDialogOpen(true)}
        >
          {comment.likesCount} {comment.likesCount === 1 ? "like" : "likes"}
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
