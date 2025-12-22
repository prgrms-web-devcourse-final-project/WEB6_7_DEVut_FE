import delayBadge from "@/assets/common/delayBadge.svg";
import productImg from "@/assets/images/mock/product/product_mock.jpg";

// 목업 데이터 전용
function generateEndTimeISO(minDays = 3, maxDays = 10) {
  const now = Date.now();

  const days = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;

  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);

  const endTime =
    now +
    days * 24 * 60 * 60 * 1000 +
    hours * 60 * 60 * 1000 +
    minutes * 60 * 1000 +
    seconds * 1000;

  return new Date(endTime).toISOString();
}

export const productCardMock_DELAYED: ProductCardType[] = [
  {
    id: 401,
    title: "오프화이트 에어포스 1",
    amount: 980000,
    image: productImg,
    href: "/product/401",
    badge: { image: delayBadge, alt: "일반 경매" },
    status: {
      kind: "time",
      time: generateEndTimeISO(),
    },
    type: "DELAYED",
  },
  {
    id: 402,
    title: "오프화이트 블레이저 미드",
    amount: 870000,
    image: productImg,
    href: "/product/402",
    badge: { image: delayBadge, alt: "일반 경매" },
    status: {
      kind: "time",
      time: generateEndTimeISO(),
    },
    type: "DELAYED",
  },
  {
    id: 403,
    title: "오프화이트 덩크 로우",
    amount: 950000,
    image: productImg,
    href: "/product/403",
    badge: { image: delayBadge, alt: "일반 경매" },
    status: {
      kind: "time",
      time: generateEndTimeISO(),
    },
    type: "DELAYED",
  },
  {
    id: 404,
    title: "오프화이트 조던 1",
    amount: 1250000,
    image: productImg,
    href: "/product/404",
    badge: { image: delayBadge, alt: "일반 경매" },
    status: {
      kind: "time",
      time: generateEndTimeISO(),
    },
    type: "DELAYED",
  },
  {
    id: 405,
    title: "오프화이트 프레스토",
    amount: 1500000,
    image: productImg,
    href: "/product/405",
    badge: { image: delayBadge, alt: "일반 경매" },
    status: {
      kind: "time",
      time: generateEndTimeISO(),
    },
    type: "DELAYED",
  },
];
