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
  | "LIVE_FAILED_SELLER";

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
}

type NotificationMetadata<T extends NotificationType> = NotificationMetadataMap[T];
