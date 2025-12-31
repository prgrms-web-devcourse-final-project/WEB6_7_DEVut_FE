"use client";

import LiveAuctionSide from "@/components/auction/live/liveRoom/side/LiveAuctionSide";
import LiveAuctionStage from "@/components/auction/live/liveRoom/stage/LiveAuctionStage";
import StageBarBackground from "@/components/auction/live/liveRoom/stage/StageBarBackground";
import TabButton from "@/components/auction/live/liveRoom/stage/TabButton";
import {
  useAudience,
  useLiveAuction,
  useLiveChat,
} from "@/features/auction/hooks/liveAuctionRoom/useLiveAuctionRoom";
import { useState } from "react";

export default function LiveAuctionRoomPage() {
  const [activeRoomId, setActiveRoomId] = useState<number>(1);
  const [subscribedRoomIds, setSubscribedRoomIds] = useState<number[]>([1, 2]);

  const audience = useAudience(activeRoomId);
  const auction = useLiveAuction(activeRoomId);
  const chat = useLiveChat(activeRoomId);

  const roomTabs = subscribedRoomIds.map(roomId => ({
    roomId,
    label: `${roomId} 번방`,
  }));

  const selectRoom = (roomId: number) => {
    setActiveRoomId(roomId);
    setSubscribedRoomIds(prev => (prev.includes(roomId) ? prev : [...prev, roomId]));
  };

  return (
    <div>
      <StageBarBackground className="sticky top-0 h-14 gap-2 px-4">
        {roomTabs.map(tab => (
          <TabButton
            key={tab.roomId}
            label={tab.label}
            active={tab.roomId === activeRoomId}
            onClick={() => selectRoom(tab.roomId)}
          />
        ))}
      </StageBarBackground>
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        <LiveAuctionStage auction={auction} audience={audience} />
        <LiveAuctionSide products={auction.products} chat={chat} />
      </div>
    </div>
  );
}
