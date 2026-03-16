import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Post } from "@/features/feed/types/feed.types";
import AddCommentForm from "./AddCommentForm";
import { CommentsList } from "./CommentsList";

interface CommentsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  post: Post;
}

export function CommentsDialog({
  isOpen,
  setIsOpen,
  post,
}: CommentsDialogProps) {
  return (
    <div className="flex items-center justify-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
            <DialogDescription>
              {post.comments.length} comments
            </DialogDescription>
          </DialogHeader>
          <AddCommentForm postId={post._id} />
          <CommentsList postId={post._id} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
