import { useInfiniteQuery } from "@tanstack/react-query";

export const useCustomInfiniteQuery = <T extends object>({
  queryKey,
  queryFn,
  extraParams,
}: {
  queryKey: unknown[];
  queryFn: (params: { pageParam: number } & T) => Promise<any>;
  extraParams?: T;
}) => {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      queryFn({
        pageParam,
        ...(extraParams as T),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};