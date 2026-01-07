import { create } from "zustand";

interface LiveRoomState {
  activeAuctionId: number | null;
  subscribedAuctionIds: number[];
  chatRoomIds: Record<number, string>;

  setActiveAuctionId: (id: number) => void;
  addSubscribedAuctionId: (id: number) => void;
  setChatRoomId: (auctionId: number, chatRoomId: string) => void;
  removeSubscribedAuctionId: (auctionId: number) => void;
}

export const useLiveRoomStore = create<LiveRoomState>(set => ({
  activeAuctionId: 8,
  subscribedAuctionIds: [8, 9],
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

  removeSubscribedAuctionId: (auctionId: number) =>
    set(state => {
      const nextSubscribed = state.subscribedAuctionIds.filter(id => id !== auctionId);
      const { [auctionId]: _, ...nextChatRoomIds } = state.chatRoomIds;
      let nextActiveAuctionId = state.activeAuctionId;

      if (state.activeAuctionId === auctionId) {
        nextActiveAuctionId = nextSubscribed[0] ?? null;
      }

      return {
        subscribedAuctionIds: nextSubscribed,
        chatRoomIds: nextChatRoomIds,
        activeAuctionId: nextActiveAuctionId,
      };
    }),
}));
