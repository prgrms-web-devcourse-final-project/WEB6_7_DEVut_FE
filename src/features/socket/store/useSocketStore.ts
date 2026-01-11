import { create } from "zustand";
import { StompSubscription } from "@stomp/stompjs";
import { stompClient } from "../stompClient";
import { queryClient } from "@/providers/QueryProvider";
import { exitChatRoom } from "@/features/auction/api/liveAuctionRoom.api";

type SocketStatus = "idle" | "connecting" | "connected" | "disconnected" | "error";
type HeartbeatTimer = ReturnType<typeof setInterval> | null;

interface SocketStore {
  status: SocketStatus;
  messagesByRoom: Record<string, LiveChatMessage[]>;
  participantsByAuction: Record<number, number>;
  subscriptions: Record<string, RoomSubscriptions>;
  pendingSubscribe: PendingSubscribeItem[];
  heartbeatTimer: HeartbeatTimer;

  setConnected: () => void;
  setDisconnected: () => void;
  setError: () => void;
  startHeartbeat: () => void;
  stopHeartbeat: () => void;
  addMessage: (chatRoomId: string, msg: LiveChatMessage) => void;
  setParticipants: (auctionId: number, count: number) => void;
  sendAuctionMessage: (auctionId: number, payload: { content: string }) => void;
  subscribeChatRoom: (chatRoomId: string, auctionId?: number) => void;
  setInitialParticipants: (auctionId: number, count: number) => void;
  exitAuctionRoom: (chatRoomId: string, auctionId: number) => Promise<void>;
}

type RoomSubscriptions = {
  chat?: StompSubscription;
  auction?: StompSubscription;
  participants?: StompSubscription;
};

type PendingSubscribeItem = {
  chatRoomId: string;
  auctionId?: number;
};

