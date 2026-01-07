interface Sell {
  auctionStatus: AuctionStatus;
  endTime: string;
  id: number;
  type: "DELAYED" | "LIVE";
  name: string;
  category: string;
  initPrice: number;
  instantBuyPrice: null;
  wish: boolean;
  image: string;
  createdAt: string;
  dealId: number | null;
}

interface MySellResponse {
  items: Sell[];
  totalCount: number;
}
