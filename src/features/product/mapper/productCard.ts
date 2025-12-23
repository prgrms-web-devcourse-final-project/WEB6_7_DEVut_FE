import delayBadge from "@/assets/common/delayBadge.svg";
import liveBadge from "@/assets/common/liveBadge.svg";
export const mapLiveProductToCard = (item: LiveProduct): ProductCardType => {
  const base = {
    id: item.id,
    title: item.name,
    amount: item.currentPrice,
    image: item.image,
    href: `/product/live/${item.id}`,
    type: "LIVE" as AuctionType,
  };

  if (item.auctionStatus === "BEFORE_BIDDING") {
    return {
      ...base,
      badge: { image: liveBadge, alt: "라이브 경매" },
      status: {
        kind: "time",
        time: item.liveTime,
      },
    };
  }

  if (item.auctionStatus === "IN_PROGRESS") {
    return {
      ...base,
      badge: { image: liveBadge, alt: "라이브 경매" },
      status: {
        kind: "status",
        status: "IN_PROGRESS",
      },
    };
  }

  return {
    ...base,
    badge: { image: liveBadge, alt: "라이브 경매" },
    status: {
      kind: "status",
      status: item.auctionStatus,
    },
  };
};

export const mapDelayedProductToCard = (item: DelayProduct): ProductCardType => {
  const base = {
    id: item.id,
    title: item.name,
    amount: item.currentPrice,
    image: item.image,
    badge: { image: delayBadge, alt: "일반 경매" },
    href: `/product/${item.id}`,
    type: "DELAYED" as AuctionType,
  };

  switch (item.auctionStatus) {
    case "BEFORE_BIDDING":
    case "IN_PROGRESS":
      return {
        ...base,
        status: {
          kind: "time",
          time: item.endTime,
        },
      };

    default:
      return {
        ...base,
        status: {
          kind: "status",
          status: item.auctionStatus,
        },
      };
  }
};
