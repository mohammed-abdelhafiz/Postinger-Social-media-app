import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { AlertCircle } from "lucide-react";

export function PostsError({ refetch }: { refetch: () => void }) {
  return (
    <Empty className="bg-muted">
      <EmptyHeader>
        <EmptyTitle className="text-[16px] font-semibold flex items-center gap-1">
          Something went wrong
          <AlertCircle className="text-destructive mt-0.5" size={18} />
        </EmptyTitle>
        <EmptyDescription>
          We're having trouble loading posts right now.
          <br />
          Please try again later.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          className="w-1/2 mx-auto cursor-pointer"
          onClick={() => refetch()}
        >
          Try again
        </Button>
      </EmptyContent>
    </Empty>
  );
}
