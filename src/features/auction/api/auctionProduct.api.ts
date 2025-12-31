import ClientApi from "@/lib/clientApi";

// 상품 등록
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

// 상품 수정
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

// 일반 상품 입찰
export const bidDelayProduct = async (body: BidDelayProductRequest, productId: number) => {
  const res = await ClientApi<BidDelayProductResponse>(`/auction/delayed/${productId}/bid`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};

// 일반 상품 즉시 구매
export const buyNowDelayProduct = async (productId: number) => {
  const res = await ClientApi<BuyNowDelayProductResponse>(`/auction/delayed/${productId}/buy-now`, {
    method: "POST",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};
