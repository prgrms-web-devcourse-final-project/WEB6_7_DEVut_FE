"use client";
import { sidebarItems } from "@/constants/route/sidebar";
import { useNotificationStore } from "@/features/notify/store/useNotification";
import { useDMList } from "@/features/message/hooks/useDMList";
import SideBarItem from "./SideBarItem";

export default function SideBarItems() {
  const { unreadCount } = useNotificationStore(state => state);
  const { data: dmList } = useDMList();

  const hasUnreadMessage = dmList?.chatRooms?.some(room => room.hasUnreadMessage) ?? false;

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
