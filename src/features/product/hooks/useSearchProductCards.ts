import { useInfiniteQuery } from "@tanstack/react-query";
import { getALLProducts } from "../api/product.client.api";

export const useSearchProductInfinite = (params: GetProductsAllParams) => {
  return useInfiniteQuery({
    queryKey: ["search-products", params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getALLProducts({
        ...params,
        page: pageParam,
        size: 15,
      }),

    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce((acc, page) => acc + page.auctions.length, 0);
      return loadedCount < lastPage.totalCount ? allPages.length + 1 : undefined;
    },
  });
};
