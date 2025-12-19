import { useQuery } from "@tanstack/react-query";
import { getDelayedProducts } from "../api/delayProduct.api";

export function useDelayedProducts(params: GetProductsParams) {
  return useQuery({
    queryKey: ["delayedProducts", params],
    queryFn: () => getDelayedProducts(params),
    enabled: !!params.name || !!params.category || !!params.minBidPrice || !!params.maxBidPrice,
    placeholderData: prev => prev,
  });
}
