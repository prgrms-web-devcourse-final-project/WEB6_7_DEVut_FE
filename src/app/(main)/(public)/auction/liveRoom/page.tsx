"use client";

import { useCallback, useEffect } from "react";

import LiveAuctionSide from "@/components/auction/live/liveRoom/side/LiveAuctionSide";
import LiveAuctionStage from "@/components/auction/live/liveRoom/stage/LiveAuctionStage";
import StageBarBackground from "@/components/auction/live/liveRoom/stage/StageBarBackground";
import TabButton from "@/components/auction/live/liveRoom/stage/TabButton";
import MobileSideDrawer from "@/components/common/MobileSideDrawer";

import { enterChatRoom } from "@/features/auction/api/liveAuctionRoom.api";
import {
  useAudience,
  useLiveAuction,
} from "@/features/auction/hooks/liveAuctionRoom/useLiveAuctionRoom";

import { useLiveRoomStore } from "@/features/auction/store/useLiveRoomStore";
import { useSocketStore } from "@/features/socket/store/useSocketStore";

export default function LiveAuctionRoomPage() {
  const {
    activeAuctionId,
    subscribedAuctionIds,
    chatRoomIds,
    setActiveAuctionId,
    addSubscribedAuctionId,
    setChatRoomId,
  } = useLiveRoomStore();

  const { sendAuctionMessage, subscribeChatRoom, messagesByRoom } = useSocketStore();

  const currentAuctionId = activeAuctionId;
  const audience = useAudience(currentAuctionId ?? 0);
  const auction = useLiveAuction(currentAuctionId ?? 0);
  const currentChatRoomId = currentAuctionId != null ? chatRoomIds[currentAuctionId] : undefined;
  const messages = currentChatRoomId != null ? (messagesByRoom[currentChatRoomId] ?? []) : [];

  const enterRoom = useCallback(
    async (auctionId: number) => {
      setActiveAuctionId(auctionId);

      if (!subscribedAuctionIds.includes(auctionId)) {
        addSubscribedAuctionId(auctionId);
      }

      const existingChatRoomId = chatRoomIds[auctionId];
      if (existingChatRoomId) {
        subscribeChatRoom(existingChatRoomId);
        return;
      }

      const { chatRoomId } = await enterChatRoom(auctionId);
      const chatIdStr = chatRoomId.toString();

      setChatRoomId(auctionId, chatIdStr);
      subscribeChatRoom(chatIdStr);
    },
    [
      addSubscribedAuctionId,
      chatRoomIds,
      setActiveAuctionId,
      setChatRoomId,
      subscribeChatRoom,
      subscribedAuctionIds,
    ]
  );

  useEffect(() => {
    enterRoom(activeAuctionId || 1);
  }, [activeAuctionId, enterRoom]);

  return (
    <div className="w-full">
      <div className="flex w-full items-stretch">
        <div className="flex min-w-0 flex-1 flex-col">
          <StageBarBackground className="sticky top-0 z-30 h-14 gap-2 px-4">
            {subscribedAuctionIds.map((auctionId, index) => (
              <TabButton
                key={auctionId}
                label={`${index + 1} 번방`}
                active={auctionId === currentAuctionId}
                onClick={() => enterRoom(auctionId)}
              />
            ))}
          </StageBarBackground>

          <LiveAuctionStage auction={auction} audience={audience} />
        </div>

        <div className="hidden lg:flex lg:w-[28%]">
          <LiveAuctionSide
            products={auction.products}
            chat={{
              messages,
              sendMessage: (payload: { content: string }) =>
                currentAuctionId && sendAuctionMessage(currentAuctionId, payload),
            }}
          />
        </div>
      </div>

      <div className="lg:hidden">
        <MobileSideDrawer
          trigger={
            <button className="bg-custom-brown text-title-main-dark fixed right-0 bottom-0 left-0 z-40 h-14 border-t-2">
              채팅 · 상품 목록
            </button>
          }
        >
          <LiveAuctionSide
            products={auction.products}
            chat={{
              messages,
              sendMessage: (payload: { content: string }) =>
                currentAuctionId && sendAuctionMessage(currentAuctionId, payload),
            }}
          />
        </MobileSideDrawer>
      </div>
    </div>
  );
}
