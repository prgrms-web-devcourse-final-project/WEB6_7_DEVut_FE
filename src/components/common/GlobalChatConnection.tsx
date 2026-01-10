"use client";

import { useEffect } from "react";
import { useDMList } from "@/features/message/hooks/useDMList";
import { useDMSocketStore } from "@/features/socket/store/useDMSocketStore";
import { stompClient } from "@/features/socket/stompClient";

export default function GlobalChatConnection() {
  const { data: dmList } = useDMList();
  const subscribeDM = useDMSocketStore(state => state.subscribeDM);

  // 1. 전역 구독 관리
  useEffect(() => {
    if (!dmList?.chatRooms) return;
    dmList.chatRooms.forEach(room => {
      if (room?.chatRoomId) {
        subscribeDM(room.chatRoomId);
      }
    });
  }, [dmList?.chatRooms, subscribeDM]);

  // 2. 네트워크 및 가시성 변경 시 재연결 처리 (Sleep 모드 복귀 대응)
  useEffect(() => {
    const handleReconnection = () => {
      if (document.visibilityState === "visible" && !stompClient.connected) {
        console.log("%c[GlobalChat] 화면 복귀 감지: 소켓 재연결 시도...", "color: #FF9800");
        stompClient.activate();
      }
    };

    const handleOnline = () => {
      if (!stompClient.connected) {
        console.log("%c[GlobalChat] 네트워크 복구 감지: 소켓 재연결 시도...", "color: #FF9800");
        stompClient.activate();
      }
    };

    document.addEventListener("visibilitychange", handleReconnection);
    window.addEventListener("online", handleOnline);

    return () => {
      document.removeEventListener("visibilitychange", handleReconnection);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return null;
}
