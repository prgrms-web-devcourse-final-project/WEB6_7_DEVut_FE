export const audienceMockByRoomId: Record<number, AudienceState> = {
  1: {
    users: Array.from({ length: 10 }).map((_, i) => ({
      userId: i,
      name: `ROOM1_USER_${i}`,
    })),
  },
  2: {
    users: Array.from({ length: 5 }).map((_, i) => ({
      userId: i,
      name: `ROOM2_USER_${i}`,
    })),
  },
};
