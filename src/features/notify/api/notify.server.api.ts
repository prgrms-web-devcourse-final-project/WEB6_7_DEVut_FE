import { ServerApi } from "@/lib/serverApi";

export const getNotifications = async () => {
  const res = await ServerApi<NotificationsResponse>("/notifications", {
    method: "GET",
  });

  return res.data.notifications;
};
