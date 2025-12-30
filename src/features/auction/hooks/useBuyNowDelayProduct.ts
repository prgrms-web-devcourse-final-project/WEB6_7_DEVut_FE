import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buyNowDelayProduct } from "../api/auctionProduct.api";

export const useBuyNowDelayProduct = (productId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => buyNowDelayProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["delay-product", productId],
      });
    },
  });
};
