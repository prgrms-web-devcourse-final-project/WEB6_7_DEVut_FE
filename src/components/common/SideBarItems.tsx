"use client";
import { useEffect } from "react";
import { sidebarItems } from "@/constants/route/sidebar";
import { useNotificationStore } from "@/features/notify/store/useNotification";
import { useDMList } from "@/features/message/hooks/useDMList";
import { useDMSocketStore } from "@/features/socket/store/useDMSocketStore";
import SideBarItem from "./SideBarItem";

export default function SideBarItems() {
  const { unreadCount } = useNotificationStore(state => state);
  const { data: dmList } = useDMList();
  const subscribeDM = useDMSocketStore(state => state.subscribeDM);

  const hasUnreadMessage = dmList?.chatRooms?.some(room => room.hasUnreadMessage) ?? false;

  // 전역에서 DM 소켓을 구독하여, 어느 페이지에 있든 실시간으로 새 메시지를 수신하고
  // dm-list / 안읽음 표시가 즉시 반영되도록 함
  useEffect(() => {
    if (!dmList?.chatRooms) return;
    dmList.chatRooms.forEach(room => {
      if (room?.chatRoomId) {
        subscribeDM(room.chatRoomId);
      }
    });
  }, [dmList?.chatRooms, subscribeDM]);

  return (
    <>
      {sidebarItems.map(item => (
        <SideBarItem
          key={item.path}
          path={item.path}
          src={item.icon}
          badgeCount={item.path === "/notify" ? unreadCount : undefined}
          hasDot={item.path === "/message" && hasUnreadMessage}
          label={item.label}
        />
      ))}
    </>
  );
}
