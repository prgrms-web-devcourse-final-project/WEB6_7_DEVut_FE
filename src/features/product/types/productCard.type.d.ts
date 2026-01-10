type ProductCardBase = {
  uid: string;
  id: number;
  title: string;
  amount: number;
  image: string | StaticImageData;
  href: string;
  isWish: boolean;
  badge?: {
    image: StaticImageData;
    alt: string;
  };
  status?: ProductStatusData;
  type: AuctionType;
};

type ProductCardWithDeal = ProductCardBase & {
  dealId: number | null;
};

type ProductCardWithoutDeal = ProductCardBase & {
  dealId: null;
};

type ProductCardType = ProductCardWithDeal | ProductCardWithoutDeal;
