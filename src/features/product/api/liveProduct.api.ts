import ClientApi from "@/lib/clientApi";
import { ApiError } from "next/dist/server/api-utils";

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
