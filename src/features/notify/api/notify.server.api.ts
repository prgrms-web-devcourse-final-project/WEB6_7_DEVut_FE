import { ServerApi } from "@/lib/serverApi";

export const getNotifications = async () => {
  const res = await ServerApi<NotificationsResponse>("/notifications", {
    method: "GET",
  });

  return res.data.notifications;
};

export const allReadNotifications = async () => {
  const res = await ServerApi<string>("/notifications/read-all", {
    method: "PATCH",
  });

  return res.data;
};
