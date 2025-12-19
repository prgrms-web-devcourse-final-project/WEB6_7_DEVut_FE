import { useQuery } from "@tanstack/react-query";
import { getLiveProducts } from "../api/liveProduct.api";

export function useLiveProducts(params: GetProductsParams) {
  console.log("searchParams:", params);

  return useQuery({
    queryKey: ["liveProducts", params],
    queryFn: () => getLiveProducts(params),
    enabled: !!params.name || !!params.category || !!params.minBidPrice || !!params.maxBidPrice,
    placeholderData: prev => prev,
  });
}
