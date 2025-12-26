import ClientApi from "@/lib/clientApi";

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
