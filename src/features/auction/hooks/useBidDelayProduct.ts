import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bidDelayProduct } from "../api/auctionProduct.api";
import { ApiError } from "next/dist/server/api-utils";

export const useBidDelayProduct = (productId: number) => {
  const queryClient = useQueryClient();
  return useMutation<BidDelayProductResponse, ApiError, BidDelayProductRequest>({
    mutationFn: (body: BidDelayProductRequest) => bidDelayProduct(body, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["delay-product", productId],
      });

      // 경매 입찰 로그 추후 추가
    },
  });
};
