"use client";

import { delayAuctionformatRemain } from "@/utils/getRemainingTime";
import { cva } from "class-variance-authority";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const timeBarCva = cva(
  "flex h-[33.53px] w-full items-center justify-center gap-1 rounded-[3px] border-2 border-[#4F382A] text-[13px]",
  {
    variants: {
      context: {
        CARD: "",
        MY_BUYING: "",
        MY_SELLING: "",
      },
      auctionType: {
        LIVE: "",
        DELAYED: "",
      },
    },
    compoundVariants: [
      {
        context: "CARD",
        auctionType: "LIVE",
        className: "bg-custom-orange text-title-main",
      },
      {
        context: "CARD",
        auctionType: "DELAYED",
        className: "bg-custom-brown text-title-main-dark",
      },
      {
        context: ["MY_BUYING", "MY_SELLING"],
        className: "bg-custom-brown text-title-main-dark",
      },
    ],
    defaultVariants: {
      context: "CARD",
      auctionType: "DELAYED",
    },
  }
);

interface TimeBarProps {
  context: ProductContext;
  auctionType: AuctionType;
  time: string;
  label?: string;
}

export function TimeBar({ context, auctionType, time, label }: TimeBarProps) {
  const [remainMs, setRemainMs] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(time).getTime();

    const update = () => {
      setRemainMs(target - Date.now());
    };

    update();
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const displayAuctionType = (auctionType === "ALL" ? "DELAYED" : auctionType) as
    | "LIVE"
    | "DELAYED";

  return (
    <div className={timeBarCva({ context, auctionType: displayAuctionType })}>
      <Clock size={16} className="text-custom-dark-brown" />
      <span>
        {label && <span className="mr-1">{label}</span>}
        {remainMs === null ? "— — : — — : — —" : delayAuctionformatRemain(remainMs)}
      </span>
    </div>
  );
}
