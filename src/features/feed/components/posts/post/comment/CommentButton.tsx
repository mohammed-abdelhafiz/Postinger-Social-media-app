import { Button } from "@/components/ui/button";
import { Post } from "@/features/feed/types/feed.types";
import {
  MessageCircleMore,
  MessageSquare,
  MessageSquareMore,
  Reply,
} from "lucide-react";
import { CommentsDialog } from "./CommentsDialog";
import { useState } from "react";

interface CommentButtonProps {
  post: Post;
}
export const CommentButton = ({ post }: CommentButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        className="rounded-full cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
        aria-label="Open comments"
      >
        <MessageSquare />
      </Button>{" "}
      <CommentsDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        post={post}
      />
    </>
  );
};
