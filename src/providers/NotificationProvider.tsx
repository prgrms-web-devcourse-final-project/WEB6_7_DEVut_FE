"use client";

import { useMe } from "@/features/auth/hooks/useMe";
import { useNotificationStore } from "@/features/notify/store/useNotification";
import { useEffect } from "react";

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { data: me, isLoading } = useMe();
  const isLogin = !!me && !isLoading;

  const { connect, initializeUnread, disconnect } = useNotificationStore(state => state);

  useEffect(() => {
    if (!isLogin) {
      disconnect();
      return;
    }

    initializeUnread();
    connect();

    return () => {
      disconnect();
    };
  }, [connect, initializeUnread, disconnect, isLogin]);

  return <>{children}</>;
}
