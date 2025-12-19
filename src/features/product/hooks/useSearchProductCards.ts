import { useDelayedProducts } from "./useDelayedProducts";
import { useLiveProducts } from "./useLiveProducts";

// 전체 검색 기능은 추후 기능 도입 될 예정
interface ProductSearchState {
  auctionType: AuctionType;
  params: SearchParams;
}

export function useSearchProductCards(search: ProductSearchState) {
  const { auctionType, params } = search;

  const isLive = auctionType === "LIVE";
  const isDelayed = auctionType === "DELAYED";
  const isAll = auctionType === "ALL";

  const hasSearchCondition =
    !!params.name || !!params.category || !!params.minBidPrice || !!params.maxBidPrice;

  const liveQuery = useLiveProducts(params, {
    enabled: (isLive || isAll) && hasSearchCondition,
  });

  const delayedQuery = useDelayedProducts(params, {
    enabled: (isDelayed || isAll) && hasSearchCondition,
  });

  const liveCards = liveQuery.data ?? [];

  const delayedCards = delayedQuery.data ?? [];

  return {
    cards: isLive ? liveCards : isDelayed ? delayedCards : [...liveCards, ...delayedCards],
    isLoading: liveQuery.isLoading || delayedQuery.isLoading,
    isFetching: liveQuery.isFetching || delayedQuery.isFetching,
    isError: liveQuery.isError || delayedQuery.isError,
    error: liveQuery.error ?? delayedQuery.error,
    // totalCount: (liveQuery.data?.totalCount ?? 0) + (delayedQuery.data?.totalCount ?? 0),
  };
}
