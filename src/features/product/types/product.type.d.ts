// 상품 목록 쿼리 파람스
interface GetProductsParams {
  name?: string;
  category?: CategoryKey;
  minBidPrice?: number;
  maxBidPrice?: number;
  page: number;
  size: number;
}

// 공통 상품 목록 응답 DTO
interface ProductBase {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  auctionStatus: AuctionStatus;
}

// 라이브 상품 목록 응답 DTO
interface LiveProduct extends ProductBase {
  type: "LIVE";
  liveTime: string;
}

interface LiveProductResponse {
  liveItems: LiveProduct[];
  totalCount: number;
}

// 지연(일반) 상품 목록 응답 DTO
interface DelayProduct extends ProductBase {
  type: "DELAYED";
  endTime: string;
}

interface DelayProductResponse {
  delayedItems: DelayProduct[];
  totalCount: number;
}

// 상품 상세 응답 DTO
interface ProductDetailBase {
  id: number;
  name: string;
  category: CategoryKey;
  description: string;
  itemStatus: ItemCondition;
  auctionStatus: AuctionStatus;
  deliveryInclude: boolean;
  directDealAvailable: boolean;
  region: string;
  preferredPlace: string;
  images: string[];
  likeCount: number;
}

interface LiveProductDetail extends ProductDetailBase {
  type: "LIVE";
  liveTime: string;
  sellerId: number; // 통합 필요
}

interface DelayProductDetail extends ProductDetailBase {
  type: "DELAYED";
  startPrice: number;
  currentPrice: number;
  endTime: string;
  sellerUserId: number;
  buyNowPrice: number;
}

type ProductDetail = LiveProductDetail | DelayProductDetail;

// 입찰 기록 아이템
interface ProductBidsLogItem {
  id: number;
  delayedItemId: number;
  bidderNickname: string;
  bidPrice: number;
  createdAt: string;
}

interface ProductBidsLogResponse {
  bids: ProductBidsLogItem[];
  totalCount: number;
}
