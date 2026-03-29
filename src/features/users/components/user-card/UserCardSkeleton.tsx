import { Avatar } from "@/shared/components/ui/avatar";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

const UserCardSkeleton = () => {
  return (
    <Card
      className="border rounded-md shadow-lg"
      aria-busy="true"
      aria-label="Loading user information"
    >
      <CardContent className="flex flex-col gap-4 items-center">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="h-16 w-16 overflow-hidden">
            <Skeleton className="h-full w-full" />
          </Avatar>
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-6 w-4/5" />
      </CardContent>
    </Card>
  );
};

export default UserCardSkeleton;
