// 노션 API 명세서 알림 구독 참고
type NotificationType =
  // 지연 경매
  | "DELAYED_FIRST_BID"
  | "DELAYED_BID_OUTBID"
  | "DELAYED_SUCCESS_SELLER"
  | "DELAYED_SUCCESS_BIDDER"
  | "DELAYED_FAILED_SELLER"
  | "DELAYED_BUY_NOW_SOLD"
  | "DELAYED_CANCELLED_BY_BUY_NOW"

  // DM
  | "DM_FIRST_MESSAGE"

  // 라이브 경매
  | "LIVE_AUCTION_START"
  | "LIVE_SUCCESS_SELLER"
  | "LIVE_SUCCESS_BIDDER"
  | "LIVE_FAILED_SELLER"

  // 배송
  | "ITEM_SHIPPED"
  | "TRANSACTION_COMPLETE"

  // 결제
  | "PAYMENT_COMPLETE"
  | "PAYMENT_REMINDER"
  | "PAYMENT_TIMEOUT_BUYER"
  | "PAYMENT_TIMEOUT_SELLER";

interface NotificationMetadataMap {
  // 지연
  DELAYED_FIRST_BID: {
    itemName: string;
    firstBidderUserId: number;
    firstBidAmount: number;
  };

  DELAYED_BID_OUTBID: {
    itemName: string;
    newBidAmount: number;
    newBidderUserId: number;
  };

  DELAYED_SUCCESS_SELLER: {
    itemName: string;
    finalPrice: number;
    winnerUserId: number;
  };

  DELAYED_SUCCESS_BIDDER: {
    itemName: string;
    finalPrice: number;
  };

  DELAYED_FAILED_SELLER: {
    itemName: string;
  };

  DELAYED_BUY_NOW_SOLD: {
    itemName: string;
    buyNowPrice: number;
    buyUserId: number;
  };

  DELAYED_CANCELLED_BY_BUY_NOW: {
    itemName: string;
    buyNowPrice: number;
  };

  // DM

  DM_FIRST_MESSAGE: {
    itemName: string;
    chatRoomId: number;
    senderNickname: string;
    createDate: string;
  };

  // 라이브

  LIVE_AUCTION_START: {
    itemCount: number;
    itemsId: number[];
    liveTime: string;
    representativeItemName: string;
  };

  LIVE_SUCCESS_SELLER: {
    itemName: string;
    finalPrice: number;
    winnerUserId: number;
  };

  LIVE_SUCCESS_BIDDER: {
    itemName: string;
    finalPrice: number;
  };

  LIVE_FAILED_SELLER: {
    itemName: string;
  };

  // 배송
  ITEM_SHIPPED: {
    itemName: string;
    trackingNumber: string;
    carrierName: string;
  };

  TRANSACTION_COMPLETE: {
    itemName: string;
    finalPrice: number;
    sellerId: number;
  };

  // 결제

  PAYMENT_COMPLETE: {
    itemName: string;
    totalPrice: number;
    remainingAmount: number;
  };

  PAYMENT_REMINDER: {
    itemName: string;
    finalPrice: number;
    timeMarker: "24h" | "6h";
  };

  PAYMENT_TIMEOUT_BUYER: {
    itemName: string;
    finalPrice: number;
  };

  PAYMENT_TIMEOUT_SELLER: {
    itemName: string;
    finalPrice: number;
  };
}

type NotificationMetadata<T extends NotificationType> = NotificationMetadataMap[T];
