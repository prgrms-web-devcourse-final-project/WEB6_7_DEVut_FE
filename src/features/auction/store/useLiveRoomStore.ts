import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LiveRoomState {
  activeAuctionId: number | null;
  subscribedAuctionIds: number[];
  chatRoomIds: Record<number, string>;

  setActiveAuctionId: (id: number) => void;
  addSubscribedAuctionId: (id: number) => void;
  setChatRoomId: (auctionId: number, chatRoomId: string) => void;
  removeSubscribedAuctionId: (auctionId: number) => void;

  resetLiveRoom: () => void;
}

const initialLiveRoomState = {
  activeAuctionId: null,
  subscribedAuctionIds: [],
  chatRoomIds: {},
};

export const useLiveRoomStore = create<LiveRoomState>()(
  persist(
    set => ({
      ...initialLiveRoomState,

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

      removeSubscribedAuctionId: auctionId =>
        set(state => {
          const nextSubscribed = state.subscribedAuctionIds.filter(id => id !== auctionId);
          const { [auctionId]: _, ...nextChatRoomIds } = state.chatRoomIds;

          return {
            subscribedAuctionIds: nextSubscribed,
            chatRoomIds: nextChatRoomIds,
            activeAuctionId: nextSubscribed[0] ?? null,
          };
        }),

      resetLiveRoom: () => set(initialLiveRoomState),
    }),
    {
      name: "live-room-store",
    }
  )
);
