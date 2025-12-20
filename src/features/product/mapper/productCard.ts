export const mapLiveProductToCard = (item: LiveProduct): ProductCardType => {
  if (item.auctionStatus === "BEFORE_BIDDING") {
    return {
      id: item.id,
      title: item.name,
      amount: item.currentPrice,
      image: item.image,
      href: `/product/live/${item.id}`,
      status: {
        kind: "time",
        time: item.liveTime,
        label: "라이브 시작",
      },
    };
  }

  if (item.auctionStatus === "IN_PROGRESS") {
    return {
      id: item.id,
      title: item.name,
      amount: item.currentPrice,
      image: item.image,
      href: `/product/live/${item.id}`,
      status: {
        kind: "status",
        status: "IN_PROGRESS",
      },
    };
  }

  return {
    id: item.id,
    title: item.name,
    amount: item.currentPrice,
    image: item.image,
    href: `/product/live/${item.id}`,
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
    href: `/product/${item.id}`,
  };

  switch (item.auctionStatus) {
    case "IN_PROGRESS":
      return {
        ...base,
        status: {
          kind: "time",
          time: item.endTime,
          label: "마감시간",
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
