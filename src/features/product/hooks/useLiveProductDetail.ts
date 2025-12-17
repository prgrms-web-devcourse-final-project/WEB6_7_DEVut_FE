import { useQuery } from "@tanstack/react-query";
import { getLiveProduct } from "../api/liveProduct.api";

export const useLiveProductDetail = (productId: number) =>
  useQuery({
    queryKey: ["liveproductDetail", productId],
    queryFn: async () => {
      const data = await getLiveProduct(productId);
      return data;
    },
    enabled: !!productId,
  });
