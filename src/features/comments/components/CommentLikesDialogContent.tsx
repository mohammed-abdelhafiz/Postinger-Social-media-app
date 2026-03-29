import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { useCommentContext } from "../context/CommentContext";
import { CommentLikesList } from "./CommentLikesList";

export const CommentLikesDialogContent = () => {
  const { comment } = useCommentContext();

  return (
    <>
      <DialogHeader>
        <DialogTitle>Likes</DialogTitle>
        <DialogDescription>{comment.likesCount} likes</DialogDescription>
      </DialogHeader>
      <CommentLikesList/>
    </>
  );
};
