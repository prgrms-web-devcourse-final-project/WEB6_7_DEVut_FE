import ClientApi from "@/lib/clientApi";
import { myPageCardMapping } from "@/utils/myPageCardMapping";
import {
  myPageCurrentPurchaseCardMapping,
  myPagePurchaseCardMapping,
} from "@/utils/myPagePurchaseCardMapping";

export const myWish = async () => {
  const res = await ClientApi<MyWishResponse>("/users/me/likes", {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data.items.map(myPageCardMapping);
};

export const mySell = async () => {
  const res = await ClientApi<MySellResponse>("/users/me/items", {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data.items.map(myPageCardMapping);
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
