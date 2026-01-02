interface Purchase {
  status: AuctionStatus;
  //   endTime: string;
  id: number;
  itemId: number;
  type: "DELAYED" | "LIVE";
  itemName: string;
  sellerName: null;
  winningPrice: number;
  //   wish: boolean;
  image: string;
}

interface MyPurchasesResponse {
  items: Purchase[];
  totalCount: number;
}
