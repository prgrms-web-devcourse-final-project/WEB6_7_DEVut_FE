import ClientApi from "@/lib/clientApi";
import { myPageCardMapping } from "@/utils/myPageCardMapping";

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

export const myPurchase = async (): Promise<MyPurchasesResponse> => {
  const res = await ClientApi<MyPurchasesResponse>("/users/me/deals", {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};
