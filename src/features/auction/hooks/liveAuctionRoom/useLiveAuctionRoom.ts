import { useQuery } from "@tanstack/react-query";
import { audienceMockByRoomId } from "../../mock/audience.mock";
import { productMockByRoomId } from "../../mock/product.mock";
import { getLiveRoomProducts } from "../../api/liveAuctionRoom.api";

export const useAudience = (roomId: number) => {
  return audienceMockByRoomId[roomId] ?? { users: [] };
};

export const useLiveAuction = (roomId: number) => {
  return productMockByRoomId[roomId];
};

export const useRoomProducts = (roomId?:number) => {
  return useQuery({
    queryKey: ["live-room-products", roomId],
    queryFn: () => getLiveRoomProducts(roomId!),
    enabled: !!roomId,
  });
}