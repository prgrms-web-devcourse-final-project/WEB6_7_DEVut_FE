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

interface CreateAuctionProductResponse {
  id: number;
  name: string;
  image: string;
  liveTime: string;
}
