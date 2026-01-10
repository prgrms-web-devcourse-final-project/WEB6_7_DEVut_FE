"use client";

import { getLiveEnterStatus } from "@/utils/auction";
import Button from "../common/Button";

interface LiveActionButtonProps {
  auctionStatus: AuctionStatus;
  onEnter: () => void;
  liveTime: string;
}

export function LiveActionButton({ auctionStatus, onEnter, liveTime }: LiveActionButtonProps) {
  const liveStatus = getLiveEnterStatus(auctionStatus, liveTime);

  if (liveStatus === "READY") {
    return (
      <Button className="flex-1" disabled>
        라이브 준비중
      </Button>
    );
  }

  if (liveStatus === "ONGOING") {
    return (
      <Button onClick={onEnter} className="bg-custom-orange flex-1 text-white">
        라이브 입장하기
      </Button>
    );
  }

  return (
    <Button className="flex-1" disabled>
      라이브 종료
    </Button>
  );
}
