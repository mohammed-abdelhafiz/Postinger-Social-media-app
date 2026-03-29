import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";

export const useCustomInfiniteQuery = <
  T extends object | undefined,
  D extends object,
>({
  queryKey,
  queryFn,
  extraParams,
}: {
  queryKey: QueryKey;
  queryFn: (
    params: { pageParam: number } & T,
  ) => Promise<{ data: D[]; hasNextPage: boolean; nextPage: number }>;
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
  });
};
