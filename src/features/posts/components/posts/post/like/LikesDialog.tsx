import { Dialog, DialogContent } from "@/shared/components/ui/dialog";

import { PostLikesDialogContent } from "./PostLikesDialogContent";
import { CommentLikesDialogContent } from "../../../../../comments/components/CommentLikesDialogContent";

interface LikesDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  item: "post" | "comment";
}

export function LikesDialog({ isOpen, setIsOpen, item }: LikesDialogProps) {
  return (
    <div className="flex items-center justify-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {item === "post" ? (
            <PostLikesDialogContent />
          ) : (
            <CommentLikesDialogContent />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
