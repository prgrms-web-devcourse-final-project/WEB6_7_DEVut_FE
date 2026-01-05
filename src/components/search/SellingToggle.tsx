"use client";

import { twMerge } from "tailwind-merge";

interface SellingToggleProps {
  isSelling: boolean;
  handleIsSelling: () => void;
}

export default function SellingToggle({ isSelling, handleIsSelling }: SellingToggleProps) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <p className="text-custom-dark-brown text-[18px] whitespace-nowrap">판매중인 상품만 보기</p>
      <div
        className={twMerge(
          "border-custom-dark-brown relative h-7 w-14 cursor-pointer rounded-full border-4",
          isSelling && "bg-custom-orange-dark"
        )}
        onClick={handleIsSelling}
      >
        <div
          className={twMerge(
            "border-custom-dark-brown bg-custom-orange absolute top-1/2 left-0 h-6 w-6 -translate-y-1/2 rounded-full border-4",
            "transition-transform duration-300 ease-in-out",
            isSelling && "translate-x-7"
          )}
        />
      </div>
    </div>
  );
}
