export const getBidUnit = (price: number) => {
  if (price < 2_000) return 100;

  const percentUnit = Math.ceil((price * 0.05) / 100) * 100;

  let baseUnit: number;
  if (price < 10_000) baseUnit = 100;
  else if (price < 100_000) baseUnit = 1_000;
  else if (price < 1_000_000) baseUnit = 5_000;
  else baseUnit = 10_000;

  return Math.max(baseUnit, percentUnit);
};

export const getBidSteps = (currentPrice: number) => {
  const unit = getBidUnit(currentPrice);

  return [unit, unit * 3, unit * 5];
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

export const getLiveRoomStatus = (products?: { auctionStatus: AuctionStatus }[]) => {
  if (!products || products.length === 0) return "READY";

  const hasReady = products.some(p => getLiveStatus(p.auctionStatus) === "READY");
  const hasOngoing = products.some(p => getLiveStatus(p.auctionStatus) === "ONGOING");
  const allClosed = products.every(p => getLiveStatus(p.auctionStatus) === "CLOSE");

  if (allClosed) return "CLOSE";
  if (hasOngoing) return "ONGOING";
  if (hasReady) return "INTERMISSION";

  return "READY";
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

export const getLiveEnterStatus = (liveTime?: string) => {
  if (!liveTime) return "READY";

  const liveAt = new Date(liveTime).getTime();
  const now = Date.now();
  const TEN_MINUTES = 10 * 60 * 1000;

  return now >= liveAt - TEN_MINUTES ? "ONGOING" : "READY";
};
