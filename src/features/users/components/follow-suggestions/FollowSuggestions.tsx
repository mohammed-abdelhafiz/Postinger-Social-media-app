"use client";
import { useCustomInfiniteQuery } from "@/shared/hooks/useCustomInfiniteQuery";
import { getFollowSuggestions } from "@/features/users/services/usersApi";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver";
import { useEffect } from "react";
import { FollowSuggestionCard } from "@/features/users/components/suggestions-card/FollowSuggestionCard";
import { FollowSuggestionsSkeleton } from "./FollowSuggestionsSkeleton";
import { FollowSuggestionError } from "./FollowSuggestionError";
import { NoFollowSuggestions } from "./NoFollowSuggestions";
import { User } from "../../types";

export const FollowSuggestions = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCustomInfiniteQuery<undefined, User>({
    queryKey: ["users", "follow-suggestions"],
    queryFn: getFollowSuggestions,
  });

  const { isIntersecting, ref } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return <FollowSuggestionError refetch={refetch} />;
  }
  if (isLoading) {
    return <FollowSuggestionsSkeleton />;
  }

  const followSuggestions = data?.pages.flatMap((page) => page.data) || [];
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-10 xl:grid-cols-4 overflow-y-auto hide-scrollbar flex-1 py-4">
      {followSuggestions.length > 0 ? (
        <>
          {followSuggestions.map((user) => (
            <FollowSuggestionCard key={user._id} user={user} />
          ))}
          <div ref={ref} className="h-4 w-full" />
        </>
      ) : (
        <NoFollowSuggestions className="col-span-full" />
      )}
    </div>
  );
};
