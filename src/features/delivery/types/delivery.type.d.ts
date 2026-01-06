interface MyDeliveryResponse {
  id: number;
  address: string;
  addressDetail: string;
  postalCode: number;
  isDefault: boolean;
}

interface UpdateDelivery {
  address: string;
  addressDetail: string;
  postalCode: number;
}
