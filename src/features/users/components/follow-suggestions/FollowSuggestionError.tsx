import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { AlertTriangleIcon } from "lucide-react";
export function FollowSuggestionError({ refetch }: { refetch: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <Empty className="max-w-md w-full border-none shadow-none bg-transparent">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-destructive/20 blur-3xl rounded-full" />
            <div className="relative bg-destructive/10 text-destructive rounded-2xl p-6 shadow-sm border border-destructive/20">
              <AlertTriangleIcon className="size-12" />
            </div>
          </div>
          
          <EmptyHeader className="text-center">
            <EmptyTitle className="text-2xl font-bold tracking-tight mb-2">
              Something went wrong
            </EmptyTitle>
            <EmptyDescription className="text-muted-foreground text-base max-w-[280px]">
              We encountered an issue while retrieving your community suggestions.
            </EmptyDescription>
          </EmptyHeader>
          
          <EmptyContent className="w-full pt-4 text-center">
            <Button
              className="w-full sm:w-auto min-w-[200px] h-11 font-semibold shadow-md shadow-primary/20 cursor-pointer"
              onClick={() => refetch()}
            >
              Try Again
            </Button>
          </EmptyContent>
        </div>
      </Empty>
    </div>
  );
}
