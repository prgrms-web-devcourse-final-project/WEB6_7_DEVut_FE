// 상품 목록 쿼리 파람스
interface GetProductsParams {
  name?: string;
  category?: string;
  minBidPrice?: number;
  maxBidPrice?: number;
  page: number;
  size: number;
}

// 라이브 상품 응답 DTO
interface LiveProduct {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  liveTime: string;
  auctionStatus: AuctionStatus;
}

interface LiveProductResponse {
  liveItems: LiveProduct[];
  totalCount: number;
}

// 지연(일반) 상품 응답 DTO
interface DelayProduct {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  endTime: string;
  auctionStatus: AuctionStatus;
}

interface DelayProductResponse {
  delayedItems: DelayProduct[];
  totalCount: number;
}

// 공통 상품 타입
interface Product {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  time: string;
  type: "LIVE" | "DELAYED";
}

interface SearchParams {
  name?: string;
  category?: CategoryKey;
  minBidPrice?: number;
  maxBidPrice?: number;
  page: number;
  size: number;
}

interface LiveProductDetail {
  id: number;
  sellerId: number;
  name: string;
  category: Category;
  description: string;
  deliveryInclude: boolean;
  itemStatus: ItemCondition;
  auctionStatus: AuctionStatus;
  liveTime: string;
  directDealAvailable: boolean;
  region: string;
  preferredPlace: string;
  images: string[];
  likeCount: number;
}
