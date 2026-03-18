import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCommentContext } from "@/features/feed/contexts/CommentContext";
import { LikesList } from "./LikesList";
import { getCommentLikes } from "@/features/feed/services/feedApi";

export const CommentLikesDialogContent = () => {
  const { comment } = useCommentContext();
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>Likes</DialogTitle>
        <DialogDescription>
          {comment.likesCount} likes
        </DialogDescription>
      </DialogHeader>
      <LikesList
        queryKey={["comment-likes", comment._id]}
        queryFn={getCommentLikes}
        extraParams={{ commentId: comment._id }}
        item="comment"
      />
    </>
  );
};
