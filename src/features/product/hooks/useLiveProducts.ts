import { useQuery } from "@tanstack/react-query";
import { getLiveProducts, GetLiveProductsParams } from "../api/liveProduct.api";

export function useLiveProducts(params: GetLiveProductsParams) {
  console.log("searchParams:", params);

  return useQuery({
    queryKey: ["liveProducts", params],
    queryFn: () => getLiveProducts(params),
    enabled: !!params.page,
    placeholderData: prev => prev,
  });
}
