import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

interface NoCommentsProps {
  onAddComment?: () => void;
}

export function NoComments({ onAddComment }: NoCommentsProps) {
  return (
    <div className="flex items-center justify-center p-4">
      <Empty className="py-12">
        <EmptyHeader>
          <EmptyTitle>No comments yet</EmptyTitle>
          <EmptyDescription>No comments yet</EmptyDescription>
          <Button className="mt-2 cursor-pointer" onClick={onAddComment}>
            Add your first comment
          </Button>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
