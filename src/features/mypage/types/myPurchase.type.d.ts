interface Purchase {
  status: AuctionStatus;
  id: number;
  itemId: number;
  type: "DELAYED" | "LIVE";
  itemName: string;
  buyerNickname: string;
  winningPrice: number;
  wish: boolean;
  image: string;
  auctionStatus: AuctionStatus;
  deliveryAddress: string;
  deliveryAddressDetail: string;
  deliveryPostalCode: string;
}

interface MyPurchasesResponse {
  items: Purchase[];
  totalCount: number;
}
