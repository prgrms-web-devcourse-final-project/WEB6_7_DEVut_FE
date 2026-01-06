interface MyDeliveryResponse {
  id: number;
  address: string;
  addressDetail: string;
  postalCode: number;
  isDefault: boolean;
}

interface UpdateDeliveryPayload {
  address: string;
  addressDetail: string;
  postalCode: string;
}

interface UpdateDeliveryParams {
  auctionType: "LIVE" | "DELAYED";
  dealId: string;
  payload: UpdateDeliveryPayload;
}
