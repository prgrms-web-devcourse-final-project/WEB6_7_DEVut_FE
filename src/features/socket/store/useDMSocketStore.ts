import { create } from "zustand";
import { StompSubscription } from "@stomp/stompjs";
import type { QueryClient } from "@tanstack/react-query";
import { stompClient } from "../stompClient";
import { DMDetailByChatRoomId } from "@/features/message/api/message.api";
import { UiMessage } from "@/features/message/types/DM.type";

interface DMSocketStore {
  messagesByRoom: Record<number, UiMessage[]>;
  subscriptions: Record<number, StompSubscription | null>;
  activeRoomId: number | null;
  queryClient: QueryClient | null;

  subscribeDM: (chatRoomId: number) => void;
  unsubscribeDM: (chatRoomId: number) => void;
  sendDM: (itemId: number, payload: { content: string }) => void;
  addDMMessage: (chatRoomId: number, msg: UiMessage) => void;
  setActiveRoomId: (roomId: number | null) => void;
  setQueryClient: (client: QueryClient) => void;
}

export const useDMSocketStore = create<DMSocketStore>((set, get) => ({
  messagesByRoom: {},
  subscriptions: {},
  activeRoomId: null,
  queryClient: null,

  setActiveRoomId: roomId => set({ activeRoomId: roomId }),
  setQueryClient: client => set({ queryClient: client }),

  addDMMessage: (chatRoomId, msg) => {
    console.log("[useDMSocketStore] addDMMessage called:", { chatRoomId, msg });
    set(state => {
      const prev = state.messagesByRoom[chatRoomId] ?? [];
      // 동일 ID 메시지 중복 방지 (서버 에코와 클라이언트 임시 추가가 중복될 수 있음)
      const exists = prev.some(m => m.id === msg.id);
      if (exists) {
        console.warn("[useDMSocketStore] 중복 메시지 무시됨:", {
          chatRoomId,
          msgId: msg.id,
        });
        return state;
      }

      const newMessages = [...prev, msg];
      console.log(
        "[useDMSocketStore] New message count for room",
        chatRoomId,
        ":",
        newMessages.length
      );
      return {
        messagesByRoom: {
          ...state.messagesByRoom,
          [chatRoomId]: newMessages,
        },
      };
    });
  },

  sendDM: (productId, payload) => {
    console.log("[STOMP DM SEND]", productId, payload);

    if (!stompClient.connected) {
      console.error("[STOMP DM] Cannot send - not connected");
      stompClient.activate();
      setTimeout(() => {
        if (!stompClient.connected) return;
        try {
          stompClient.publish({
            destination: `/send/chat/dm/${productId}`,
            body: JSON.stringify(payload),
          });
        } catch (error) {
          console.error("[STOMP DM] Send failed after reconnect:", error);
        }
      }, 500);
      return;
    }

    try {
      stompClient.publish({
        destination: `/send/chat/dm/${productId}`,
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("[STOMP DM] Send failed:", error);
    }
  },

  subscribeDM: chatRoomId => {
    // 이미 구독 중이면 중복 방지
    const { subscriptions } = get();
    if (subscriptions[chatRoomId]) return;

    // STOMP가 아직 연결되지 않은 경우:
    // - 일단 구독 의도만 기록해 두고(null)
    // - 연결(onConnect) 시점에 stompClient가
    //   현재 subscriptions의 key들을 보고 다시 subscribeDM을 호출함
    if (!stompClient.connected) {
      console.warn(
        "[STOMP DM] Not connected yet. Will subscribe on connect. ChatRoomId:",
        chatRoomId
      );
      set(state => ({
        subscriptions: { ...state.subscriptions, [chatRoomId]: null },
      }));
      return;
    }

    console.log("[STOMP DM SUBSCRIBE]", chatRoomId);

    try {
      // 서버에게 이 채팅방 메시지 보내줘 요청
      const sub = stompClient.subscribe(`/receive/chat/dm/${chatRoomId}`, frame => {
        console.log("[STOMP DM RECEIVE]", frame.body);
        try {
          // 메시지 받으면 파싱해서 상태에 추가
          const msg = JSON.parse(frame.body);
          get().addDMMessage(chatRoomId, msg);

          // MessageLeft 업데이트를 위해 dm-list 쿼리 무효화 (동적 import 방지를 위해 window 사용)
          const queryClient =
            get().queryClient ??
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (typeof window !== "undefined" ? ((window as any).queryClient as QueryClient) : null);
          if (!queryClient) return;

          const prev = queryClient.getQueryData<DMRoomListResponse>(["dm-list"]);
          const { activeRoomId } = get();
          if (activeRoomId === chatRoomId) {
            void DMDetailByChatRoomId(chatRoomId)
              .then(() => {
                if (!prev) {
                  queryClient.invalidateQueries({ queryKey: ["dm-list"] });
                  return;
                }
                queryClient.setQueryData<DMRoomListResponse>(["dm-list"], data => {
                  if (!data) return data;
                  return {
                    ...data,
                    chatRooms: data.chatRooms.map(room =>
                      room.chatRoomId === chatRoomId
                        ? {
                            ...room,
                            lastMessage: msg.content ?? room.lastMessage,
                            lastMessageTime: msg.sendTime ?? room.lastMessageTime,
                            hasUnreadMessage: false,
                          }
                        : room
                    ),
                  };
                });
              })
              .catch(error => {
                console.error("[STOMP DM] Failed to mark room as read:", error);
              });
          } else if (prev) {
            queryClient.setQueryData<DMRoomListResponse>(["dm-list"], data => {
              if (!data) return data;
              return {
                ...data,
                chatRooms: data.chatRooms.map(room =>
                  room.chatRoomId === chatRoomId
                    ? {
                        ...room,
                        lastMessage: msg.content ?? room.lastMessage,
                        lastMessageTime: msg.sendTime ?? room.lastMessageTime,
                        hasUnreadMessage: true,
                      }
                    : room
                ),
              };
            });
          } else {
            queryClient.invalidateQueries({ queryKey: ["dm-list"] });
          }

          // 안전망: 위의 분기와 무관하게 항상 dm-list를 한 번 더 갱신해서
          // 다른 페이지(사이드바, 리스트 등)에서도 안읽음 상태가 즉시 반영되도록 보장
          queryClient.invalidateQueries({ queryKey: ["dm-list"] });
        } catch (e) {
          console.error("Failed to parse DM message", e);
        }
      });

      set(state => ({
        subscriptions: { ...state.subscriptions, [chatRoomId]: sub },
      }));
    } catch (error) {
      console.error("[STOMP DM] Subscribe failed:", error);
    }
  },

  unsubscribeDM: chatRoomId => {
    const sub = get().subscriptions[chatRoomId];
    if (sub) {
      console.log("[STOMP DM UNSUBSCRIBE]", chatRoomId);
      sub.unsubscribe();
    }

    set(state => ({
      subscriptions: { ...state.subscriptions, [chatRoomId]: null },
    }));
  },
}));
