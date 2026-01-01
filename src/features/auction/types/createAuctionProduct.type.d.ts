// 공통 경매 상품 등록 요청 DTO
interface CreateAuctionProductRequestBase {
  name: string;
  category: CategoryKey;
  itemStatus: ItemCondition;
  description: string;
  deliveryInclude: boolean;
  directDealAvailable: boolean;
  region: string;
  preferredPlace: string;
  images: string[];
}

// 생성 후 item 요약
interface CreatedItemSummary {
  id: number;
  name: string;
  image: string;
}

// =======================
// Live Auction
// =======================

// 라이브 경매 상품 등록 요청 DTO (liveTime -> startAt, roomIndex 추가)
interface CreateLiveProductRequest extends CreateAuctionProductRequestBase {
  startAt: string; // ISO string
  initPrice: number;
  roomIndex: number; // 사용자가 선택한 방(1~5)
}

// 라이브 생성 응답 data 타입
interface CreateLiveProductData {
  item: CreatedItemSummary;
  room: {
    roomId: number;
    roomIndex: number;
    startAt: string;
  };
}

// 라이브 생성 응답
type CreateLiveProductResponse = ApiResponse<CreateLiveProductData>;

// =======================
// Delayed Auction
// =======================

// 지연 경매 상품 등록 요청 DTO
interface CreateDelayProductRequest extends CreateAuctionProductRequestBase {
  startPrice: number;
  buyNowPrice: number;
  endTime: string; // ISO string
}

// 지연 생성 응답 data 타입
interface CreateDelayProductData {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  buyNowPrice: number;
  endTime: string;
  auctionStatus: AuctionStatus;
}

// 지연 생성 응답
type CreateDelayProductResponse = ApiResponse<CreateDelayProductData>;

// writeForm 전용 타입
type CreateProductForm =
  | (CreateLiveProductRequest & {
      type: "LIVE";
    })
  | (CreateDelayProductRequest & {
      type: "DELAYED";
    });
