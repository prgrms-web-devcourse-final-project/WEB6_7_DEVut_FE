import delayBadge from "@/assets/common/delayBadge.svg";
import productImg from "@/assets/images/mock/product/product_mock.jpg";

export const productMocks: ProductCardType[] = [
  {
    id: 1,
    title: "나이키 에어포스 1",
    amount: 100000,
    image: productImg,
    href: "/product/1",
    badge: {
      image: delayBadge,
      alt: "일반 경매",
    },
    status: {
      kind: "status",
      status: "processing",
    },
  },
  {
    id: 2,
    title: "아디다스 삼바 OG",
    amount: 120000,
    image: productImg,
    href: "/product/2",
    badge: {
      image: delayBadge,
      alt: "일반 경매",
    },
    status: {
      kind: "status",
      status: "pending",
    },
  },
  {
    id: 3,
    title: "뉴발란스 993",
    amount: 180000,
    image: productImg,
    href: "/product/3",

    badge: {
      image: delayBadge,
      alt: "일반 경매",
    },
    status: {
      kind: "status",
      status: "done",
    },
  },
  {
    id: 4,
    title: "오프화이트 조던 1",
    amount: 1200000,
    image: productImg,
    href: "/product/4",
    badge: {
      image: delayBadge,
      alt: "일반 경매",
    },
    status: {
      kind: "status",
      status: "confirmed",
    },
  },
  {
    id: 5,
    title: "오프화이트 덩크 로우",
    amount: 950000,
    image: productImg,
    href: "/product/5",
    badge: {
      image: delayBadge,
      alt: "일반 경매",
    },
    status: { kind: "status", status: "processing" },
  },
  {
    id: 6,
    title: "오프화이트 프레스토",
    amount: 1500000,
    image: productImg,
    href: "/product/6",
    badge: {
      image: delayBadge,
      alt: "일반 경매",
    },
    status: { kind: "status", status: "pending" },
  },
  {
    id: 7,
    title: "오프화이트 블레이저 미드",
    amount: 870000,
    image: productImg,
    href: "/product/7",
    badge: {
      image: delayBadge,
      alt: "일반 경매",
    },
    status: { kind: "status", status: "processing" },
  },
  {
    id: 8,
    title: "오프화이트 에어맥스 90",
    amount: 1100000,
    image: productImg,
    href: "/product/8",
    badge: {
      image: delayBadge,
      alt: "일반 경매",
    },
    status: { kind: "status", status: "done" },
  },
  {
    id: 9,
    title: "오프화이트 척테일러",
    amount: 420000,
    image: productImg,
    href: "/product/9",
    badge: {
      image: delayBadge,
      alt: "일반 경매",
    },
    status: { kind: "status", status: "pending" },
  },
];
