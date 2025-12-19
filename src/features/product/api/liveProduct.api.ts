import ClientApi from "@/lib/clientApi";
import { ApiError } from "next/dist/server/api-utils";

export const getLiveProducts = async (params: GetLiveProductsParams) => {
  const res = await ClientApi<LiveProductResponse>("/auction/live", {
    method: "GET",
    params: { ...params },
  });

  // if (res.resultCode) {
  //   throw new ApiError(res.resultCode, res.msg);
  // }

  return res.data;
};

export const getLiveProduct = async (productId: number) => {
  const res = await ClientApi<LiveProductDetail>(`/auction/live/${productId}`, {
    method: "GET",
  });

  return res.data;
};
