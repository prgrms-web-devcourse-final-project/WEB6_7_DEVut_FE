import ClientApi from "@/lib/clientApi";

export const myDelivery = async (): Promise<MyDeliveryResponse> => {
  const res = await ClientApi<MyDeliveryResponse>("/users/me/delivery-addresses", {
    method: "GET",
  });

  return res.data;
};

export const updateDelivery = async (payload: UpdateDelivery) => {
  const res = await ClientApi<{
    id: number;
    email: string;
    nickname: string;
    image: string | null;
    modifyDate: string;
    address: string | null;
    addressDetail: string | null;
    postalCode: string | null;
  }>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};
