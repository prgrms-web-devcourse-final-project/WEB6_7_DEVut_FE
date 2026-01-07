import ClientApi from "@/lib/clientApi";
import {
  mapAuctionItemToCard,
  mapDelayedProductToCard,
  mapLiveProductToCard,
} from "../mapper/productCard";

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

export const getALLProducts = async (params: GetProductsAllParams) => {
  const res = await ClientApi<ProductAllResponse>("/auction/search", {
    method: "GET",
    params: { ...params },
  });

  return {
    auctions: res.data.auctions.map(mapAuctionItemToCard),
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

export const LiveHotProducts = async () => {
  const res = await ClientApi<LiveProductResponse>(`/auction/live/hot`, {
    method: "GET",
  });

  return res.data.liveItems.map(mapLiveProductToCard);
};

export const DelayHotProducts = async () => {
  const res = await ClientApi<DelayProductResponse>(`/auction/delayed/hot`, {
    method: "GET",
  });

  return res.data.delayedItems.map(mapDelayedProductToCard);
};

export const DelayMostBidsProducts = async () => {
  const res = await ClientApi<DelayProductResponse>(`/auction/delayed/most-bidded`, {
    method: "GET",
  });

  return res.data.delayedItems.map(mapDelayedProductToCard);
};
