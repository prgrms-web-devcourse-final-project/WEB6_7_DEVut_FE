import ClientApi from "@/lib/clientApi";

export const enterChatRoom = async (auctionId: number) => {
  const res = await ClientApi<EnterChatRoomResponse>(`/chatrooms/auction/${auctionId}/enter`, {
    method: "PUT",
  });

  return res.data;
};

export const getLiveRoomProducts = async (roomId: number) => {
  const res = await ClientApi<LiveRoomProductsResponse>(`/auction/rooms/${roomId}`, {
    method: "GET",
  });

  return res.data.items;
};
