import meImage from "@/assets/message/dummyImage2.jpg";
import opponentImage from "@/assets/message/dummyImage.png";
import productImage from "@/assets/vintage.png";

// 채팅 유저
export const me = {
  id: 1,
  nickname: "두꺼비",
  profileImage: meImage,
};

export const opponent = {
  id: 2,
  nickname: "인생역전",
  profileImage: opponentImage,
};

// 채팅방 목록
export const chatRoomMock: ChatRoom[] = [
  {
    id: 101,
    opponent,
    lastMessage: {
      content: "다 같이 가는거야",
      createdAt: "2025-12-24T10:20:00Z",
    },
    unreadCount: 2,
  },
  {
    id: 102,
    opponent: {
      id: 3,
      nickname: "럭키맨",
      profileImage: opponentImage,
    },
    lastMessage: {
      content: "가격 조정 가능할까요?",
      createdAt: "2025-12-23T18:40:00Z",
    },
    unreadCount: 0,
  },
];

export const chatProductInfoMock: ChatProductInfo = {
  id: 555,
  title: "애플워치 7 41mm",
  thumbnail: productImage,
  statusLabel: "경매 대기",
  currentPrice: 252000,
};

export const chatMessageMock: Record<number, ChatMessage[]> = {
  101: [
    {
      id: "m1",
      roomId: 101,
      sender: opponent,
      content: "다 같이 가는거야",
      createdAt: "2025-12-24T10:29:00Z",
    },
    {
      id: "m2",
      roomId: 101,
      sender: me,
      content: "가는거야 마는거야 가는거야 마는거야 가는거야 ㅋㅋ",
      createdAt: "2025-12-24T10:30:00Z",
    },
  ],

  102: [
    {
      id: "m3",
      roomId: 102,
      sender: opponent,
      content: "가격 조정 가능할까요?",
      createdAt: "2025-12-23T18:40:00Z",
    },
  ],
};
