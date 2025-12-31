"use client";

import LiveAuctionSide from "@/components/auction/live/liveRoom/side/LiveAuctionSide";
import LiveAuctionStage from "@/components/auction/live/liveRoom/stage/LiveAuctionStage";
import StageBarBackground from "@/components/auction/live/liveRoom/stage/StageBarBackground";
import TabButton from "@/components/auction/live/liveRoom/stage/TabButton";
import MobileSideDrawer from "@/components/common/MobileSideDrawer";
import {
  useAudience,
  useLiveAuction,
} from "@/features/auction/hooks/liveAuctionRoom/useLiveAuctionRoom";
import { useLiveChat } from "@/features/auction/hooks/liveAuctionRoom/useLiveChat";
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
    <div className="w-full">
      <div className="flex w-full items-stretch">
        <div className="flex min-w-0 flex-1 flex-col">
          <StageBarBackground className="sticky top-0 z-30 h-14 gap-2 px-4">
            {roomTabs.map(tab => (
              <TabButton
                key={tab.roomId}
                label={tab.label}
                active={tab.roomId === activeRoomId}
                onClick={() => selectRoom(tab.roomId)}
              />
            ))}
          </StageBarBackground>

          <LiveAuctionStage auction={auction} audience={audience} />
        </div>

        <div className="hidden lg:flex lg:w-[28%] lg:items-stretch">
          <LiveAuctionSide products={auction.products} chat={chat} />
        </div>
      </div>

      <div className="lg:hidden">
        <MobileSideDrawer
          trigger={
            <button className="border-border-sub bg-custom-brown text-title-main-dark fixed right-0 bottom-0 left-0 z-40 flex h-14 w-full items-center justify-center gap-2 rounded-t-md border-t-2 text-sm font-semibold">
              채팅 · 상품 목록
            </button>
          }
        >
          <LiveAuctionSide products={auction.products} chat={chat} />
        </MobileSideDrawer>
      </div>
    </div>
  );
}
