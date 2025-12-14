"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";
import ProductStatus from "./ProductStatus";
import liveBadge from "@/assets/common/liveBadge.svg";
import delayBadge from "@/assets/common/delayBadge.svg";
import fullStar from "@/assets/common/fullStar.svg";
import emptyStar from "@/assets/common/emptyStar.svg";
import { useState } from "react";

type Product = "pending" | "processing" | "done" | "confirmed" | "delay" | "offLive" | "onLive";

export default function ProductCard({
  type,
  money,
  title,
  label,
  image,
  isLive,
  isTake,
}: {
  type: Product;
  money: number;
  title: string;
  label?: string;
  image?: string;
  isLive?: boolean;
  isTake?: boolean;
}) {
  const [star, setStar] = useState<boolean>(!!isTake);

  const handleStar = () => {
    setStar(prev => !prev);
  };

  const handleNavigate = () => {
    console.log("추후 상세페이지 이동");
  };

  const formatMoney = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

  return (
    <div
      onClick={handleNavigate}
      className="relative flex h-[279px] w-[238.54px] cursor-pointer items-center justify-center"
    >
      <div
        className="absolute top-[21px] left-[21px] z-20 cursor-pointer transition-transform hover:scale-105 active:scale-90"
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
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center border-[1.5px] border-[#4F382A] bg-[#FDF6E9] shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.5)] transition-transform hover:scale-101 active:scale-99">
        <div
          className={twMerge(
            "relative h-[134px] w-[214px] overflow-hidden rounded-[3px] border border-[#4F382A]",
            !image && "bg-[#D4BBA6]"
          )}
        >
          {image && (
            <Image
              src={image}
              alt="카드 이미지"
              width={214}
              height={134}
              className="object-cover"
            />
          )}

          <div className="absolute top-2 right-2 z-10">
            <Image
              src={isLive ? liveBadge : delayBadge}
              alt={isLive ? "라이브 뱃지" : "지연 뱃지"}
            />
          </div>
        </div>

        <div className="mt-2 flex w-[214px] flex-col">
          <p className="text-[12px] text-[#4F382A] opacity-70">입찰가</p>
          <p className="text-[21px] font-bold text-[#E2703A]">₩ {formatMoney(money)}</p>
          <p className="text-[14px] text-[#4F382A]">{title}</p>
        </div>

        <div className="mt-2">
          <ProductStatus type={type} label={label} />
        </div>
      </div>
    </div>
  );
}
