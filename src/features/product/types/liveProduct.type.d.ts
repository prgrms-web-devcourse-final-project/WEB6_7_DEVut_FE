// 라이브 상품 목록 조회 타입
interface GetLiveProductsParams {
  name?: string;
  category?: string;
  minBidPrice?: number;
  maxBidPrice?: number;
  page: number;
  size: number;
}

interface LiveProduct {
  id: number;
  name: string;
  image: string;
  liveTime: string;
}

interface LiveProductResponse {
  liveItems: LiveProduct[];
  totalCount: number;
}

interface SearchParams {
  name?: string;
  category?: CategoryKey;
  minBidPrice?: number;
  maxBidPrice?: number;
  page: number;
  size: number;
}

// 라이브 상품 상세 조회 타입
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
