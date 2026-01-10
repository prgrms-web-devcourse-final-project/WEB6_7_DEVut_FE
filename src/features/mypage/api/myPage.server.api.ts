import { ServerApi } from "@/lib/serverApi";
import { myPageCardMapping, myPageSellCardMapping } from "@/utils/myPageCardMapping";

export const getWishProducts = async () => {
  const res = await ServerApi<MyWishResponse>("/users/me/likes", {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data.items.map(myPageCardMapping);
};

export const getSellProducts = async (): Promise<ProductCardType[]> => {
  const res = await ServerApi<MySellResponse>("/users/me/items", {
    method: "GET",
  });

  return res.data.items.map(myPageSellCardMapping);
};
