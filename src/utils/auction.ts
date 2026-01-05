export const getBidUnit = (price: number) => {
  if (price < 10_000) return 100;
  if (price < 100_000) return 1_000;
  if (price < 1_000_000) return 5_000;
  return 10_000;
};

export const getLiveStatus = (status: AuctionStatus) => {
  switch (status) {
    case "BEFORE_BIDDING":
      return "READY";
    case "IN_PROGRESS":
      return "ONGOING";
    default:
      return "CLOSE";
  }
};

export const getDelayStatus = (status: AuctionStatus) => {
  switch (status) {
    case "BEFORE_BIDDING":
    case "IN_PROGRESS":
      return "ONGOING";
    default:
      return "CLOSE";
  }
};
