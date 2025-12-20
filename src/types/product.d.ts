type ItemCondition = "NEW" | "USED_LIKE_NEW" | "USED_HEAVILY";
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
