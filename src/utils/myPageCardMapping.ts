import delayBadge from "@/assets/common/delayBadge.svg";
import liveBadge from "@/assets/common/liveBadge.svg";

export const myPageCardMapping = (item: Sell | Wish): ProductCardType => {
  const status: ProductStatusData =
    item.auctionStatus === "IN_PROGRESS" && item.type === "DELAYED"
      ? { kind: "time", time: item.endTime }
      : { kind: "status", status: item.auctionStatus };

  const uid = `${item.type}-${item.id}`; // 🔥 핵심

  return {
    dealId: null,
    uid,
    id: item.id,
    title: item.name,
    amount: item.initPrice,
    image: item.image,
    href: item.type === "DELAYED" ? `/product/${item.id}` : `/product/live/${item.id}`,
    isWish: item.wish,
    badge: {
      image: item.type === "DELAYED" ? delayBadge : liveBadge,
      alt: item.type === "DELAYED" ? "일반 경매" : "라이브 경매",
    },
    type: item.type,
    status,
  };
};

export const myPageSellCardMapping = (item: Sell) => {
  const status: ProductStatusData =
    item.auctionStatus === "IN_PROGRESS" && item.type === "DELAYED"
      ? {
          kind: "time",
          time: item.endTime,
        }
      : {
          kind: "status",
          status: item.auctionStatus,
        };
  const uid = `${item.type}-${item.id}`; // 🔥 핵심
  return {
    uid,
    dealId: item.dealId,
    id: item.id,
    title: item.name,
    amount: item.initPrice,
    image: item.image,
    href: item.type === "DELAYED" ? `/product/${item.id}` : `/product/live/${item.id}`,
    isWish: item.wish,
    badge: {
      image: item.type === "DELAYED" ? delayBadge : liveBadge,
      alt: item.type === "DELAYED" ? "일반 경매" : "라이브 경매",
    },
    type: item.type,
    status,
  };
};
