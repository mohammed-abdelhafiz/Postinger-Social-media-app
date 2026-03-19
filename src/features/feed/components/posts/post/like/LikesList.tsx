import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { LikeCard } from "./LikeCard";
import { useEffect } from "react";

import { LikesError } from "./LikesError";
import { LikesSkeleton } from "./LikesSkeleton";
import { NoLikes } from "./NoLikes";
import { User } from "@/types";
import { useCustomInfiniteQuery } from "@/hooks/useCustomInfiniteQuery";

interface LikesListProps<T extends object> {
  queryKey: unknown[];
  queryFn: (params: { pageParam: number } & T) => Promise<any>;
  extraParams: T;
  item: "post" | "comment";
}

export const LikesList = <T extends object>({
  queryKey,
  queryFn,
  extraParams,
  item,
}: LikesListProps<T>) => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCustomInfiniteQuery({
    queryKey,
    queryFn,
    extraParams,
  });

  const { isIntersecting, ref } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return <LikesError refetch={refetch} />;
  }
  if (isLoading) {
    return <LikesSkeleton />;
  }
  const likes = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="no-scrollbar px-6 -mx-6 max-h-[50vh] overflow-y-auto space-y-6">
      {likes.length > 0 ? (
        <>
          {likes.map((like: User) => (
            <LikeCard key={like._id} like={like} />
          ))}
          {isFetchingNextPage && <LikesSkeleton />}
          <div ref={ref} className="h-4 w-full" />
        </>
      ) : (
        <NoLikes item={item}/>
      )}
    </div>
  );
};
