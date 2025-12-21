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
