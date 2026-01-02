import { useMutation } from "@tanstack/react-query";
import { createDelayProduct, createLiveProduct } from "../api/auctionProduct.api";

export const useCreateAuctionProduct = () =>
  useMutation<CreateLiveProductData | CreateDelayProductData, Error, CreateProductForm>({
    mutationFn: (form: CreateProductForm) => {
      const { type, ...body } = form; // type은 넘겨줄 값에서 떼어버리기

      if (type === "LIVE") {
        return createLiveProduct(body as CreateLiveProductRequest);
      }

      return createDelayProduct(body as CreateDelayProductRequest);
    },
  });
