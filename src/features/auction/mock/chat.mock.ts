export const chatMockByRoomId: Record<number, LiveChatMessage[]> = {
  1: [
    {
      id: "1",
      type: "SYSTEM",
      message: "1번 방 경매 시작",
      createdAt: Date.now(),
    },
  ],
  2: [
    {
      id: "2",
      type: "SYSTEM",
      message: "2번 방 경매 시작",
      createdAt: Date.now(),
    },
  ],
};
