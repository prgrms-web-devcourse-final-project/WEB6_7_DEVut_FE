import delayBadge from "@/assets/common/delayBadge.svg";
import liveBadge from "@/assets/common/liveBadge.svg";

export const myPageCardMapping = ({ card }: { card?: MyWishResponse }) => {
  if (!card) return [];
  const newCard = card?.items.map(item => ({
    id: item.id,
    title: item.name,
    amount: item.initPrice,
    image: item.image,
    href: `${item.type === "DELAYED" ? `/product/${item.id}` : `product/live/${item.id}`}`,
    isWish: true,
    badge: {
      image: item.type === "DELAYED" ? delayBadge : liveBadge,
      alt: item.type === "DELAYED" ? "일반 경매" : "라이브 경매",
    },
    type: item.type,
  }));
  return newCard;
};
