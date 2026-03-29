import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { EditPostForm } from "./EditPostForm";

interface EditPostDialogProps {
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EditPostDialog({ open, setIsOpen }: EditPostDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Make changes to the post here. Click save when you&apos;re done.
            Your post will be updated immediately.
          </DialogDescription>
        </DialogHeader>
        <EditPostForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
