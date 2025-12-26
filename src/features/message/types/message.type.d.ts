interface ChatUser {
  id: number;
  nickname: string;
  profileImage?: string | StaticImageData;
}

interface ChatRoom {
  id: number;
  opponent: ChatUser;
  lastMessage?: {
    content: string;
    createdAt: string;
  };
  unreadCount: number;
}

interface ChatProductInfo {
  id: number;
  title: string;
  thumbnail: string | StaticImageData;
  statusLabel: string;
  currentPrice: number;
}

interface ChatMessage {
  id: string;
  roomId: number;
  sender: ChatUser;
  content: string;
  createdAt: string;
}
