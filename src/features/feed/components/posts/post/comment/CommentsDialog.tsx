import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCommentForm from "./AddCommentForm";
import { CommentsList } from "./CommentsList";

import { usePostContext } from "@/features/feed/contexts/PostContext";
import { useRef } from "react";

interface CommentsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function CommentsDialog({
  isOpen,
  setIsOpen,
}: CommentsDialogProps) {
  const { post } = usePostContext();
    const newCommentInputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex items-center justify-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
            <DialogDescription>
              {post.commentsCount} comments
            </DialogDescription>
          </DialogHeader>
          <AddCommentForm newCommentInputRef={newCommentInputRef} />  
          <CommentsList newCommentInputRef={newCommentInputRef} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
