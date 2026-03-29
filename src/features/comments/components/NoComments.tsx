import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/components/ui/empty";

interface NoCommentsProps {
  newCommentInputRef: React.RefObject<HTMLTextAreaElement | null>;
}

export function NoComments({ newCommentInputRef }: NoCommentsProps) {
  const handleAddComment = () => {
    newCommentInputRef.current?.focus();
  };
  return (
    <div className="flex items-center justify-center p-4">
      <Empty className="py-12">
        <EmptyHeader>
          <EmptyTitle>No comments yet</EmptyTitle>
          <EmptyDescription>No comments yet</EmptyDescription>
          <Button className="mt-2 cursor-pointer" onClick={handleAddComment}>
            Add your first comment
          </Button>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
