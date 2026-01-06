import ClientApi from "@/lib/clientApi";

export const updateAddress = async ({ auctionType, dealId, payload }: UpdateAddressParams) => {
  const res = await ClientApi(`/users/me/deals/${auctionType.toLowerCase()}/${dealId}/address`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};

export const updateDelivery = async ({ auctionType, dealId, payload }: UpdateDeliveryParams) => {
  const res = await ClientApi(`/users/me/deals/${auctionType.toLowerCase()}/${dealId}/delivery`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};
