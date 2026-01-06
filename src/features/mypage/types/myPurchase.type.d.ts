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

interface CurrentPurchase {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  buyNowPrice: number;
  endTime: string;
  auctionStatus: AuctionStatus;
  isLiked: true;
}

interface MyCurrentPurchasesResponse {
  delayedItems: CurrentPurchase[];
  totalCount: number;
}
