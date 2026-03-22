import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import { PostLikesDialogContent } from "./PostLikesDialogContent";
import { CommentLikesDialogContent } from "./CommentLikesDialogContent";

interface LikesDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  item: "post" | "comment";
}

export function LikesDialog({ isOpen, setIsOpen, item }: LikesDialogProps) {
  return (
    <div className="flex items-center justify-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
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
