import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Post } from "@/features/feed/types/feed.types";
import { EditPostForm } from "./EditPostForm";

interface EditPostDialogProps {
  post: Post;
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EditPostDialog({ post, open, setIsOpen }: EditPostDialogProps) {
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
        <EditPostForm post={post} setIsOpen={setIsOpen}/>
      </DialogContent>
    </Dialog>
  );
}
