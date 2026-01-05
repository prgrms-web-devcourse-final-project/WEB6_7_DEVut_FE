import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSocketStore } from "./store/useSocketStore";

export const stompClient = new Client({
  webSocketFactory: () => new SockJS(process.env.NEXT_PUBLIC_WS_URL!),
  reconnectDelay: 5000,

  onConnect: () => {
    console.log("[STOMP] connected — re-subscribing all rooms");

    const { subscriptions } = useSocketStore.getState();

    Object.keys(subscriptions).forEach(roomId => {
      useSocketStore.getState().subscribeChatRoom(roomId);
    });

    useSocketStore.getState().setConnected();
  },

  onDisconnect: () => {
    console.log("[STOMP] disconnected");
    useSocketStore.getState().setDisconnected();
  },

  onStompError: () => {
    console.error("[STOMP] ❌ stomp error");
    useSocketStore.getState().setError();
  },

  debug: str => {
    if (process.env.NODE_ENV === "development") {
      console.log("[STOMP DEBUG]", str);
    }
  },
});
