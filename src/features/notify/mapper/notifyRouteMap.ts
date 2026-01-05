export const NOTIFICATION_ROUTE_MAP: Record<NotificationType, NotificationRouteHandler> = {
  // 지연
  DELAYED_FIRST_BID: n => `/product/${n.resourceId}`,
  DELAYED_BID_OUTBID: n => `/product/${n.resourceId}`,
  DELAYED_SUCCESS_SELLER: n => `/product/${n.resourceId}`,
  DELAYED_SUCCESS_BIDDER: n => `/product/${n.resourceId}`,
  DELAYED_FAILED_SELLER: n => `/product/${n.resourceId}`,
  DELAYED_BUY_NOW_SOLD: n => `/product/${n.resourceId}`,
  DELAYED_CANCELLED_BY_BUY_NOW: n => `/product/${n.resourceId}`,

  // DM
  DM_FIRST_MESSAGE: n =>
    n.metadata && "chatRoomId" in n.metadata ? `/message/${n.metadata.chatRoomId}` : null,

  // 라이브 추후 리팩토링
  LIVE_AUCTION_START: n => `/auction/liveRoom`,
  LIVE_SUCCESS_SELLER: n => `/mypage/selling/live/${n.resourceId}`,
  LIVE_SUCCESS_BIDDER: n => `/mypage/buying/live/${n.resourceId}`,
  LIVE_FAILED_SELLER: n => `/mypage/selling/live/${n.resourceId}`,
};
