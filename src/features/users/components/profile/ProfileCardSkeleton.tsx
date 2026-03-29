import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export const ProfileCardSkeleton = () => {
  return (
    <Card className="md:w-5/12 w-full p-0 h-fit!">
      <CardHeader className="p-0 w-full h-36 overflow-hidden relative">
        <Skeleton />
      </CardHeader>
      <CardContent className="space-y-4 pb-4">
        <div className="flex justify-between h-10 pl-2">
          <Skeleton className="w-22 h-22 rounded-full overflow-hidden translate-y-[-50%] relative" />
          <Skeleton className="w-24 h-8" />
        </div>
        <div className="flex flex-col">
          <Skeleton className="text-xl font-bold" />
          <Skeleton className="text-muted-foreground text-sm pl-0.5" />
        </div>
        <div className="flex items-center">
          <Skeleton className="w-24 h-8" />
        </div>
        <Skeleton className="h-5 w-11/12 mx-auto" />
        <div className="flex items-center justify-around">
          <Skeleton className="w-12 h-4" />
          <Skeleton className="w-12 h-4" />
          <Skeleton className="w-12 h-4" />
        </div>
      </CardContent>
    </Card>
  );
};
