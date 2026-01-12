const getTradeRouteByResourceType = (resourceType: string, resourceId: number) => {
  switch (resourceType) {
    case "LIVE_DEAL":
      return `/trade/live/${resourceId}`;
    case "DELAYED_DEAL":
      return `/trade/delayed/${resourceId}`;
    default:
      return null;
  }
};

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

  LIVE_AUCTION_START: () => `/auction/liveRoom`,
  LIVE_SUCCESS_SELLER: n => `/product/live/${n.resourceId}`,
  LIVE_SUCCESS_BIDDER: n => `/product/live/${n.resourceId}`,
  LIVE_FAILED_SELLER: n => `/product/live/${n.resourceId}`,

  // 배송
  ITEM_SHIPPED: n => getTradeRouteByResourceType(n.resourceType, n.resourceId),
  TRANSACTION_COMPLETE: n => getTradeRouteByResourceType(n.resourceType, n.resourceId),

  // 결제
  PAYMENT_COMPLETE: n => getTradeRouteByResourceType(n.resourceType, n.resourceId),
  PAYMENT_REMINDER: n => getTradeRouteByResourceType(n.resourceType, n.resourceId),
  PAYMENT_TIMEOUT_BUYER: n => getTradeRouteByResourceType(n.resourceType, n.resourceId),
  PAYMENT_TIMEOUT_SELLER: n => getTradeRouteByResourceType(n.resourceType, n.resourceId),
};
