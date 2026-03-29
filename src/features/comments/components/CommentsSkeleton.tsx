import { Skeleton } from "@/shared/components/ui/skeleton";
export const CommentsSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};
