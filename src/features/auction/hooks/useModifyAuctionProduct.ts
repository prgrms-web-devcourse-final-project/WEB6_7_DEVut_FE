import { useMutation } from "@tanstack/react-query";
import { modifyDelayProduct, modifyLiveProduct } from "../api/auctionProduct.api";

export const useModifyAuctionProduct = (productId: number) =>
  useMutation<CreateLiveProductResponse | CreateDelayProductResponse, unknown, CreateProductForm>({
    mutationFn: (form: CreateProductForm) => {
      const { type, ...body } = form;

      if (type === "LIVE") {
        return modifyLiveProduct(body as CreateLiveProductRequest, productId);
      }

      return modifyDelayProduct(body as CreateDelayProductRequest, productId);
    },
  });
