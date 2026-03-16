import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../services/feedApi";

export const useGetCommentsQuery = (postId: string) => {
  return useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) => getComments(postId, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });
};