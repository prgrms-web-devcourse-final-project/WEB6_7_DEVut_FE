import ClientApi from "@/lib/clientApi";

export const myDelivery = async (): Promise<MyDeliveryResponse> => {
  const res = await ClientApi<MyDeliveryResponse>("/users/me/delivery-addresses", {
    method: "GET",
  });

  return res.data;
};

export const updateDelivery = async ({ auctionType, dealId, payload }: UpdateDeliveryParams) => {
  const res = await ClientApi(`/users/me/deals/${auctionType.toLowerCase()}/${dealId}/address`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};
