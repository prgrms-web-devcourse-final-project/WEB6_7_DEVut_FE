interface Sell {
  id: number;
  type: "DELAYED" | "LIVE";
  name: string;
  category: string;
  initPrice: number;
  instantBuyPrice: null;
  likes: number;
  image: string;
  createdAt: string;
}

interface MySellResponse {
  items: Sell[];
  totalCount: number;
}
