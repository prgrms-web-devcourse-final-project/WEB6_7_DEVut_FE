import { useEffect, useState } from "react";
import { StompSubscription } from "@stomp/stompjs";
import { enterChatRoom } from "../../api/liveAuctionRoom.api";
import { stompClient } from "@/features/socket/stompClient";

export function useLiveChat(auctionId: number) {
  const [messages, setMessages] = useState<LiveChatMessage[]>([]);

  useEffect(() => {
    let subscription: StompSubscription | null = null;
    let cancelled = false;

    async function connect() {
      setMessages([]);

      if (!stompClient.connected) {
        stompClient.activate();
      }

      const data = await enterChatRoom(auctionId);
      if (cancelled) return;

      const chatRoomId = data.chatRoomId;

      subscription = stompClient.subscribe(`/receive/chat/auction/${chatRoomId}`, frame => {
        setMessages(prev => [...prev, JSON.parse(frame.body)]);
      });
    }

    connect();

    return () => {
      cancelled = true;
      subscription?.unsubscribe();
    };
  }, [auctionId]);

  const sendMessage = (payload: unknown) => {
    if (!stompClient.connected) return;

    stompClient.publish({
      destination: `/send/chat/auction/${auctionId}`,
      body: JSON.stringify(payload),
    });
  };

  return { messages, sendMessage };
}
