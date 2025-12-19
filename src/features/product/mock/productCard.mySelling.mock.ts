import delayBadge from "@/assets/common/delayBadge.svg";
import productImg from "@/assets/images/mock/product/product_mock.jpg";

export const productCardMock_MY_SELLING: ProductCardType[] = [
  {
    id: 10,
    title: "오프화이트 조던 1",
    amount: 1200000,
    image: productImg,
    href: "/product/10",
    badge: { image: delayBadge, alt: "일반 경매" },
    status: { kind: "status", status: "IN_DEAL" },
  },
  {
    id: 11,
    title: "오프화이트 덩크 로우",
    amount: 950000,
    image: productImg,
    href: "/product/11",
    badge: { image: delayBadge, alt: "일반 경매" },
    status: { kind: "status", status: "PURCHASE_CONFIRMED" },
  },
  {
    id: 12,
    title: "오프화이트 프레스토",
    amount: 1500000,
    image: productImg,
    href: "/product/12",
    badge: { image: delayBadge, alt: "일반 경매" },
    status: { kind: "status", status: "FAILED" },
  },
];
