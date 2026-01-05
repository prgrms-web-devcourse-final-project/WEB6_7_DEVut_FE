import { NOTIFICATION_ROUTE_MAP } from "@/features/notify/mapper/notifyRouteMap";
import { format, parseISO } from "date-fns";

// 라이브 주석
// export const notifyGroupByDate = (notifications: NotificationItem[]) => {
//   const group = notifications.reduce(
//     (acc, cur) => {
//       const dateKey = format(parseISO(cur.createDate), "yyyy-MM-dd");

//       if (!acc[dateKey]) acc[dateKey] = [];
//       acc[dateKey].push(cur);

//       return acc;
//     },
//     {} as Record<string, NotificationItem[]>
//   );

//   const sortedKeys = Object.keys(group).sort(
//     (a, b) => new Date(b).getTime() - new Date(a).getTime()
//   );

//   return { group, sortedKeys };
// };

export const notifyGroupByDate = (notifications: NotificationItem[]) => {
  const filtered = notifications.filter(n => !n.type.startsWith("LIVE_"));

  const group = filtered.reduce(
    (acc, cur) => {
      const dateKey = format(parseISO(cur.createDate), "yyyy-MM-dd");

      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(cur);

      return acc;
    },
    {} as Record<string, NotificationItem[]>
  );

  const sortedKeys = Object.keys(group).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return { group, sortedKeys };
};

const NOTIFY_ICON_MAP: Record<NotificationType, string> = {
  // 지연 경매
  DELAYED_FIRST_BID: "🟢",
  DELAYED_BID_OUTBID: "⏰",
  DELAYED_SUCCESS_SELLER: "💰",
  DELAYED_SUCCESS_BIDDER: "🏆",
  DELAYED_FAILED_SELLER: "❌",
  DELAYED_BUY_NOW_SOLD: "🛒",
  DELAYED_CANCELLED_BY_BUY_NOW: "🚫",

  // DM
  DM_FIRST_MESSAGE: "💬",

  // 라이브
  LIVE_AUCTION_START: "🔴",
  LIVE_SUCCESS_SELLER: "💰",
  LIVE_SUCCESS_BIDDER: "🏆",
  LIVE_FAILED_SELLER: "❌",
};

export const getNotifyIcon = (type: NotificationType) => {
  return NOTIFY_ICON_MAP[type] ?? "🔔";
};

export const getNotificationRoute = <K extends NotificationType>(n: NotificationItem<K>) => {
  return NOTIFICATION_ROUTE_MAP[n.type](n);
};
