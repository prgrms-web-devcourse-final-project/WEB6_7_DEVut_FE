import ClientApi from "@/lib/clientApi";

export const getUnreadCount = async () => {
  const res = await ClientApi<number>("/notifications/unread/count", {
    method: "GET",
  });

  return res.data;
};

export const getNotifications = async () => {
  const res = await ClientApi<NotificationsResponse>("/notifications", {
    method: "GET",
  });

  return res.data.notifications;
};

export const deleteNotify = async (id: number) => {
  const res = await ClientApi<string>(`/notifications/${id}`, {
    method: "DELETE",
  });

  return res.data;
};
