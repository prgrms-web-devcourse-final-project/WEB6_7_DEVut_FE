import { useMutation } from "@tanstack/react-query";
import { createAuctionProduct } from "../api/createAuctionProduct.api";

export const useCreateAuctionProduct = () =>
  useMutation<CreateAuctionProductResponse, Error, CreateAuctionProductRequest>({
    mutationFn: createAuctionProduct,
  });
