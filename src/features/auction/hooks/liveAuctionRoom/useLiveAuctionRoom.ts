import { audienceMockByRoomId } from "../../mock/audience.mock";
import { productMockByRoomId } from "../../mock/product.mock";

export const useAudience = (roomId: number) => {
  return audienceMockByRoomId[roomId] ?? { users: [] };
};

export const useLiveAuction = (roomId: number) => {
  return productMockByRoomId[roomId];
};
