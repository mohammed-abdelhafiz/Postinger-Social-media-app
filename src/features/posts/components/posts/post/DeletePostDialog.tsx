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
import { usePostContext } from "@/features/posts/context/PostContext";
import { useDeletePost } from "@/features/posts/hooks/useDeletePost";
import { AlertTriangleIcon } from "lucide-react";

interface DeletePostDialogProps {
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function DeletePostDialog({ open, setIsOpen }: DeletePostDialogProps) {
  const { post } = usePostContext();
  const deletePostMutation = useDeletePost();
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
                post and all associated data.
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
              deletePostMutation.mutate(
                { postId: post._id },
                {
                  onSuccess: () => setIsOpen(false),
                },
              )
            }
            disabled={deletePostMutation.isPending}
          >
            {deletePostMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
