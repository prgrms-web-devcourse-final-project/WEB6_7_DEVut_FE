interface ProductCardType {
  id: number;
  title: string;
  amount: number;
  image: string | StaticImageData;

  href: string;

  isWish?: boolean;

  badge?: {
    image: StaticImageData;
    alt: string;
  };

  status?:
    | { kind: "status"; status: StatusType }
    | { kind: "time"; time: TimeType; label?: string };
}
