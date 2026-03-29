import { Skeleton } from "@/shared/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";

export const PostsSkeleton = () => {
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card
          key={i}
          className="w-full bg-linear-to-br from-background/5 to-background/2
     border border-foreground/10
     shadow-sm
    "
        >
          <CardHeader className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-6 w-2" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pl-16">
            <Skeleton className="h-4 w-24 mt-2" />
            <Skeleton className="rounded-md w-11/12 h-48" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
