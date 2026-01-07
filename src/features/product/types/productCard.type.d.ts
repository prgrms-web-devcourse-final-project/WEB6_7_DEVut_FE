interface ProductCardType {
  uid: string;
  dealId?: number | null;
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
}
