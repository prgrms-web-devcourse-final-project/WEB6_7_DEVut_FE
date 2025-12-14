// 채팅방 리스트
import dummyImage from "@/assets/message/dummyImage.png";
import { StaticImageData } from "next/image";
export const chatRooms = [
  {
    id: "room-1",
    user: {
      name: "인생역전",
      avatar: dummyImage,
    },
    lastMessage: "다 같이 가는거야 ",
    updatedAt: "오후 10:32",
    unreadCount: 2,
    product: {
      title: "애플워치 7 41mm",
      price: 252000,
      status: "pending",
    },
  },
  {
    id: "room-2",
    user: {
      name: "두꺼비",
      avatar: dummyImage,
    },
    lastMessage: "가격 조정 가능할까요?",
    updatedAt: "오후 9:10",
    unreadCount: 0,
  },
];

// 메시지 목록
export const messagesByRoom: Record<
  string,
  {
    id: string;
    name?: string;
    avatar?: StaticImageData;
    sender: "me" | "other";
    content: string;
    time: string;
  }[]
> = {
  "room-1": [
    {
      id: "m1",
      name: "인생역전",
      avatar: dummyImage,
      sender: "other",
      content:
        "가는거야 마는거야 가는거야 마는거야 가는거야 ㄴ마어ㅗㅁ나옴나암너온마옴나온마엄노암농ㅁ나온ㅁ옴너 움ㄴ와넘왐ㄴ왐왐오남ㅇㅇㅎㅇㅎㅇㅎ",
      time: "오후 10:29",
    },
    {
      id: "m2",
      sender: "me",
      content:
        "가는거야 마는거야 가는거야 마는거야 가는거야 ㄴ마어ㅗㅁ나옴나암너온마옴나온마엄노암농ㅁ나온ㅁ옴너 움ㄴ와넘왐ㄴ왐왐오남ㅇㅇㅎㅇㅎㅇㅎ",
      time: "오후 10:30",
    },
  ],
};
