"use client";

import { useEffect, useState } from "react";
import { delayAuctionformatRemain } from "@/utils/getRemainingTime";

interface DelayedEndTimerProps {
  endTime: string;
}

export default function DelayedEndTimer({ endTime }: DelayedEndTimerProps) {
  const [remainMs, setRemainMs] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(endTime).getTime();

    const update = () => {
      setRemainMs(target - Date.now());
    };

    update();
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const isEnded = remainMs !== null && remainMs <= 0;

  return (
    <>
      <div className="text-title-sub">{isEnded ? "마감 시간" : "남은 시간"}</div>

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
