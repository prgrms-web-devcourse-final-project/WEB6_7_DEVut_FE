interface CreateAuctionProductRequest {
  name: string;
  category: CategoryKey;
  itemStatus: ItemCondition;
  description: string;
  initPrice: number;
  deliveryInclude: boolean;
  liveTime: string;
  directDealAvailable: boolean;
  region: string;
  preferredPlace: string;
  images: string[];
}

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

// 라이브 경매 상품 등록 요청 DTO
interface CreateLiveProductRequest extends CreateAuctionProductRequestBase {
  liveTime: string;
  initPrice: number;
}

// 일반 경매 상품 등록 요청 DTO
interface CreateDelayProductRequest extends CreateAuctionProductRequestBase {
  endTime: string;
  startPrice: number;
}

interface CreateAuctionProductResponse {
  id: number;
  name: string;
}

// writeForm 전용 타입
type CreateProductForm =
  | (CreateLiveProductRequest & {
      type: "LIVE";
    })
  | (CreateDelayProductRequest & {
      type: "DELAYED";
    });
