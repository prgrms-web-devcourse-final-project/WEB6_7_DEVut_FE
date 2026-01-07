interface MyDeliveryResponse {
  id: number;
  address: string;
  addressDetail: string;
  postalCode: number;
  isDefault: boolean;
}

interface UpdateAddressPayload {
  address: string;
  addressDetail: string;
  postalCode: string;
}

interface UpdateAddressParams {
  auctionType: "LIVE" | "DELAYED";
  dealId: string;
  payload: UpdateAddressPayload;
}

interface UpdateDeliveryPayload {
  carrierCode: Carrier;
  trackingNumber: string;
}

interface UpdateDeliveryParams {
  auctionType: "LIVE" | "DELAYED";
  dealId: string;
  payload: UpdateDeliveryPayload;
}
