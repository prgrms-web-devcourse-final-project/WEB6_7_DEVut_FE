import { useInfiniteQuery } from "@tanstack/react-query";
import { useDelayedProducts } from "./useDelayedProducts";
import { useLiveProducts } from "./useLiveProducts";
import { getDelayedProducts } from "../api/product.client.api";

// 전체 검색 기능은 추후 기능 도입 될 예정
interface ProductSearchState {
  auctionType: AuctionType;
  params: GetProductsParams;
}

export function useSearchProductCards(search: ProductSearchState) {
  const { auctionType, params } = search;

  // const isLive = auctionType === "LIVE";
  // const isDelayed = auctionType === "DELAYED";
  // const isAll = auctionType === "ALL";

  const hasSearchCondition =
    !!params.name || !!params.category || !!params.minBidPrice || !!params.maxBidPrice;

  // const liveQuery = useLiveProducts(params, {
  //   enabled: (isLive || isAll) && hasSearchCondition,
  // });

  const delayedQuery = useDelayedProducts(params, {
    enabled: hasSearchCondition,
    initialData: undefined,
  });

  // const liveCards = liveQuery.data ?? [];

  const delayedCards = delayedQuery.data?.products ?? [];

  return {
    cards: delayedCards,
    isLoading: delayedQuery.isLoading,
    isFetching: delayedQuery.isFetching,
    isError: delayedQuery.isError,
    error: delayedQuery.error,
    totalCount: delayedQuery.data?.totalCount,
    // cards: isLive ? liveCards : isDelayed ? delayedCards : [...liveCards, ...delayedCards],
    // isLoading: liveQuery.isLoading || delayedQuery.isLoading,
    // isFetching: liveQuery.isFetching || delayedQuery.isFetching,
    // isError: liveQuery.isError || delayedQuery.isError,
    // error: liveQuery.error ?? delayedQuery.error,
    // totalCount: (liveQuery.data?.totalCount ?? 0) + (delayedQuery.data?.totalCount ?? 0),
  };
}

export const useSearchProductInfinite = (params: GetProductsParams) => {
  return useInfiniteQuery({
    queryKey: ["search-products", params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getDelayedProducts({
        ...params,
        page: pageParam,
        size: 15,
      }),

    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce((acc, page) => acc + page.products.length, 0);
      return loadedCount < lastPage.totalCount ? allPages.length + 1 : undefined;
    },
  });
};
