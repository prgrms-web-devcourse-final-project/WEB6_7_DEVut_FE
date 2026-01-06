"use client";

import { useNotificationStore } from "@/features/notify/store/useNotification";
import { useEffect } from "react";

export default function NotificationProvider({
  children,
  me,
}: {
  children: React.ReactNode;
  me: User | null;
}) {
  const { connect, initializeUnread, disconnect } = useNotificationStore(state => state);

  useEffect(() => {
    if (!me) {
      disconnect();
      return;
    }

    initializeUnread();
    connect();

    return () => {
      disconnect();
    };
  }, [connect, initializeUnread, disconnect, me]);

  return <>{children}</>;
}
