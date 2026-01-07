import { useQuery } from "@tanstack/react-query";
import { DelayMostBidsProducts } from "../api/product.client.api";

export function useDelayedMostBidsProducts(options?: {
  initialData: ProductCardType[] | undefined;
}) {
  return useQuery({
    queryKey: ["mostBid-delayedProducts"],
    queryFn: DelayMostBidsProducts,
    initialData: options?.initialData,
  });
}
