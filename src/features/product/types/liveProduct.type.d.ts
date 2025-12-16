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
