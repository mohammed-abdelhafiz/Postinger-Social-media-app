import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiError";

interface useOptimisticLike<T> {
  queryKey: unknown[];
  id: string;
  field: keyof T;
  toggleField?: keyof T;
  mutationFn: () => Promise<any>;
}

export const useOptimisticLike = <T>({
  queryKey,
  id,
  field,
  toggleField,
  mutationFn,
}: useOptimisticLike<T>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey, exact: true });
      const prevData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData?.pages) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => {
            if (!page?.data) return page;
            return {
              ...page,
              data: page.data.map((item: any) =>
                item._id === id
                  ? {
                      ...item,
                      [field]: toggleField
                        ? item[toggleField]
                          ? item[field] - 1
                          : item[field] + 1
                        : item[field] + 1,
                      ...(toggleField
                        ? { [toggleField]: !item[toggleField] }
                        : {}),
                    }
                  : item,
              ),
            };
          }),
        };
      });
      return { prevData };
    },
    onError: (error, _vars, context) => {
      if (context?.prevData)
        queryClient.setQueryData(queryKey, context.prevData);

      if (error instanceof ApiError) toast.error(error.message);
      else toast.error("Unexpected error occurred");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey, exact: true });
    },
  });
};
