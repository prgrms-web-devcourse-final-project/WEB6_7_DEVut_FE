interface BidDelayProductRequest {
  bidPrice: number;
}
interface BidDelayProductResponse {
  id: number;
  delayedItemId: number;
  bidderNickname: string;
  bidPrice: number;
  createdAt: string;
}
