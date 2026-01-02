export const productMockByRoomId: Record<number, LiveAuctionState> = {
  1: {
    stage: {
      currentProductId: 1,
      elapsedTimeSec: 120,
    },
    products: [
      {
        id: 1,
        name: "오토바이 카메라",
        imageUrl: "/mock/1.jpg",
        startPrice: 100000,
        currentPrice: 130000,
        status: "ONGOING",
      },
    ],
  },
  2: {
    stage: {
      currentProductId: 2,
      elapsedTimeSec: 45,
    },
    products: [
      {
        id: 2,
        name: "빈티지 시계",
        imageUrl: "/mock/2.jpg",
        startPrice: 200000,
        currentPrice: 240000,
        status: "ONGOING",
      },
    ],
  },
  3: {
    stage: {
      currentProductId: 2,
      elapsedTimeSec: 45,
    },
    products: [
      {
        id: 2,
        name: "빈티지 시계",
        imageUrl: "/mock/2.jpg",
        startPrice: 200000,
        currentPrice: 240000,
        status: "ONGOING",
      },
    ],
  },
};
