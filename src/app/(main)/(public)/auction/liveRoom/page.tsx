"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import LiveAuctionSide from "@/components/auction/live/liveRoom/side/LiveAuctionSide";
import LiveAuctionStage from "@/components/auction/live/liveRoom/stage/LiveAuctionStage";
import StageBarBackground from "@/components/auction/live/liveRoom/stage/StageBarBackground";
import TabButton from "@/components/auction/live/liveRoom/stage/TabButton";
import MobileSideDrawer from "@/components/common/MobileSideDrawer";

import { enterChatRoom } from "@/features/auction/api/liveAuctionRoom.api";
import { useRoomProducts } from "@/features/auction/hooks/liveAuctionRoom/useLiveAuctionRoom";
import { useLiveRoomStore } from "@/features/auction/store/useLiveRoomStore";
import { useSocketStore } from "@/features/socket/store/useSocketStore";
import { getLiveRoomStatus, getLiveStatus } from "@/utils/auction";
import { useMe } from "@/features/auth/hooks/useMe";

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

  const {
    sendAuctionMessage,
    subscribeChatRoom,
    unsubscribeChatRoom,
    messagesByRoom,
    participantsByAuction,
  } = useSocketStore();

  const current = useMemo(() => {
    if (activeAuctionId == null) return null;

    const chatRoomId = chatRoomIds[activeAuctionId];

    return {
      auctionId: activeAuctionId,
      chatRoomId,
      participants: participantsByAuction[activeAuctionId] ?? 0,
      messages: chatRoomId ? (messagesByRoom[chatRoomId] ?? []) : [],
    };
  }, [activeAuctionId, chatRoomIds, participantsByAuction, messagesByRoom]);

  const { data } = useRoomProducts(current?.auctionId);
  const currentStageProduct = data?.items?.find(
    product => getLiveStatus(product.auctionStatus) === "ONGOING"
  );
  const roomStatus = getLiveRoomStatus(data?.items);

  const enterRoom = useCallback(
    async (auctionId: number) => {
      setActiveAuctionId(auctionId);

      if (!subscribedAuctionIds.includes(auctionId)) {
        addSubscribedAuctionId(auctionId);
      }

      const existingChatRoomId = chatRoomIds[auctionId];
      if (existingChatRoomId) {
        subscribeChatRoom(existingChatRoomId, auctionId);
        return;
      }

      const { chatRoomId } = await enterChatRoom(auctionId);
      const chatIdStr = chatRoomId.toString();

      setChatRoomId(auctionId, chatIdStr);
      subscribeChatRoom(chatIdStr, auctionId);
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

  const closeRoom = useCallback(
    (auctionId: number) => {
      const chatRoomId = chatRoomIds[auctionId];
      if (chatRoomId) {
        unsubscribeChatRoom(chatRoomId);
      }
      removeSubscribedAuctionId(auctionId);
    },
    [chatRoomIds, unsubscribeChatRoom, removeSubscribedAuctionId]
  );

  const sendMessage = (payload: { content: string }) => {
    if (!current?.auctionId) return;
    sendAuctionMessage(current.auctionId, payload);
  };

  useEffect(() => {
    if (activeAuctionId == null) {
      router.replace("/");
      return;
    }
    enterRoom(activeAuctionId);
  }, [activeAuctionId, enterRoom, router]);

  if (!current) return null;

  return (
    <div className="w-full">
      <div className="flex w-full flex-1 items-stretch">
        <div className="flex min-w-0 flex-1 flex-col">
          <StageBarBackground className="sticky top-0 z-20 h-14 gap-2 px-4">
            {subscribedAuctionIds.map((auctionId, index) => (
              <TabButton
                key={auctionId}
                label={`${index + 1} 번방`}
                active={auctionId === current.auctionId}
                onClick={() => enterRoom(auctionId)}
                onClose={() => closeRoom(auctionId)}
              />
            ))}
          </StageBarBackground>

          <div className="flex-1">
            <LiveAuctionStage
              roomId={current.auctionId}
              participants={current.participants}
              currentStageProduct={currentStageProduct}
              roomStatus={roomStatus}
              remaingMs={data?.remainingMs}
            />
          </div>
        </div>

        <div className="hidden lg:flex lg:w-[28%]">
          <LiveAuctionSide
            me={me}
            products={data?.items}
            chat={{
              messages: current.messages,
              sendMessage,
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
            products={data?.items}
            chat={{
              messages: current.messages,
              sendMessage,
            }}
          />
        </MobileSideDrawer>
      </div>
    </div>
  );
}
