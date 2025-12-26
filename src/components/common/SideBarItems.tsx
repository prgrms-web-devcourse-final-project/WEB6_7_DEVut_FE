"use client";
import { sidebarItems } from "@/constants/route/sidebar";
import { useNotificationStore } from "@/features/notify/store/useNotification";
import SideBarItem from "./SideBarItem";

export default function SideBarItems() {
  const { unreadCount } = useNotificationStore(state => state);

  return (
    <>
      {sidebarItems.map(item => (
        <SideBarItem
          key={item.path}
          path={item.path}
          src={item.icon}
          badgeCount={item.path === "/notify" ? unreadCount : undefined}
          label={item.label}
        />
      ))}
    </>
  );
}
