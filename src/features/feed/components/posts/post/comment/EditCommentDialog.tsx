import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditCommentForm } from "./EditCommentForm";

interface EditCommentDialogProps {
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EditCommentDialog({
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
        <EditCommentForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
