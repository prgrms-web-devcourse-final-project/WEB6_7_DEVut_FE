import { create } from "zustand";

interface LiveRoomState {
  activeAuctionId: number | null;
  subscribedAuctionIds: number[];
  chatRoomIds: Record<number, string>; // auctionId → chatRoomId

  setActiveAuctionId: (id: number) => void;
  addSubscribedAuctionId: (id: number) => void;
  setChatRoomId: (auctionId: number, chatRoomId: string) => void;
}

export const useLiveRoomStore = create<LiveRoomState>(set => ({
  activeAuctionId: 1,
  subscribedAuctionIds: [1, 3],
  chatRoomIds: {},

  setActiveAuctionId: id => set({ activeAuctionId: id }),

  addSubscribedAuctionId: id =>
    set(state =>
      state.subscribedAuctionIds.includes(id)
        ? state
        : { subscribedAuctionIds: [...state.subscribedAuctionIds, id] }
    ),

  setChatRoomId: (auctionId, chatRoomId) =>
    set(state => ({
      chatRoomIds: { ...state.chatRoomIds, [auctionId]: chatRoomId },
    })),
}));
