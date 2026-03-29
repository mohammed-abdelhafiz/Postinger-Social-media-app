import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { AlertTriangleIcon } from "lucide-react";

export function LikesError({ refetch }: { refetch: () => void }) {
  return (
    <div className="p-4">
      <Empty className="bg-muted">
        <EmptyHeader>
          <EmptyTitle className="text-[16px] font-semibold flex items-center gap-1">
            Something went wrong
            <div className="bg-destructive/10 text-destructive rounded-full flex size-6 shrink-0 items-center justify-center">
              <AlertTriangleIcon className="size-5" aria-hidden="true" />
            </div>
          </EmptyTitle>
          <EmptyDescription>
            We're having trouble loading likes right now.
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
    </div>
  );
}
