import { apiClient } from "@/shared/api/client";

export const createAuctionProduct = async (body: CreateAuctionProductRequest) => {
  const res = await apiClient.post<ApiResponse<CreateAuctionProductResponse>>(
    "/api/v1/auction/live",
    body
  );

  return res.data.data;
};
