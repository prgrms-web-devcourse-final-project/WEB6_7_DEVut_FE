import ClientApi from "@/lib/clientApi";
import { DMDetailResponse } from "../types/DM.type";

export const DMList = async (): Promise<DMRoomListResponse> => {
  const res = await ClientApi<DMRoomListResponse>("/chatrooms/dm", {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};

export const DMDetailByChatRoomId = async (chatRoomId: number): Promise<DMDetailResponse> => {
  const res = await ClientApi<DMDetailResponse>(`/chatrooms/dm/${chatRoomId}`, {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};
export const DMDetailByItemId = async (delayedItemId: number): Promise<DMDetailResponse> => {
  const res = await ClientApi<DMDetailResponse>(`/chatrooms/dm/item/${delayedItemId}`, {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};
