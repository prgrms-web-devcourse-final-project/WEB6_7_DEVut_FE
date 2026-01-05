"use client";

import { useCallback, useEffect } from "react";
import LiveAuctionSide from "@/components/auction/live/liveRoom/side/LiveAuctionSide";
import LiveAuctionStage from "@/components/auction/live/liveRoom/stage/LiveAuctionStage";
import StageBarBackground from "@/components/auction/live/liveRoom/stage/StageBarBackground";
import TabButton from "@/components/auction/live/liveRoom/stage/TabButton";
import MobileSideDrawer from "@/components/common/MobileSideDrawer";
import { enterChatRoom } from "@/features/auction/api/liveAuctionRoom.api";
import { useRoomProducts } from "@/features/auction/hooks/liveAuctionRoom/useLiveAuctionRoom";
import { useLiveRoomStore } from "@/features/auction/store/useLiveRoomStore";
import { useSocketStore } from "@/features/socket/store/useSocketStore";
import { getLiveStatus } from "@/utils/auction";
import { useMe } from "@/features/auth/hooks/useMe";
import { useRouter } from "next/navigation";

export default function LiveAuctionRoomPage() {
  const { data: me } = useMe();
  const router = useRouter();
  const {
    activeAuctionId,
    subscribedAuctionIds,
    chatRoomIds,
    setActiveAuctionId,
    addSubscribedAuctionId,
    setChatRoomId,
    removeSubscribedAuctionId,
  } = useLiveRoomStore();

  const { sendAuctionMessage, subscribeChatRoom, messagesByRoom, unsubscribeChatRoom } =
    useSocketStore();

  const currentAuctionId = activeAuctionId;
  const currentChatRoomId = currentAuctionId != null ? chatRoomIds[currentAuctionId] : undefined;

  const { data: products } = useRoomProducts(
    currentAuctionId ? Number(currentAuctionId) : undefined
  );
  const currentStageProduct = products?.find(
    product => getLiveStatus(product.auctionStatus) === "ONGOING"
  );

  const allClosed =
    products?.every(product => getLiveStatus(product.auctionStatus) === "CLOSE") || false;

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

  const handleCloseRoom = (auctionId: number) => {
    const chatRoomId = chatRoomIds[auctionId];
    if (chatRoomId) {
      unsubscribeChatRoom(chatRoomId);
    }

    removeSubscribedAuctionId(auctionId);
  };

  useEffect(() => {
    enterRoom(activeAuctionId || 1);
  }, [activeAuctionId, enterRoom]);

  useEffect(() => {
    if (activeAuctionId == null) {
      router.replace("/");
    }
  }, [activeAuctionId, router]);

  return (
    <div className="w-full">
      <div className="flex w-full items-stretch">
        <div className="flex min-w-0 flex-1 flex-col">
          <StageBarBackground className="sticky top-0 z-20 h-14 gap-2 px-4">
            {subscribedAuctionIds.map((auctionId, index) => (
              <TabButton
                key={auctionId}
                label={`${index + 1} 번방`}
                active={auctionId === currentAuctionId}
                onClick={() => enterRoom(auctionId)}
                onClose={() => handleCloseRoom(auctionId)}
              />
            ))}
          </StageBarBackground>

          <LiveAuctionStage currentStageProduct={currentStageProduct} allClosed={allClosed} />
        </div>

        <div className="hidden lg:flex lg:w-[28%]">
          <LiveAuctionSide
            me={me}
            products={products}
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
            me={me}
            products={products}
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
