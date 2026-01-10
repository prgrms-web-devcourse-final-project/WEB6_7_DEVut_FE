import delayBadge from "@/assets/common/delayBadge.svg";
import liveBadge from "@/assets/common/liveBadge.svg";

export const myPagePurchaseCardMapping = (item: Purchase) => {
  const status: ProductStatusData = { kind: "status", status: item.auctionStatus };
  const uid = `${item.type}-${item.itemId}`;
  return {
    uid,
    dealId: item.id,
    id: item.itemId,
    title: item.itemName,
    amount: item.winningPrice,
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

export const myPageCurrentPurchaseCardMapping = (currentItem: CurrentPurchase): ProductCardType => {
  const status: ProductStatusData = { kind: "time", time: currentItem.endTime };
  const uid = `DELAYED-${currentItem.id}`;
  return {
    dealId: null,
    uid,
    id: currentItem.id,
    title: currentItem.name,
    amount: currentItem.currentPrice,
    image: currentItem.image,
    href: `/product/${currentItem.id}`,
    isWish: currentItem.isLiked,
    badge: {
      image: delayBadge,
      alt: "일반 경매",
    },
    type: "DELAYED",
    status,
  };
};
