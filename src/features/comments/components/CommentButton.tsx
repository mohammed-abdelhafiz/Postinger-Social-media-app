import { Button } from "@/shared/components/ui/button";
import { MessageSquare } from "lucide-react";
import { CommentsDialog } from "./CommentsDialog";

interface CommentButtonProps {
  isCommentsDialogOpen: boolean;
  setIsCommentsDialogOpen: (open: boolean) => void;
}

export const CommentButton = ({
  isCommentsDialogOpen,
  setIsCommentsDialogOpen,
}: CommentButtonProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        className="rounded-full cursor-pointer"
        onClick={() => setIsCommentsDialogOpen(true)}
        aria-label="Open comments"
      >
        <MessageSquare />
      </Button>{" "}
      <CommentsDialog
        isOpen={isCommentsDialogOpen}
        setIsOpen={setIsCommentsDialogOpen}
      />
    </>
  );
};
