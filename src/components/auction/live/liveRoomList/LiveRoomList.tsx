"use client";

import { ChevronLeft, ChevronRight, RadioIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import test from "@/assets/images/auction/auctioneer.svg";
import Button from "@/components/common/Button";

export const auctionItems = [
  { id: 1, title: "빈티지 목각 자동차", image: "" },
  { id: 2, title: "앤틱 포슬린 인형", image: "" },
  { id: 3, title: "객석 청소중", image: "" },
  { id: 4, title: "레트로 필름 카메라", image: "" },
  { id: 5, title: "1950년대 양철 로봇", image: "" },
];

export default function LiveRoomList() {
  const [activeIndex, setActiveIndex] = useState(2);
  const total = auctionItems.length;

  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const visible = [prevIndex, activeIndex, nextIndex];

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-10 overflow-hidden">
      <div className="relative flex items-center">
        <button
          onClick={() => setActiveIndex(prevIndex)}
          className="border-border-main bg-content-area shadow-flat-dark absolute left-6 z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 transition hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="text-title-main-dark h-6 w-6" />
        </button>

        <div className="flex items-center justify-center gap-8">
          {visible.map(index => {
            const item = auctionItems[index];
            const isCenter = index === activeIndex;

            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer transition-all duration-500 ease-out ${
                  isCenter ? "z-20 scale-105 opacity-100" : "z-10 scale-80 opacity-40 blur-[1px]"
                } `}
              >
                <div className="border-border-main bg-content-area shadow-flat-dark h-[260px] w-[420px] rounded-xl border-2">
                  <Image
                    src={test}
                    alt={item.title}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setActiveIndex(nextIndex)}
          className="border-border-main bg-content-area shadow-flat-dark absolute right-6 z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 transition hover:scale-105 active:scale-95"
        >
          <ChevronRight className="text-title-main-dark h-6 w-6" />
        </button>
      </div>

      <Button
        className="bg-custom-orange-dark shadow-flat px-15 text-white hover:brightness-105"
        leftIcon={<RadioIcon className="text-custom-red" />}
      >
        라이브 입장하기
      </Button>
    </div>
  );
}
