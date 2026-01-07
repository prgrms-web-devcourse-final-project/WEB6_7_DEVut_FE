import { useQuery } from "@tanstack/react-query";
import { LiveHotProducts } from "../api/product.client.api";

export function useLiveHotProducts(options?: { initialData: ProductCardType[] | undefined }) {
  return useQuery({
    queryKey: ["hot-liveProducts"],
    queryFn: LiveHotProducts,
    initialData: options?.initialData,
  });
}
