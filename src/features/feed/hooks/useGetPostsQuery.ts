import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../services/feedApi";

export const useGetPostsQuery = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
};