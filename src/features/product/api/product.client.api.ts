import ClientApi from "@/lib/clientApi";
import { mapDelayedProductToCard, mapLiveProductToCard } from "../mapper/productCard";

export const getDelayedProducts = async (params: GetProductsParams) => {
  const res = await ClientApi<DelayProductResponse>("/auction/delayed", {
    method: "GET",
    params: { ...params },
  });

  return {
    products: res.data.delayedItems.map(mapDelayedProductToCard),
    totalCount: res.data.totalCount,
  };
};

export const getLiveProducts = async (params: GetProductsParams) => {
  const res = await ClientApi<LiveProductResponse>("/auction/live", {
    method: "GET",
    params: { ...params },
  });

  return res.data.liveItems.map(mapLiveProductToCard);
};

export const getLiveProduct = async (productId: number) => {
  const res = await ClientApi<LiveProductDetail>(`/auction/live/${productId}`, {
    method: "GET",
  });

  return { ...res.data, type: "LIVE" } as LiveProductDetail;
};

export const getDelayProduct = async (productId: number) => {
  const res = await ClientApi<DelayProductDetail>(`/auction/delayed/${productId}`, {
    method: "GET",
  });

  return { ...res.data, type: "DELAYED" } as DelayProductDetail;
};
