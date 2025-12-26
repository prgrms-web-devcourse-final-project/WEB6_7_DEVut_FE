interface Wish {
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

interface MyWishResponse {
  items: Wish[];
  totalCount: number;
}
