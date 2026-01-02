import { create } from "zustand";
import { StompSubscription } from "@stomp/stompjs";
import { stompClient } from "../stompClient";

type SocketStatus = "idle" | "connecting" | "connected" | "disconnected" | "error";

interface SocketStore {
  status: SocketStatus;

  // chatRoomId 기준
  messagesByRoom: Record<string, LiveChatMessage[]>;
  subscriptions: Record<string, StompSubscription | null>;
  pendingSubscribe: string[];

  setConnected: () => void;
  setDisconnected: () => void;
  setError: () => void;

  addMessage: (chatRoomId: string, msg: LiveChatMessage) => void;

  // 🔴 SEND (auctionId)
  sendAuctionMessage: (auctionId: number, payload: { content: string }) => void;

  // 🔵 RECEIVE (chatRoomId)
  subscribeChatRoom: (chatRoomId: string) => void;
  unsubscribeChatRoom: (chatRoomId: string) => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  status: "idle",

  messagesByRoom: {},
  subscriptions: {},
  pendingSubscribe: [],

  setConnected: () => {
    set({ status: "connected" });

    // 연결 후 대기 중이던 구독 처리
    get().pendingSubscribe.forEach(chatRoomId => {
      get().subscribeChatRoom(chatRoomId);
    });

    set({ pendingSubscribe: [] });
  },

  setDisconnected: () => set({ status: "disconnected" }),
  setError: () => set({ status: "error" }),

  addMessage: (chatRoomId, msg) =>
    set(state => ({
      messagesByRoom: {
        ...state.messagesByRoom,
        [chatRoomId]: [...(state.messagesByRoom[chatRoomId] ?? []), msg],
      },
    })),

  // =========================
  // SEND (auctionId)
  // =========================
  sendAuctionMessage: (auctionId, payload) => {
    console.log("[STOMP SEND]", auctionId, payload);

    stompClient.publish({
      destination: `/send/chat/auction/${auctionId}`,
      body: JSON.stringify(payload),
    });
  },

  // =========================
  // SUBSCRIBE (chatRoomId)
  // =========================
  subscribeChatRoom: chatRoomId => {
    const { status, subscriptions, pendingSubscribe } = get();

    if (subscriptions[chatRoomId]) return;

    if (status !== "connected") {
      if (!pendingSubscribe.includes(chatRoomId)) {
        set({ pendingSubscribe: [...pendingSubscribe, chatRoomId] });
      }
      return;
    }

    console.log("[STOMP SUBSCRIBE]", chatRoomId);

    const sub = stompClient.subscribe(`/receive/chat/auction/${chatRoomId}`, frame => {
      console.log("[STOMP RECEIVE]", frame.body);
      get().addMessage(chatRoomId, JSON.parse(frame.body));
    });

    set(state => ({
      subscriptions: { ...state.subscriptions, [chatRoomId]: sub },
    }));
  },

  unsubscribeChatRoom: chatRoomId => {
    const sub = get().subscriptions[chatRoomId];
    if (sub) sub.unsubscribe();

    set(state => ({
      subscriptions: { ...state.subscriptions, [chatRoomId]: null },
    }));
  },
}));
