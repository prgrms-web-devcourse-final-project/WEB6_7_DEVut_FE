interface ProductCardType {
<<<<<<< HEAD
  uid: string;
=======
  dealId?: number | null;
>>>>>>> 8bc8c0987040080705d87ce89e044ff117a7df99
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
