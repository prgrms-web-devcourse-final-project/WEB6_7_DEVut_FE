import { useQuery } from "@tanstack/react-query";
import { getDelayedProducts } from "../api/delayProduct.api";

export function useDelayedProducts(params: GetProductsParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["delayedProducts", params],
    queryFn: () => getDelayedProducts(params),
    enabled: options?.enabled,
    placeholderData: prev => prev,
  });
}
