import ClientApi from "@/lib/clientApi";

export const getDelayedProducts = async (params: GetProductsParams) => {
  const res = await ClientApi<DelayProductResponse>("/auction/delayed", {
    method: "GET",
    params: { ...params },
  });

  return res.data;
};

export const getLiveProducts = async (params: GetProductsParams) => {
  const res = await ClientApi<LiveProductResponse>("/auction/live", {
    method: "GET",
    params: { ...params },
  });

  return res.data;
};

export const getLiveProduct = async (productId: number) => {
  const res = await ClientApi<LiveProductDetail>(`/auction/live/${productId}`, {
    method: "GET",
  });

  return res.data;
};
