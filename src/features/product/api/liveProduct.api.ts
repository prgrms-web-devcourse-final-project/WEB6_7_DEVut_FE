import { apiClient } from "@/shared/api/client";

export interface GetLiveProductsParams {
  name?: string;
  category?: string;
  minBidPrice?: number;
  maxBidPrice?: number;
  page: number;
  size: number;
}
export const getLiveProducts = async (params: GetLiveProductsParams) => {
  const res = await apiClient.get<ApiResponse<LiveProductResponse>>("/api/v1/auction/live", {
    params,
  });
  return res.data.data;
};
