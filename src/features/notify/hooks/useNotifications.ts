import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../api/notify.client.api";

export const useNotificatoins = (initialData: NotificationItem<NotificationType>[]) => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    initialData,
  });
};
