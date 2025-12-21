import { useMutation } from "@tanstack/react-query";
import {
  mapToCreateDelayProductRequest,
  mapToCreateLiveProductRequest,
} from "../mapper/createAuctionProduct";
import { modifyDelayProduct, modifyLiveProduct } from "../api/auctionProduct.api";

export const useModifyAuctionProduct = (productId: number) =>
  useMutation({
    mutationFn: (form: CreateProductForm) => {
      if (form.type === "LIVE") {
        return modifyLiveProduct(mapToCreateLiveProductRequest(form), productId);
      }
      return modifyDelayProduct(mapToCreateDelayProductRequest(form), productId);
    },
  });
