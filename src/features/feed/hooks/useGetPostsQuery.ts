import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../services/feedApi";

export const useGetPostsQuery = (options?: { activeTab: string }) => {
  return useInfiniteQuery({
    queryKey: ["posts", options?.activeTab],
    queryFn: ({ pageParam }) => getPosts(options?.activeTab, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Assuming 10 is the default limit returned by the server
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};