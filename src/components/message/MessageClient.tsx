"use client";

import { useEffect, useState } from "react";
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight";
import { useDMList } from "@/features/message/hooks/useDMList";
import { useMessageContext } from "./MessageShell";
import { useRouter, useSearchParams } from "next/navigation";
import { useDMSocketStore } from "@/features/socket/store/useDMSocketStore";
import { DMDetailByItemId } from "@/features/message/api/message.api";
import { useQueryClient } from "@tanstack/react-query";

interface MessageClientProps {
  roomId?: number | null;
  productId?: number | null;
}

export default function MessageClient({
  roomId: propRoomId,
  productId: propProductId,
}: MessageClientProps) {
  const { meId } = useMessageContext();
  const { data: dmList } = useDMList();
  const queryClient = useQueryClient();
  const subscribeDM = useDMSocketStore(state => state.subscribeDM);
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramProductId = searchParams.get("productId");
  const paramRoomId = searchParams.get("roomId");

  // prop 우선, 그 후 param까지 없으면 null
  const roomId = propRoomId ?? (paramRoomId ? Number(paramRoomId) : null);
  const productId = propProductId ?? (paramProductId ? Number(paramProductId) : null);

  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(roomId || null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(productId || null);
  const [isChatOpen, setIsChatOpen] = useState(!!(roomId || productId));

  useEffect(() => {
    if (roomId) {
      /* eslint-disable react-hooks/exhaustive-deps */
      setSelectedRoomId(roomId);
      setSelectedProductId(null); // Clear productId when navigating by room
      setIsChatOpen(true);

      // roomId로 직접 진입한 경우에도 즉시 읽음 처리
      queryClient.setQueryData<DMRoomListResponse | undefined>(["dm-list"], prev => {
        if (!prev) return prev;
        return {
          ...prev,
          chatRooms: prev.chatRooms.map(room =>
            room.chatRoomId === roomId ? { ...room, hasUnreadMessage: false } : room
          ),
        };
      });
    } else if (productId) {
      setSelectedProductId(productId);
      setSelectedRoomId(null); // Clear roomId when navigating by product
      setIsChatOpen(true);
    }
  }, [roomId, productId]);

  // 상품 상세에서 '대화하기'로 진입한 경우,
  // 상품 ID 기반 DM 상세 조회 API로 기존 채팅방 존재 여부를 확인하고
  // 이미 방이 있으면 해당 roomId로 라우팅 전환
  useEffect(() => {
    if (!productId) return;

    (async () => {
      try {
        const detail = await DMDetailByItemId(productId);
        if (detail.exists && detail.chatRoomId) {
          router.replace(`/message/${detail.chatRoomId}`);
        }
      } catch (error) {
        console.error("[MessageClient] Failed to fetch DM detail by itemId:", error);
      }
    })();
  }, [productId, router]);

  // 유저가 속한 모든 채팅방을 선구독하여 어느 화면이든 실시간 수신되도록 함
  // (전역 SideBarItems에서 이미 선구독하고 있으므로 이곳에서는 중복 구독 불필요)

  const openRoom = (roomId: number) => {
    setSelectedRoomId(roomId);
    setSelectedProductId(null);
    setIsChatOpen(true);

    // 방을 연 즉시 해당 방의 읽지 않은 메시지 상태를 해제 (프론트 캐시 기준)
    queryClient.setQueryData<DMRoomListResponse | undefined>(["dm-list"], prev => {
      if (!prev) return prev;
      return {
        ...prev,
        chatRooms: prev.chatRooms.map(room =>
          room.chatRoomId === roomId ? { ...room, hasUnreadMessage: false } : room
        ),
      };
    });
  };

  const closeRoom = () => {
    setIsChatOpen(false);
    setTimeout(() => {
      setSelectedRoomId(null);
      setSelectedProductId(null);
      router.replace("/message");
    }, 300);
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-row overflow-hidden bg-[#F5F1EB]">
      <MessageLeft selectedRoomId={selectedRoomId} onSelectRoom={openRoom} />
      <MessageRight
        roomId={selectedRoomId}
        productId={selectedProductId}
        onBack={closeRoom}
        isOpen={isChatOpen}
      />
    </div>
  );
}
