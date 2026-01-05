import { ServerApi } from "@/lib/serverApi";
import { myPagePurchaseCardMapping } from "@/utils/myPagePurchaseCardMapping";

export const getPurchaseProducts = async () => {
  const res = await ServerApi<MyPurchasesResponse>("/users/me/deals", {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data.items.map(myPagePurchaseCardMapping);
};
