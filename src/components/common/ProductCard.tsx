"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import fullStar from "@/assets/common/fullStar.svg";
import emptyStar from "@/assets/common/emptyStar.svg";

import BizzAmount from "./BizzAmount";
import ProductStatus from "./ProductStatus";

import test from "@/assets/images/auction/auctioneer.svg";
import WrapperImage from "./WrapperImage";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function ProductCard({
  product,
  context,
  className,
}: {
  product: ProductCardType;
  context: ProductContext;
  className?: string;
}) {
  const [star, setStar] = useState<boolean>(!!product.isWish);
  const router = useRouter();

  return (
    <Link href={product.href} className={twMerge("relative cursor-pointer", className)}>
      <button
        className="absolute top-5 left-5 z-20 transition-transform hover:scale-105 active:scale-90"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setStar(prev => !prev);
        }}
      >
        <Image
          src={star ? fullStar : emptyStar}
          alt={star ? "찜됨" : "찜 안됨"}
          width={20}
          height={20}
        />
      </button>

      <div className="flex h-full w-full flex-col rounded-md border-2 border-[#4F382A] bg-[#FDF6E9] shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.01] active:scale-[0.99]">
        <div className="relative aspect-214/134 w-full overflow-hidden rounded-[3px] p-2">
          <WrapperImage src={product.image ?? test} alt={product.title} />

          {product.badge && (
            <div className="absolute top-3 right-3 z-10">
              <Image src={product.badge.image} alt={product.badge.alt} />
            </div>
          )}
          <div className="absolute right-3 bottom-3">
            {((context === "MY_BUYING" && product.status?.kind === "status") ||
              (context === "MY_SELLING" && product.status?.kind === "status")) &&
            product.status?.kind === "status" &&
            product.status?.status !== "BEFORE_BIDDING" ? (
              <Button
                className="h-full px-3 py-1 text-[12px]"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.replace(`/trade/${product.id}`);
                }}
              >
                거래 상세
              </Button>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col px-2">
          <div className="text-title-main-dark mt-2">
            <p className="text-[12px] opacity-70">입찰가</p>
            <BizzAmount amount={product.amount} className="text-custom-orange-dark font-bold" />
            <p className="mt-2 line-clamp-2 min-h-10 text-[14px] leading-snug">{product.title}</p>
          </div>

          {product.status && (
            <div className="mt-auto mb-3 w-[98%] self-center">
              <ProductStatus context={context} status={product.status} auctionType={product.type} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
