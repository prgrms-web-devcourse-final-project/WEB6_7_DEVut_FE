import { useQuery } from "@tanstack/react-query";
import { getLiveProducts } from "../api/product.client.api";

export function useLiveProducts(params: GetProductsParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["liveProducts", params],
    queryFn: () => getLiveProducts(params),
    enabled: options?.enabled,
    placeholderData: prev => prev,
  });
}
