"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import fullStar from "@/assets/common/fullStar.svg";
import emptyStar from "@/assets/common/emptyStar.svg";

import BaseImage from "./BaseImage";
import BizzAmount from "./BizzAmount";
import ProductStatus from "./ProductStatus";

import test from "@/assets/images/auction/auctioneer.svg";

export default function ProductCard({
  data,
  context,
  className,
}: {
  data: ProductCardType;
  context: ProductContext;
  className?: string;
}) {
  const [star, setStar] = useState<boolean>(!!data.isWish);

  return (
    <Link href={data.href} className={twMerge("relative cursor-pointer", className)}>
      <button
        className="absolute top-4 left-4 z-20 transition-transform hover:scale-105 active:scale-90"
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
          <BaseImage src={test} alt={data.title} />

          {data.badge && (
            <div className="absolute top-3 right-3 z-10">
              <Image src={data.badge.image} alt={data.badge.alt} />
            </div>
          )}
        </div>

        <div className="text-title-main-dark mt-2 flex w-full flex-col px-2">
          <p className="text-[12px] opacity-70">입찰가</p>
          <BizzAmount amount={1000000} className="text-custom-orange-dark font-bold" />
          <p className="text-[14px]">{data.title}</p>
        </div>

        {data.status && (
          <div className="mt-2 mb-3 w-[90%] self-center">
            <ProductStatus context={context} status={data.status} auctionType={data.type} />
          </div>
        )}
      </div>
    </Link>
  );
}
