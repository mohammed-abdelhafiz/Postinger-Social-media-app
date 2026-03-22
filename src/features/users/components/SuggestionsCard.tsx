"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import { useCustomInfiniteQuery } from "@/hooks/useCustomInfiniteQuery";
import { getFollowSuggestions } from "../services/usersApi";
import { SuggestionsCardSkeleton } from "./SuggestionsCardSkeleton";
import { SuggestionsCardError } from "./SuggestionsCardError";
import { EmptySuggestionCard } from "./EmptySuggestionCard";
import { useFollowUser } from "../hooks/useFollowUser";

export function SuggestionsCard() {
  const { data, isLoading, isError, refetch } = useCustomInfiniteQuery({
    queryKey: ["users", "follow-suggestions"],
    queryFn: getFollowSuggestions,
  });

  const { mutate: followUser, isPending: isFollowing } = useFollowUser();
  const followSuggestions = data?.pages.flatMap((page) => page.data) || [];
  return (
    <Card className="border rounded-md shadow-lg">
      <CardContent className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h5 className="font-semibold leading-none">Who to follow</h5>
          <Link
            href="/follow"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            See all
          </Link>
        </div>
        <div className="flex-1 min-h-0">
          {isLoading ? (
            <ul role="list" className="divide-y divide-default">
              <SuggestionsCardSkeleton />
            </ul>
          ) : isError ? (
            <SuggestionsCardError refetch={refetch} />
          ) : followSuggestions.length > 0 ? (
            <ul role="list" className="divide-y divide-default">
              {followSuggestions.slice(0, 3).map((suggestion) => (
                <li className="py-4 sm:py-4" key={suggestion._id}>
                  <div className="flex items-center gap-2">
                    <div className="shrink-0">
                      <Avatar>
                        <AvatarImage
                          src={suggestion.avatar?.url}
                          alt={suggestion.name}
                        />
                        <AvatarFallback>
                          {suggestion.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0 ms-2">
                      <h6 className="truncate text-sm font-semibold">
                        {suggestion.name}
                      </h6>
                      <p className="text-sm pl-0.5 text-muted-foreground truncate">
                        @{suggestion.username}
                      </p>
                    </div>
                    <Button
                      variant="default"
                      className="cursor-pointer"
                      aria-label={`Follow ${suggestion.name}`}
                      disabled={isFollowing}
                      onClick={() => {
                        followUser({ userId: suggestion._id });
                      }}
                    >
                      Follow
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptySuggestionCard />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
