"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";
import ProductStatus from "./ProductStatus";
import liveBadge from "@/assets/common/liveBadge.svg";
import delayBadge from "@/assets/common/delayBadge.svg";
import fullStar from "@/assets/common/fullStar.svg";
import emptyStar from "@/assets/common/emptyStar.svg";
import { useState } from "react";
import BaseImage from "./BaseImage";
import test from "@/assets/vintage.png";
import BizzAmount from "./BizzAmount";

type Product = "pending" | "processing" | "done" | "confirmed" | "delay" | "offLive" | "onLive";

interface ProductCardProps {
  type: Product;
  money: number;
  title: string;
  label?: string;
  image?: string;
  isLive?: boolean;
  isTake?: boolean;
}

export default function ProductCard({
  type,
  money,
  title,
  label,
  image,
  isLive,
  isTake,
}: ProductCardProps) {
  const [star, setStar] = useState<boolean>(!!isTake);

  const handleStar = () => setStar(prev => !prev);
  const handleNavigate = () => console.log("추후 상세페이지 이동");

  return (
    <div onClick={handleNavigate} className="relative cursor-pointer">
      <button
        className="absolute top-4 left-4 z-20 transition-transform hover:scale-105 active:scale-90"
        onClick={e => {
          e.stopPropagation();
          handleStar();
        }}
      >
        <Image
          src={star ? fullStar : emptyStar}
          alt={star ? "찜됨" : "찜 안됨"}
          width={20}
          height={20}
        />
      </button>

      <div className="flex h-full w-full flex-col items-center rounded-md border-2 border-[#4F382A] bg-[#FDF6E9] shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.01] active:scale-[0.99]">
        <div
          className={twMerge("relative aspect-214/134 w-full overflow-hidden rounded-[3px] p-2")}
        >
          <BaseImage src={test} alt="카드 이미지" />

          <div className="absolute top-3 right-3 z-10">
            <Image
              src={isLive ? liveBadge : delayBadge}
              alt={isLive ? "라이브 뱃지" : "지연 뱃지"}
            />
          </div>
        </div>

        <div className="text-title-main-dark mt-2 flex w-full flex-col px-2">
          <p className="text-[12px] opacity-70">입찰가</p>
          <BizzAmount amount={money} className="text-custom-orange-dark font-bold" />
          <p className="text-[14px]">{title}</p>
        </div>

        <div className="mt-2 mb-3 w-[90%]">
          <ProductStatus type={type} label={label} />
        </div>
      </div>
    </div>
  );
}
