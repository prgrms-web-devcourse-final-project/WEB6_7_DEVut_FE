import { format, parseISO } from "date-fns";

export const notifyGroupByDate = (notifications: NotificationItem[]) => {
  const group = notifications.reduce(
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
  DELAYED_SUCCESS_SELLER: "💰",
  DELAYED_SUCCESS_BIDDER: "🏆",
  DELAYED_FAILED_SELLER: "❌",
  DELAYED_BID_OUTBID: "⏰",
  DELAYED_BUY_NOW_SOLD: "🛒",
  DELAYED_CANCELLED_BY_BUY_NOW: "🚫",
};
// 🤝 거래 완료
// 💬 메세지
// 💳 잔금 처리 해주세요

export const getNotifyIcon = (type: string) => {
  return NOTIFY_ICON_MAP[type as NotificationType] ?? "🔔";
};
