type ItemCondition = "NEW" | "USED_LIKE_NEW" | "USED_HEAVILY";
// 경매상태 순서대로 입찰전, 입찰중, 잔금처리대기, 거래중, 구매확정, 유찰
type AuctionStatus =
  | "BEFORE_BIDDING"
  | "IN_PROGRESS"
  | "PAYMENT_PENDING"
  | "IN_DEAL"
  | "PURCHASE_CONFIRMED"
  | "FAILED";
type ProductKind = "LIVE" | "DELAYED";
type ProductContext = "CARD" | "MY_BUYING" | "MY_SELLING";
type ProductStatusData =
  | {
      kind: "status";
      status: AuctionStatus;
    }
  | {
      kind: "time";
      time: string;
      label?: string;
    };
