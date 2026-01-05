import delayBadge from "@/assets/common/delayBadge.svg";
import liveBadge from "@/assets/common/liveBadge.svg";

export const myPagePurchaseCardMapping = (item: Purchase) => {
  const status: ProductStatusData = { kind: "status", status: item.auctionStatus };

  return {
    id: item.id,
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
