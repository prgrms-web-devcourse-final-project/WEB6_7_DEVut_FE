import { audienceMockByRoomId } from "../../mock/audience.mock";
import { chatMockByRoomId } from "../../mock/chat.mock";
import { productMockByRoomId } from "../../mock/product.mock";

export const useAudience = (roomId: number) => {
  return audienceMockByRoomId[roomId] ?? { users: [] };
};

// export const useLiveChat = (roomId: number) => {
//   return chatMockByRoomId[roomId] ?? [];
// };

export const useLiveAuction = (roomId: number) => {
  return productMockByRoomId[roomId];
};
