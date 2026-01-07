import delayBadge from "@/assets/common/delayBadge.svg";
import liveBadge from "@/assets/common/liveBadge.svg";
export const mapLiveProductToCard = (item: LiveProduct): ProductCardType => {
  const uid = `${item.type}-${item.id}`;
  const base = {
    uid,
    id: item.id,
    title: item.name,
    amount: item.currentPrice,
    image: item.image,
    href: `/product/live/${item.id}`,
    type: "LIVE" as AuctionType,
    isWish: item.isLiked,
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
  const uid = `${item.type}-${item.id}`;
  const base = {
    uid,
    id: item.id,
    title: item.name,
    amount: item.currentPrice,
    image: item.image,
    badge: { image: delayBadge, alt: "일반 경매" },
    href: `/product/${item.id}`,
    type: "DELAYED" as AuctionType,
    isWish: item.isLiked,
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

export const mapAuctionItemToCard = (item: ProductAll): ProductCardType => {
  const isLive = item.auctionType === "LIVE";
  const uid = `${item.auctionType}-${item.id}`;
  const base: ProductCardType = {
    uid,
    id: item.id,
    title: item.itemName,
    amount: item.currentPrice,
    image: item.itemImageUrl,
    type: item.auctionType,
    href: isLive ? `/product/live/${item.id}` : `/product/${item.id}`,
    badge: isLive
      ? { image: liveBadge, alt: "라이브 경매" }
      : { image: delayBadge, alt: "일반 경매" },
    isWish: item.isLiked,
  };

  if (isLive) {
    if (item.auctionStatus === "BEFORE_BIDDING") {
      return {
        ...base,
        status: {
          kind: "time",
          time: item.endTime,
        },
      };
    }

    if (item.auctionStatus === "IN_PROGRESS") {
      return {
        ...base,
        status: {
          kind: "status",
          status: "IN_PROGRESS",
        },
      };
    }

    return {
      ...base,
      status: {
        kind: "status",
        status: item.auctionStatus,
      },
    };
  }

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
