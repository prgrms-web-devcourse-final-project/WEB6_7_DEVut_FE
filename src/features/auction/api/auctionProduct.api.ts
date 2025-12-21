import ClientApi from "@/lib/clientApi";

export const createLiveProduct = async (body: CreateLiveProductRequest) => {
  const res = await ClientApi<CreateAuctionProductResponse>("/auction/live", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return res.data;
};

export const createDelayProduct = async (body: CreateDelayProductRequest) => {
  const res = await ClientApi<CreateAuctionProductResponse>("/auction/delayed", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return res.data;
};

export const modifyLiveProduct = async (body: CreateLiveProductRequest, productId: number) => {
  const res = await ClientApi<CreateAuctionProductResponse>(`/auction/live/${productId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  return res.data;
};

export const modifyDelayProduct = async (body: CreateDelayProductRequest, productId: number) => {
  const res = await ClientApi<CreateAuctionProductResponse>(`/auction/delayed/${productId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  return res.data;
};
