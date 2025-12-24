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

export const mySell = async (): Promise<MyWishResponse> => {
  const res = await ClientApi<MyWishResponse>("/users/me/likes", {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};
