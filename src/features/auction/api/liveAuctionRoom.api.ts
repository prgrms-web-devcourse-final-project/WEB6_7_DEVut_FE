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

  return { items: res.data.items, remainingMs: res.data.remainingMs };
};

export const liveBid = async (body: LiveBidRequest) => {
  const res = await ClientApi<LiveBidResponse>(`/auction/live/${body.liveItemId}/bid`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  // if (res.resultCode !== "200") {
  //   throw new Error(res.msg);
  // }

  return res.data;
};
