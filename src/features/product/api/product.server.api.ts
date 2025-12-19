import { ServerApi } from "@/lib/serverApi";
import { mapDelayedProductToCard } from "../mapper/productCard";

export const getDelayedProducts = async (params: GetProductsParams): Promise<ProductCardType[]> => {
  const res = await ServerApi<DelayProductResponse>("/auction/delayed", {
    method: "GET",
    params: { ...params },
  });

  return res.data.delayedItems.map(mapDelayedProductToCard);
};
