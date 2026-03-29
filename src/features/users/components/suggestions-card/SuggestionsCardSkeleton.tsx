import { Skeleton } from "@/shared/components/ui/skeleton";

export function SuggestionsCardSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <li className="py-4 sm:py-4" key={i}>
          <div className="flex items-center gap-2">
            <div className="shrink-0">
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <div className="flex-1 min-w-0 ms-2">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-8 w-16" />
          </div>
        </li>
      ))}
    </>
  );
}
