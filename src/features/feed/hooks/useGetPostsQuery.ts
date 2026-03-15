import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/feedApi";

export const useGetPostsQuery = (options?: { activeTab: string }) => {
  return useQuery({
    queryKey: ["posts", options?.activeTab],
    queryFn: () => getPosts(options?.activeTab),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};