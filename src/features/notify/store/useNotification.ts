"use client";

import { create } from "zustand";
import { getUnreadCount } from "./api/notify.client.api";

interface NotificationStore {
  unreadCount: number;
  eventSource: EventSource | null;
  connect: () => void;
  disconnect: () => void;
  initializeUnread: () => Promise<void>;
  resetUnread: () => void;
  incrementUnread: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  unreadCount: 0,
  eventSource: null,
  connect: () => {
    if (get().eventSource) return;

    console.log("알람 구독");

    const es = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/subscribe`,
      { withCredentials: true }
    );

    es.addEventListener("notification", event => {
      try {
        const data = JSON.parse(event.data);
        console.log(data);

        get().incrementUnread();
      } catch (e) {
        console.error(e);
      }
    });

    es.onerror = () => {
      es.close();
      set({ eventSource: null });

      setTimeout(() => {
        get().connect();
      }, 3000);
    };

    set({ eventSource: es });
  },

  disconnect: () => {
    const es = get().eventSource;
    if (es) {
      console.log("알람 구독 해제");
      es.close();
      set({ eventSource: null });
      set({ unreadCount: 0 });
    }
  },
  initializeUnread: async () => {
    try {
      const count = await getUnreadCount();
      set({ unreadCount: count });
    } catch (error) {
      console.error(error);
    }
  },

  resetUnread: () => set({ unreadCount: 0 }),
  incrementUnread: () => set(state => ({ unreadCount: state.unreadCount + 1 })),
}));
