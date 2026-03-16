import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Comment } from "@/features/feed/types/feed.types";
import { EditCommentForm } from "./EditCommentForm";

interface EditCommentDialogProps {
  comment: Comment;
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EditCommentDialog({
  comment,
  open,
  setIsOpen,
}: EditCommentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit comment</DialogTitle>
          <DialogDescription>
            Make changes to the comment here. Click save when you&apos;re done.
            Your comment will be updated immediately.
          </DialogDescription>
        </DialogHeader>
        <EditCommentForm comment={comment} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
