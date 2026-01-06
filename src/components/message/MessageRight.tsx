"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import StatusBadge from "../common/StatusBadge";

import dummyImage2 from "@/assets/message/dummyImage2.jpg";
import sendButton from "@/assets/message/sendButton.svg";
import productSelector from "@/assets/message/productSelector.svg";

import { useDMSocketStore } from "@/features/socket/store/useDMSocketStore";
import { useMessageContext } from "./MessageShell";
import { useDMDetailByRoomId, useDMDetailByItemId } from "@/features/message/hooks/useDMDetail";
import BizzAmount from "../common/BizzAmount";
import { useQueryClient } from "@tanstack/react-query";

interface MessageRightProps {
  roomId?: number | null;
  productId?: number | null;
  isOpen: boolean;
  onBack: () => void;
}

export default function MessageRight({ roomId, productId, isOpen, onBack }: MessageRightProps) {
  const { meId } = useMessageContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: dmDetailByRoom, refetch: refetchByRoom } = useDMDetailByRoomId(roomId ?? null);
  const { data: dmDetailByItem, refetch: refetchByItem } = useDMDetailByItemId(productId ?? null);

  const dmdetail = dmDetailByRoom || dmDetailByItem;

  // Zustand store에서 명시적으로 messagesByRoom 구독 (shallow comparison 방지)
  const messagesByRoom = useDMSocketStore(state => state.messagesByRoom);
  const subscribeDM = useDMSocketStore(state => state.subscribeDM);
  const unsubscribeDM = useDMSocketStore(state => state.unsubscribeDM);
  const sendDM = useDMSocketStore(state => state.sendDM);
  const addDMMessage = useDMSocketStore(state => state.addDMMessage);

  console.log("[MessageRight] messagesByRoom updated, keys:", Object.keys(messagesByRoom));

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  // 수신(구독/상태)에 사용할 ID: roomId(이미 있는 방) 우선, 없으면 상세의 chatRoomId.
  const activeChatRoomId = roomId ?? dmdetail?.chatRoomId ?? null;

  const initialMessages = useMemo(
    () => ((roomId || productId) && dmdetail?.messages ? dmdetail.messages : []),
    [roomId, productId, dmdetail]
  );

  const socketMessages = useMemo(() => {
    const messages = activeChatRoomId ? (messagesByRoom[activeChatRoomId] ?? []) : [];
    console.log("[MessageRight] socketMessages updated:", {
      activeChatRoomId,
      count: messages.length,
      messages,
    });
    return messages;
  }, [activeChatRoomId, messagesByRoom]);

  const allMessages = useMemo(() => {
    const combined = [...initialMessages, ...socketMessages];
    console.log("[MessageRight] allMessages:", {
      initialCount: initialMessages.length,
      socketCount: socketMessages.length,
      totalCount: combined.length,
    });
    return combined;
  }, [initialMessages, socketMessages]);

  // 상대방 프로필 이미지: DM 상세에서 가져오거나, 메시지에서 찾기
  const opponentProfileImage = useMemo(() => {
    // 1. DM 상세에서 상대방 정보 찾기 (dmdetail.messages에서 상대방 메시지 찾기)
    const opponentFromDetail = initialMessages.find(m => m.senderId !== meId);
    if (opponentFromDetail?.profileImageUrl) {
      return opponentFromDetail.profileImageUrl;
    }

    // 2. 소켓 메시지에서 상대방 정보 찾기
    const opponentFromSocket = socketMessages.find(m => m.senderId !== meId);
    if (opponentFromSocket?.profileImageUrl) {
      return opponentFromSocket.profileImageUrl;
    }

    // 3. 없으면 기본 이미지
    return null;
  }, [initialMessages, socketMessages, meId]);

  // 날짜별로 메시지 그룹화 및 날짜 구분선 추가
  const messagesWithDateDividers = useMemo(() => {
    if (allMessages.length === 0) return [];

    const result: Array<
      { type: "message"; data: (typeof allMessages)[0] } | { type: "dateDivider"; date: string }
    > = [];
    let lastDate = "";

    allMessages.forEach(msg => {
      const msgDate = new Date(msg.sendTime);
      const dateStr = `${msgDate.getFullYear()}.${msgDate.getMonth() + 1}.${msgDate.getDate()}`;

      // 날짜가 바뀌면(첫 메시지 포함) 항상 구분선 추가
      if (dateStr !== lastDate) {
        result.push({ type: "dateDivider", date: dateStr });
        lastDate = dateStr;
      }

      result.push({ type: "message", data: msg });
    });

    return result;
  }, [allMessages]);

  // 메시지 수신을 위한 chatRoomId 구독
  useEffect(() => {
    if (activeChatRoomId && isOpen) {
      console.log("[MessageRight] Subscribing to chatRoomId:", activeChatRoomId);
      subscribeDM(activeChatRoomId);
      return () => unsubscribeDM(activeChatRoomId);
    }
  }, [activeChatRoomId, isOpen, subscribeDM, unsubscribeDM]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  const targetItem = useMemo(() => {
    if (dmdetail?.itemInfo) {
      return {
        id: dmdetail.itemInfo.itemId,
        name: dmdetail.itemInfo.itemName,
        price: dmdetail.itemInfo.currentPrice,
        image: dmdetail.itemInfo.itemImageUrl,
      };
    }
    return null;
  }, [dmdetail]);

  const opponent = allMessages.find(m => m.senderId !== meId);

  const handleSend = async () => {
    const value = inputValue.trim();
    if (!value || !meId) return;

    // 메시지 전송에 사용할 식별자들
    const sendProductId = productId || dmdetail?.itemInfo?.itemId;
    const resolvedChatRoomId = activeChatRoomId ?? dmdetail?.chatRoomId ?? null;
    const isExistingRoom = roomId !== null && roomId !== undefined ? true : !!dmdetail?.chatRoomId;

    if (!sendProductId) {
      console.error("[MessageRight] No productId available for sending");
      alert("상품 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    // 기존 채팅방인데 chatRoomId가 아직 준비되지 않은 경우, 새 채팅 생성 루프로 넘어가지 않도록 차단
    if (isExistingRoom && !resolvedChatRoomId) {
      console.warn("[MessageRight] Existing room but chatRoomId not ready yet");
      alert("채팅방 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    console.log("[MessageRight] Sending message:", {
      sendProductId,
      activeChatRoomId,
      isNewChat: !activeChatRoomId,
    });

    // 1. WebSocket을 통해 메시지 전송 (송신은 productId 기반)
    sendDM(sendProductId, { content: value });

    // 2. 기존 채팅방이면 서버 에코에만 의존 (중복 말풍선 방지)
    if (resolvedChatRoomId) {
      console.log("[MessageRight] Existing room send - rely on server echo for rendering");
      queryClient.invalidateQueries({ queryKey: ["dm-list"] });
    } else {
      // 완전히 새로운 채팅(기존 방 없음, productId만 있는 경우)에 한해 polling
      console.log("[MessageRight] New chat - will poll for chatRoomId");

      // 클로저를 위해 변수 저장
      const messageContent = value;
      const itemId = sendProductId;

      // 재시도 로직... 임시방편. 웹소캣 연결 지연 문제 때문에 채팅방 ID가 바로 안 내려오는 경우가 있음
      const pollForChatRoomId = async (retries = 5) => {
        for (let i = 0; i < retries; i++) {
          console.log(`[MessageRight] Polling attempt ${i + 1}/${retries}, itemId:`, itemId);

          try {
            const result = itemId ? await refetchByItem() : null;
            console.log(`[MessageRight] Attempt ${i + 1} - Refetch result:`, result?.data);

            const newChatRoomId = result?.data?.chatRoomId;

            if (newChatRoomId) {
              console.log("[MessageRight] ✅ Got chatRoomId:", newChatRoomId);

              queryClient.invalidateQueries({ queryKey: ["dm-list"] });
              router.push(`/message/${newChatRoomId}`);

              return; // 성공하면 종료
            }

            console.log(`[MessageRight] Attempt ${i + 1} - No chatRoomId yet, waiting...`);
          } catch (error) {
            console.error(`[MessageRight] Attempt ${i + 1} - Error:`, error);
          }

          if (i < retries - 1) {
            await new Promise(resolve => setTimeout(resolve, 500 * (i + 1)));
          }
        }

        console.error("[MessageRight] ❌ Failed to get chatRoomId after", retries, "attempts");
        alert("채팅방 생성에 실패했습니다. 페이지를 새로고침해주세요.");
      };

      setTimeout(() => pollForChatRoomId(), 500);
    }

    setInputValue("");
  };

  if (roomId === null && productId === null) {
    return (
      <div className="bg-bg-main hidden items-center justify-center lg:flex lg:flex-1">
        <p className="text-lg text-[#A1887F]">채팅방을 선택해 주세요</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-bg-main fixed inset-0 z-50 flex h-full max-h-full min-h-0 flex-col transition-all duration-250 ease-in-out lg:static lg:z-auto lg:h-full lg:max-h-full lg:min-h-0 lg:flex-1 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex min-h-[65px] items-center gap-3 border-b-2 border-[#6D4C41] px-4 py-5">
        <button className="cursor-pointer text-2xl text-[#6D4C41]" onClick={onBack}>
          {">"}
        </button>
        <p className="text-[20px] text-[#8D6E63]">{opponent?.nickname ?? "채팅"}</p>
      </div>

      <div className="flex h-[117px] flex-shrink-0 items-center justify-center border-b border-[#6D4C41] bg-[#FDF6E9] p-4">
        <button
          onClick={() => router.push(`/product/${targetItem?.id}`)}
          className="flex h-full w-full cursor-pointer flex-row items-center rounded-lg border-2 border-[#A1887F] p-[15px] shadow-[3px_3px_0px_rgba(109,76,65,0.4)] transition-all hover:scale-101 active:scale-99"
        >
          <div className="h-16 w-16 overflow-hidden rounded-md border-3 border-[#6D4C41]">
            {targetItem?.image && (
              <Image src={targetItem.image} alt={targetItem.name} width={64} height={64} />
            )}
          </div>

          <div className="flex flex-col p-4">
            <div className="flex flex-row gap-2">
              {/* <StatusBadge status="pending" /> */}
              <p className="text-title-sub text-[18px] font-bold">{targetItem?.name}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="text-title-sub2 text-left text-[14px]">현재가</span>
              <BizzAmount amount={targetItem?.price ?? 0} />
            </div>
          </div>
          <Image className="ml-auto" src={productSelector} alt="" width={41} height={36} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
        {allMessages.length === 0 && dmdetail?.exists === false ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-xl font-bold text-[#8D6E63] opacity-60">무엇을 질문해 볼까요?</p>
          </div>
        ) : (
          messagesWithDateDividers.map((item, idx) => {
            if (item.type === "dateDivider") {
              return (
                <div
                  key={`divider-${item.date}-${idx}`}
                  className="flex items-center justify-center py-2"
                >
                  <div className="flex items-center gap-2">
                    {/* <div className="h-px flex-1 bg-[#A1887F] opacity-80"></div> */}
                    <div className="text-title-sub/50">
                      ---------
                      <span className="border-border-sub rounded-full border-2 bg-white px-1.5 py-0.5 text-[12px] whitespace-nowrap text-[#A1887F]">
                        {item.date}
                      </span>
                      ----------
                    </div>
                    <div className="h-px flex-1 bg-[#A1887F] opacity-80"></div>
                  </div>
                </div>
              );
            }

            const msg = item.data;
            const isMine = meId ? msg.senderId === meId : false;

            return (
              <div
                key={msg.id || idx}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                {!isMine && (
                  <div className="mr-3 h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#6D4C41]">
                    {opponentProfileImage ? (
                      <Image
                        src={opponentProfileImage}
                        alt={`${msg.senderId}`}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                        {msg.nickname?.charAt(0) ?? "?"}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex max-w-[50%] flex-col">
                  {!isMine && <p className="text-lg font-bold text-[#6D4C41]">{msg.nickname}</p>}

                  <div
                    className={`rounded-br-xl rounded-bl-xl border-2 px-4 py-2 text-[16px] ${
                      isMine
                        ? "rounded-tl-xl border-[#A15C07] bg-[#FFB74D] text-white shadow-[3px_3px_0px_#A15C07]"
                        : "rounded-tr-xl border-[#A1887F] bg-[#F4F4F4] text-[#5D4037]"
                    }`}
                  >
                    {msg.content}
                  </div>

                  <span
                    className={`mt-1 ${
                      isMine ? "self-end" : "self-start"
                    } text-[12px] text-[#A1887F]`}
                  >
                    {new Date(msg.sendTime).toLocaleTimeString("ko-KR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <form
        className="relative flex flex-row gap-2 border-t-2 border-[#6D4C41] bg-[#EFE6D9] p-3"
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          ref={inputRef}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="h-[55px] w-full rounded-full border-3 border-[#6D4C41] bg-[#FEFCF5] px-4 py-2 text-[#5D4037] outline-none"
        />
        <button
          type="submit"
          disabled={inputValue.trim().length === 0}
          className={
            inputValue.trim().length === 0
              ? "cursor-not-allowed opacity-40"
              : "cursor-pointer transition-all hover:scale-105 active:scale-98"
          }
        >
          <Image src={sendButton} alt="보내기" width={50} height={50} />
        </button>
      </form>
    </div>
  );
}
