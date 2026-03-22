import { Skeleton } from "@/components/ui/skeleton";

export const LikesSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-1/3 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};
