import { ServerApi } from "@/lib/serverApi";
import { mapDelayedProductToCard, mapLiveProductToCard } from "../mapper/productCard";

export const getDelayedProducts = async (params: GetProductsParams) => {
  const res = await ServerApi<DelayProductResponse>("/auction/delayed", {
    method: "GET",
    params: { ...params },
  });

  return {
    products: res.data.delayedItems.map(mapDelayedProductToCard),
    totalCount: res.data.totalCount,
  };
};

export const getLiveProduct = async (productId: number) => {
  const res = await ServerApi<LiveProductDetail>(`/auction/live/${productId}`, {
    method: "GET",
  });

  return { ...res.data, type: "LIVE" } as LiveProductDetail;
};

export const getDelayProduct = async (productId: number) => {
  const res = await ServerApi<DelayProductDetail>(`/auction/delayed/${productId}`, {
    method: "GET",
  });

  return { ...res.data, type: "DELAYED" } as DelayProductDetail;
};

export const getLiveHotProducts = async () => {
  const res = await ServerApi<LiveProductResponse>(`/auction/live/hot`, {
    method: "GET",
  });

  console.log("라이브 인기 상품: ", res.data.liveItems);

  return res.data.liveItems.map(mapLiveProductToCard);
};

export const getDelayHotProducts = async () => {
  const res = await ServerApi<DelayProductResponse>(`/auction/delayed/hot`, {
    method: "GET",
  });

  return res.data.delayedItems.map(mapDelayedProductToCard);
};

export const getDelayMostBidsProducts = async () => {
  const res = await ServerApi<DelayProductResponse>(`/auction/delayed/most-bidded`, {
    method: "GET",
  });

  return res.data.delayedItems.map(mapDelayedProductToCard);
};

export const getProductBidsLog = async (productId: number) => {
  const res = await ServerApi<ProductBidsLogResponse>(`/auction/delayed/${productId}/bids`, {
    method: "GET",
  });

  return res.data.bids;
};
