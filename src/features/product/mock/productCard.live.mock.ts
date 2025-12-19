import liveBadge from "@/assets/common/liveBadge.svg";
import productImg from "@/assets/images/mock/product/product_mock.jpg";

export const productCardMock_LIVE: ProductCardType[] = [
  // ===== 라이브 예정 =====
  {
    id: 101,
    title: "오프화이트 조던 1",
    amount: 1200000,
    image: productImg,
    href: "/auction/live/101",
    badge: { image: liveBadge, alt: "라이브 경매" },
    status: {
      kind: "time",
      time: "2025-09-20 19:00",
      label: "라이브 시작",
    },
  },
  {
    id: 102,
    title: "오프화이트 덩크 로우",
    amount: 950000,
    image: productImg,
    href: "/auction/live/102",
    badge: { image: liveBadge, alt: "라이브 경매" },
    status: {
      kind: "time",
      time: "2025-09-20 20:00",
      label: "라이브 시작",
    },
  },
  {
    id: 103,
    title: "오프화이트 프레스토",
    amount: 1500000,
    image: productImg,
    href: "/auction/live/103",
    badge: { image: liveBadge, alt: "라이브 경매" },
    status: {
      kind: "time",
      time: "2025-09-21 18:30",
      label: "라이브 시작",
    },
  },

  // ===== 라이브 진행 중 =====
  {
    id: 104,
    title: "오프화이트 블레이저 미드",
    amount: 870000,
    image: productImg,
    href: "/auction/live/104",
    badge: { image: liveBadge, alt: "라이브 경매" },
    status: { kind: "status", status: "IN_PROGRESS" },
  },
  {
    id: 105,
    title: "오프화이트 에어맥스 90",
    amount: 1100000,
    image: productImg,
    href: "/auction/live/105",
    badge: { image: liveBadge, alt: "라이브 경매" },
    status: { kind: "status", status: "IN_PROGRESS" },
  },
  {
    id: 106,
    title: "오프화이트 척테일러",
    amount: 420000,
    image: productImg,
    href: "/auction/live/106",
    badge: { image: liveBadge, alt: "라이브 경매" },
    status: { kind: "status", status: "IN_PROGRESS" },
  },
  {
    id: 107,
    title: "오프화이트 조던 4",
    amount: 1350000,
    image: productImg,
    href: "/auction/live/107",
    badge: { image: liveBadge, alt: "라이브 경매" },
    status: { kind: "status", status: "IN_PROGRESS" },
  },
  {
    id: 108,
    title: "오프화이트 에어포스 1",
    amount: 980000,
    image: productImg,
    href: "/auction/live/108",
    badge: { image: liveBadge, alt: "라이브 경매" },
    status: { kind: "status", status: "IN_PROGRESS" },
  },
  {
    id: 109,
    title: "오프화이트 덩크 하이",
    amount: 890000,
    image: productImg,
    href: "/auction/live/109",
    badge: { image: liveBadge, alt: "라이브 경매" },
    status: { kind: "status", status: "IN_PROGRESS" },
  },
];
