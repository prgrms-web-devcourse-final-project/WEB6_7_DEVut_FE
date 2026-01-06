"use client";

import { twMerge } from "tailwind-merge";
import Image from "next/image";
import tape from "@/assets/notify/tape.svg";

interface TradeItemProps {
  children: React.ReactNode;
  leftSlot?: React.ReactNode;
  className?: string;
}

export default function TradeItem({ children, leftSlot, className }: TradeItemProps) {
  return (
    <div
      className={twMerge(
        `border-border-main bg-btn-default text-custom-dark-brown relative mb-6 ml-14 flex min-h-[52px] items-center gap-3 rounded-lg border-2 px-4 py-3 shadow-[3px_3px_0_#A1887F]`,
        className
      )}
    >
      <Image src={tape} alt="tape" className="absolute -left-5 -rotate-3" />
      {leftSlot && <span className="text-xl">{leftSlot}</span>}
      <span className="flex-1">{children}</span>
    </div>
  );
}
