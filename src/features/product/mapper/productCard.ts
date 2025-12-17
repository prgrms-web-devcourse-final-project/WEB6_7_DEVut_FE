import liveBadge from "@/assets/common/liveBadge.svg";
// import delayBadge from "@/assets/common/delayBadge.svg";
import productImg from "@/assets/images/mock/product/product_mock.jpg";

export const mapLiveProductToCard = (product: LiveProduct): ProductCardType => ({
  id: product.id,
  title: product.name,
  amount: 1000000,
  image: productImg,
  href: `/product/live/${product.id}`,

  badge: {
    image: liveBadge,
    alt: "LIVE",
  },

  status: {
    kind: "time",
    time: "onLive",
    label: product.liveTime,
  },
});

// 지연 경매
// export const mapDelayProductToCardVM = (product): ProductCardType => ({
//   id: product.id,
//   title: product.name,
//   amount: product.startPrice,
//   image: product.image,
//   href: `/product/${product.id}`,

//   badge: {
//     image: delayBadge,
//     alt: "지연 경매",
//   },

//   status: {
//     kind: "status",
//     status: "pending",
//   },
// });
