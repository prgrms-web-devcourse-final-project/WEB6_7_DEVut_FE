import ClientApi from "@/lib/clientApi";

export const getUnreadCount = async () => {
  const res = await ClientApi<number>("/notifications/unread/count", {
    method: "GET",
  });

  return res.data;
};