export const useSocketStore = create<SocketStore>((set, get) => ({
  status: "idle",
  messagesByRoom: {},
  participantsByAuction: {},
  subscriptions: {},
  pendingSubscribe: [],
  heartbeatTimer: null,

  setConnected: () => {
    set({ status: "connected" });

    get().startHeartbeat();

    get().pendingSubscribe.forEach(({ chatRoomId, auctionId }) => {
      get().subscribeChatRoom(chatRoomId, auctionId);
    });

    set({ pendingSubscribe: [] });
  },

  setDisconnected: () => {
    get().stopHeartbeat();
    set({ status: "disconnected" });
  },

  setError: () => {
    get().stopHeartbeat();
    set({ status: "error" });
  },

  startHeartbeat: () => {
    const { heartbeatTimer } = get();
    if (heartbeatTimer) return;

    const timer = setInterval(() => {
      stompClient.publish({
        destination: "/send/auction/heartbeat",
        body: JSON.stringify({}),
      });
    }, 10_000);

    set({ heartbeatTimer: timer });
  },

  stopHeartbeat: () => {
    const { heartbeatTimer } = get();
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
      set({ heartbeatTimer: null });
    }
  },

  addMessage: (chatRoomId, msg) =>
    set(state => ({
      messagesByRoom: {
        ...state.messagesByRoom,
        [chatRoomId]: [...(state.messagesByRoom[chatRoomId] ?? []), msg],
      },
    })),

  setParticipants: (auctionId, count) =>
    set(state => ({
      participantsByAuction: {
        ...state.participantsByAuction,
        [auctionId]: count,
      },
    })),

  sendAuctionMessage: (auctionId, payload) => {
    stompClient.publish({
      destination: `/send/chat/auction/${auctionId}`,
      body: JSON.stringify(payload),
    });
  },

  subscribeChatRoom: (chatRoomId, auctionId) => {
    const { status, subscriptions, pendingSubscribe, messagesByRoom } = get();
    const roomSubs = subscriptions[chatRoomId];

    if (status !== "connected") {
      if (!pendingSubscribe.some(p => p.chatRoomId === chatRoomId)) {
        set({
          pendingSubscribe: [...pendingSubscribe, { chatRoomId, auctionId }],
        });
      }
      return;
    }

    // 경매방 입장 알림
    if (!messagesByRoom[chatRoomId]) {
      set(state => ({
        messagesByRoom: {
          ...state.messagesByRoom,
          [chatRoomId]: [
            {
              tempId: `system-${chatRoomId}`,
              type: "SYSTEM",
              message: "경매방에 입장하였습니다",
              sendTime: Date.now(),
            },
          ],
        },
      }));
    }

    const chatSub =
      roomSubs?.chat ??
      stompClient.subscribe(`/receive/chat/auction/${chatRoomId}`, frame => {
        get().addMessage(chatRoomId, JSON.parse(frame.body));
      });

    let auctionSub = roomSubs?.auction;
    if (!auctionSub && auctionId !== undefined) {
      auctionSub = stompClient.subscribe(`/receive/auction/${auctionId}`, frame => {
        const data = JSON.parse(frame.body);

        switch (data.type) {
          case "LIVE_BID": {
            get().addMessage(chatRoomId, {
              tempId: crypto.randomUUID(),
              type: "LIVE_BID",
              message: "입찰",
              sendTime: Date.now(),
              newPrice: data.newPrice,
              bidderId: data.bidderId,
              bidderNickname: data.bidderNickname,
            });
            queryClient.invalidateQueries({
              queryKey: ["my-bizz"],
            });
            break;
          }

          case "AUCTION_END": {
            get().addMessage(chatRoomId, {
              tempId: crypto.randomUUID(),
              type: "AUCTION_END",
              message:
                data.result === "SUCCESS" ? "경매가 종료되었습니다" : "경매가 유찰되었습니다",
              sendTime: Date.now(),
              result: data.result,
              winnerId: data.winnerId,
              finalPrice: data.finalPrice,
              winnerNickname: data.winnerNickname,
            });
            break;
          }

          default:
            console.log("[AUCTION EVENT]", data);
        }

        queryClient.invalidateQueries({
          queryKey: ["live-room-products", auctionId],
        });
      });
    }

    let participantsSub = roomSubs?.participants;
    if (!participantsSub && auctionId !== undefined) {
      console.log("[WS] participants subscribe 요청", {
        auctionId,
        destination: `/receive/chat/auction/${auctionId}/participants`,
      });

      participantsSub = stompClient.subscribe(
        `/receive/chat/auction/${auctionId}/participants`,
        frame => {
          console.log("[WS] participants message 수신", frame.body);

          const { count } = JSON.parse(frame.body);
          get().setParticipants(auctionId, count);
        }
      );
    }

    set(state => ({
      subscriptions: {
        ...state.subscriptions,
        [chatRoomId]: {
          chat: chatSub,
          auction: auctionSub,
          participants: participantsSub,
        },
      },
    }));
  },

  setInitialParticipants: (auctionId, count) =>
    set(state => ({
      participantsByAuction: {
        ...state.participantsByAuction,
        [auctionId]: count,
      },
    })),

  exitAuctionRoom: async (chatRoomId, auctionId) => {
    try {
      console.log("경매방 퇴장");
      await exitChatRoom(auctionId);
    } catch (e) {
      console.warn("[WS] exitChatRoom api failed", e);
    }

    const roomSubs = get().subscriptions[chatRoomId];

    roomSubs?.chat?.unsubscribe();
    roomSubs?.auction?.unsubscribe();
    roomSubs?.participants?.unsubscribe();

    set(state => {
      const { [chatRoomId]: _, ...restSubs } = state.subscriptions;
      const { [chatRoomId]: __, ...restMessages } = state.messagesByRoom;
      const { [auctionId]: ___, ...restParticipants } = state.participantsByAuction;

      return {
        subscriptions: restSubs,
        messagesByRoom: restMessages,
        participantsByAuction: restParticipants,
      };
    });
  },
}));
