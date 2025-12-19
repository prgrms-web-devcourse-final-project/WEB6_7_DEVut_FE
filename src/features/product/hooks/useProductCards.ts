import { UseQueryResult } from "@tanstack/react-query";

export function useProductCards<T, R>(
  query: UseQueryResult<R>,
  getItems: (data: R) => T[],
  mapper: (item: T) => ProductCardType
) {
  const cards = query.data ? getItems(query.data).map(mapper) : [];

  return {
    ...query,
    cards,
  };
}
