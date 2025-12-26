// 지연경매
// 순서대로 낙찰 시(판매자), 낙찰 시(구매자), 유찰 시(판매자), 다른 사람이 상위 입찰을 했을 때,
// 즉시 구매시(판매자), 즉시 구매 시(이전에 최고 입찰자)
type NotificationType =
  | "DELAYED_SUCCESS_SELLER"
  | "DELAYED_SUCCESS_BIDDER"
  | "DELAYED_FAILED_SELLER"
  | "DELAYED_BID_OUTBID"
  | "DELAYED_BUY_NOW_SOLD"
  | "DELAYED_CANCELLED_BY_BUY_NOW";
