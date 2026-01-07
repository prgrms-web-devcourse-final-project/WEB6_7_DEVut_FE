import ClientApi from "@/lib/clientApi";
import {
  myPageCurrentPurchaseCardMapping,
  myPagePurchaseCardMapping,
} from "@/utils/myPagePurchaseCardMapping";

export const myWish = async (): Promise<MyWishResponse> => {
  const res = await ClientApi<MyWishResponse>("/users/me/likes", {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};

export const mySell = async (): Promise<MySellResponse> => {
  const res = await ClientApi<MySellResponse>("/users/me/items", {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};

export const myPurchase = async () => {
  const res = await ClientApi<MyPurchasesResponse>("/users/me/deals", {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data.items.map(myPagePurchaseCardMapping);
};

export const myCurrentPurchase = async () => {
  const res = await ClientApi<MyCurrentPurchasesResponse>("/users/me/biditems", {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data.delayedItems.map(myPageCurrentPurchaseCardMapping);
};
