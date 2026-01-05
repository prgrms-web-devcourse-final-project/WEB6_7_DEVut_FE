"use client";

import { useEffect, useState } from "react";
import { delayAuctionformatRemain } from "@/utils/getRemainingTime";
import { getDelayStatus } from "@/utils/auction";

interface DelayedEndTimerProps {
  endTime: string;
  auctionStatus: AuctionStatus;
}

export default function DelayedEndTimer({ endTime, auctionStatus }: DelayedEndTimerProps) {
  const [remainMs, setRemainMs] = useState<number | null>(null);
  const isClose = getDelayStatus(auctionStatus) === "CLOSE";

  useEffect(() => {
    const target = new Date(endTime).getTime();

    const update = () => {
      setRemainMs(target - Date.now());
    };

    update();
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const isEnded = (remainMs !== null && remainMs <= 0) || isClose;

  return (
    <>
      <div className="text-title-sub">마감 시간</div>

      <div className={`text-title-main-dark ${isEnded ? "text-custom-red font-bold" : ""}`}>
        {remainMs === null
          ? "— — : — — : — —"
          : isEnded
            ? "마감"
            : delayAuctionformatRemain(remainMs)}
      </div>
    </>
  );
}
