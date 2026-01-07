import BaseImage from "@/components/common/BaseImage";
import BizzAmount from "@/components/common/BizzAmount";
import { useWishToggle } from "@/features/wish/hooks/useWishToggle";
import fullStar from "@/assets/common/fullStar.svg";
import emptyStar from "@/assets/common/emptyStar.svg";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface RoomProductCardProps {
  product: LiveRoomItemUI;
}

interface LiveRoomItemUI {
  id: number;
  title: string;
  amount: number;
  image: string;
  isWish: boolean;
}

export default function RoomProductCard({ product }: RoomProductCardProps) {
  const [star, setStar] = useState(product.isWish);
  const { mutate: toggleWish } = useWishToggle();
  console.log("product", product);
  return (
    <Link href={`/product/live/${product.id}`}>
      <div className="relative h-full transition-all hover:scale-101 active:scale-99">
        {product && (
          <div
            key={product.id}
            className="border-border-main bg-content-area shadow-flat-dark flex h-full w-full flex-col rounded-md border"
          >
            <div className="relative aspect-214/134 w-full overflow-hidden rounded-[3px] p-1.5">
              <BaseImage src={product.image} alt="카드 이미지" />
            </div>

            <div className="mt-3 flex flex-row items-center justify-center px-3">
              {" "}
              <div className="text-title-main-dark flex w-full flex-col">
                <p className="text-[11px] opacity-60">시작가</p>

                <BizzAmount
                  amount={product.amount}
                  className="text-custom-orange-dark text-[14px] leading-tight font-bold"
                />

                <p className="mt-0.5 line-clamp-1 text-[13px]">{product.title}</p>
              </div>
              <button
                className="cursor-pointer transition-transform hover:scale-105 active:scale-90"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setStar(prev => !prev);
                  toggleWish({
                    id: product.id,
                    type: "LIVE",
                  });
                }}
              >
                <Image
                  src={star ? fullStar : emptyStar}
                  alt={star ? "찜됨" : "찜 안됨"}
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
