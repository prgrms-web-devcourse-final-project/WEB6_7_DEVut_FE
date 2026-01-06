import { ServerApi } from "@/lib/serverApi";
import {
  myPageCurrentPurchaseCardMapping,
  myPagePurchaseCardMapping,
} from "@/utils/myPagePurchaseCardMapping";

export const getPurchaseProducts = async () => {
  const res = await ServerApi<MyPurchasesResponse>("/users/me/deals", {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data.items.map(myPagePurchaseCardMapping);
};

export const getCurrentPurchaseProducts = async () => {
  const res = await ServerApi<MyCurrentPurchasesResponse>("/users/me/biditems", {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data.delayedItems.map(myPageCurrentPurchaseCardMapping);
};
