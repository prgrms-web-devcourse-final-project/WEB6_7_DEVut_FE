import { mapDelayedProductToCard, mapLiveProductToCard } from "../mapper/productCard";
import { useDelayedProducts } from "./useDelayedProducts";
import { useLiveProducts } from "./useLiveProducts";

// 전체 검색 기능은 추후 기능 도입 될 예정

export function useSearchProductCards(params: SearchParams) {
  const liveQuery = useLiveProducts(params);
  const delayedQuery = useDelayedProducts(params);

  const liveCards = liveQuery.data ? liveQuery.data.liveItems.map(mapLiveProductToCard) : [];

  const delayedCards = delayedQuery.data
    ? delayedQuery.data.delayedItems.map(mapDelayedProductToCard)
    : [];

  return {
    cards: [...liveCards, ...delayedCards],

    isLoading: liveQuery.isLoading || delayedQuery.isLoading,
    isFetching: liveQuery.isFetching || delayedQuery.isFetching,

    isError: liveQuery.isError || delayedQuery.isError,
    error: liveQuery.error ?? delayedQuery.error,

    totalCount: (liveQuery.data?.totalCount ?? 0) + (delayedQuery.data?.totalCount ?? 0),
  };
}
