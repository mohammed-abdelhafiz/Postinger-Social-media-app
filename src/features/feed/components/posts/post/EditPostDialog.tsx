import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Post } from "@/features/feed/types/feed.types";
import { EditPostForm } from "./EditPostForm";
import { usePostContext } from "@/features/feed/contexts/PostContext";

interface EditPostDialogProps {
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EditPostDialog({ open, setIsOpen }: EditPostDialogProps) {
  const { post } = usePostContext();
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
        <EditPostForm setIsOpen={setIsOpen}/>
      </DialogContent>
    </Dialog>
  );
}
