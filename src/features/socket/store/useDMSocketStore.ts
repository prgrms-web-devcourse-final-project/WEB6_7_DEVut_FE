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
    console.log(
      `%c[스토어] 메시지 추가됨 (방 ID: ${chatRoomId})`,
      "color: #4CAF50; font-weight: bold;",
      msg
    );
    set(state => {
      const prev = state.messagesByRoom[chatRoomId] ?? [];
      const exists = prev.some(m => m.id === msg.id);
      if (exists) {
        return state;
      }

      const newMessages = [...prev, msg];
      return {
        messagesByRoom: {
          ...state.messagesByRoom,
          [chatRoomId]: newMessages,
        },
      };
    });
  },
  sendDM: (productId, payload) => {
    console.log("[STOMP DM 전송]", productId, payload);

    if (!stompClient.connected) {
      console.error("[STOMP DM] 전송 실패 - 연결되지 않음");
      stompClient.activate();
      setTimeout(() => {
        if (!stompClient.connected) return;
        try {
          stompClient.publish({
            destination: `/send/chat/dm/${productId}`,
            body: JSON.stringify(payload),
          });
        } catch (error) {
          console.error("[STOMP DM] 재연결 후 전송 실패:", error);
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
      console.error("[STOMP DM] 전송 실패:", error);
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
      console.warn("[STOMP DM] 아직 연결되지 않음. 연결 시 구독 예정. 방 ID:", chatRoomId);
      set(state => ({
        subscriptions: { ...state.subscriptions, [chatRoomId]: null },
      }));
      return;
    }

    console.log("[STOMP DM 구독]", chatRoomId);

    try {
      // 서버에게 이 채팅방 메시지 보내줘 요청
      const sub = stompClient.subscribe(`/receive/chat/dm/${chatRoomId}`, frame => {
        console.log("[STOMP DM 수신]", frame.body);
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

                // 확실한 동기화를 위해 서버 상태로 한 번 더 갱신 (사용자 요청 반영: unread 즉시 반영 보장)
                queryClient.invalidateQueries({ queryKey: ["dm-list"] });
              })
              .catch(error => {
                console.error("[STOMP DM] 읽음 처리 실패:", error);
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

          // 안전망: 전역 리스트 갱신 (다른 방 메시지 수신 시 등)
          // 이전 최적화가 불안정했으므로, 확실한 unread 뱃지 노출을 위해 invalidation 복구
          queryClient.invalidateQueries({ queryKey: ["dm-list"] });
        } catch (e) {
          console.error("DM 메시지 파싱 실패", e);
        }
      });

      set(state => ({
        subscriptions: { ...state.subscriptions, [chatRoomId]: sub },
      }));
    } catch (error) {
      console.error("[STOMP DM] 구독 실패:", error);
    }
  },

  unsubscribeDM: chatRoomId => {
    const sub = get().subscriptions[chatRoomId];
    if (sub) {
      console.log("[STOMP DM 구독 해지]", chatRoomId);
      sub.unsubscribe();
    }

    set(state => ({
      subscriptions: { ...state.subscriptions, [chatRoomId]: null },
    }));
  },
}));
