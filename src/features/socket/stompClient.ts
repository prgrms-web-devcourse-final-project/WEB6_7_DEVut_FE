import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSocketStore } from "./store/useSocketStore";
import { getCookie } from "../auth/api/auth.api";

export const stompClient = new Client({
  webSocketFactory: () => new SockJS(process.env.NEXT_PUBLIC_WS_URL!),

  reconnectDelay: 5000,

  // beforeConnect: 매번 최신 토큰을 넣는다
  beforeConnect: async () => {
    try {
      const { accessToken, refreshToken } = await getCookie();

      if (accessToken) {
        stompClient.connectHeaders = {
          Authorization: `Bearer ${accessToken}`,
        };
      } else {
        // 비로그인
        stompClient.connectHeaders = {};
      }
    } catch (err) {
      console.error("[STOMP] fetch token failed:", err);
    }
  },

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
