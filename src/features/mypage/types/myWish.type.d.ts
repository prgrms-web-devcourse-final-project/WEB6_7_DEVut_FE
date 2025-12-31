interface Wish {
  id: number;
  type: "DELAYED" | "LIVE";
  name: string;
  category: string;
  initPrice: number;
  instantBuyPrice: null;
  auctionStatus: AuctionStatus;
  image: string;
  createdAt: string;
  currentPrice: number;
  endTime: string;
  wish: boolean;
}

interface MyWishResponse {
  items: Wish[];
  totalCount: number;
}
