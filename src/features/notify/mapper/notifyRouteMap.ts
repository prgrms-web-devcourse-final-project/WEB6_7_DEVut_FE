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

  LIVE_AUCTION_START: n => {
    // useRoomStore에서 구독, 저장
    return `/auction/liveRoom`;
  },
  LIVE_SUCCESS_SELLER: n => `/product/live/${n.resourceId}`,
  LIVE_SUCCESS_BIDDER: n => `/product/live/${n.resourceId}`,
  LIVE_FAILED_SELLER: n => `/product/live/${n.resourceId}`,
};
