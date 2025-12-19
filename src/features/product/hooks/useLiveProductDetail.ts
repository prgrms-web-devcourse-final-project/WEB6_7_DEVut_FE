import { useQuery } from "@tanstack/react-query";
import { getLiveProduct } from "../api/product.client.api";

export const useLiveProductDetail = (productId: number) =>
  useQuery({
    queryKey: ["liveProductDetail", productId],
    queryFn: async () => {
      const data = await getLiveProduct(productId);
      return data;
    },
    enabled: !!productId,
  });
