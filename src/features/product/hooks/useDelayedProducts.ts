import { useQuery } from "@tanstack/react-query";
import { getDelayedProducts } from "../api/product.client.api";

export function useDelayedProducts(
  params: GetProductsParams,
  options?: { enabled?: boolean; initialData: ProductsResponse | undefined }
) {
  return useQuery({
    queryKey: ["delayedProducts", params],
    queryFn: () => getDelayedProducts(params),
    enabled: options?.enabled,
    initialData: options?.initialData,
    placeholderData: prev => prev,
  });
}
