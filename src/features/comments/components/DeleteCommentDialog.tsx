import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useDeleteComment } from "@/features/comments/hooks/useDeleteComment";
import { AlertTriangleIcon } from "lucide-react";
import { useCommentContext } from "../context/CommentContext";

interface DeleteCommentDialogProps {
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function DeleteCommentDialog({
  open,
  setIsOpen,
}: DeleteCommentDialogProps) {
  const { comment } = useCommentContext();
  const deleteCommentMutation = useDeleteComment();
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="bg-destructive/10 text-destructive rounded-full flex size-10 shrink-0 items-center justify-center">
              <AlertTriangleIcon className="size-5" />
            </div>
            <div className="flex flex-col gap-2">
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the
                comment and all associated data.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() =>
              deleteCommentMutation.mutate(
                { commentId: comment._id,postId:comment.postId },
                {
                  onSuccess: () => setIsOpen(false),
                },
              )
            }
            disabled={deleteCommentMutation.isPending}
          >
            {deleteCommentMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
