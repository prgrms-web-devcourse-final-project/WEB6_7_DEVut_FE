import { useQuery } from "@tanstack/react-query";
import { DMDetailByChatRoomId, DMDetailByItemId } from "../api/message.api";

export function useDMDetailByRoomId(roomId: number | null) {
  return useQuery({
    queryKey: ["dm-detail-room", roomId],
    queryFn: () => DMDetailByChatRoomId(roomId!),
    enabled: roomId !== null && roomId !== -1,
  });
}

export function useDMDetailByItemId(productId: number | null) {
  return useQuery({
    queryKey: ["dm-detail-item", productId],
    queryFn: () => DMDetailByItemId(productId!),
    enabled: productId !== null && productId !== -1,
  });
}
