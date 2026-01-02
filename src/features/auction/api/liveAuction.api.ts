import ClientApi from "@/lib/clientApi";

export const getLiveRooms = async (date: string, time: string) => {
  const res = await ClientApi<LiveRoomData>("/auction/rooms", {
    method: "GET",
    params: { date, time },
  });

  return res.data;
};
