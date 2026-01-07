import { useQuery } from "@tanstack/react-query";
import { DelayHotProducts } from "../api/product.client.api";

export function useDelayedHotProducts(options?: { initialData: ProductCardType[] | undefined }) {
  return useQuery({
    queryKey: ["hot-delayedProducts"],
    queryFn: DelayHotProducts,
    initialData: options?.initialData,
  });
}
