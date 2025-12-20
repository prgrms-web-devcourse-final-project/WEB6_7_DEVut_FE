// 경매상태 순서대로 입찰전, 입찰중, 잔금처리대기, 거래중, 구매확정, 유찰
type AuctionStatus =
  | "BEFORE_BIDDING"
  | "IN_PROGRESS"
  | "PAYMENT_PENDING"
  | "IN_DEAL"
  | "PURCHASE_CONFIRMED"
  | "FAILED";
type AuctionType = "ALL" | "LIVE" | "DELAYED";
type AuctionTypeKOR = "전체" | "라이브" | "일반";
