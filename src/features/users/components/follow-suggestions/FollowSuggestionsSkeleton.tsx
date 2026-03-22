import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const FollowSuggestionsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-10 xl:grid-cols-4 overflow-y-auto hide-scrollbar flex-1 py-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <Card key={i} className="py-0 overflow-visible">
          <CardContent className="px-0 overflow-hidden rounded-xl">
            <Skeleton className="h-40 w-full" />
            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="h-10 mt-4 text-muted-foreground flex flex-col gap-1">
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-6 w-full mx-auto cursor-pointer" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
