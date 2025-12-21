import { useMutation } from "@tanstack/react-query";
import { createDelayProduct, createLiveProduct } from "../api/createAuctionProduct.api";
import { mapToCreateDelayProductRequest, mapToCreateLiveProductRequest } from "../mapper/createAuctionProduct";

export const useCreateAuctionProduct = () =>
  useMutation({
    mutationFn: (form: CreateProductForm) => {
      if (form.type === "LIVE") {
        return createLiveProduct(mapToCreateLiveProductRequest(form));
      }
      return createDelayProduct(mapToCreateDelayProductRequest(form));
    },
  });
