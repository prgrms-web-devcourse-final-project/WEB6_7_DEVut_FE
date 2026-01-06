interface DMRoom {
  chatRoomId: number;
  itemId: number;
  otherUserNickname: string;
  otherUserProfileImage: string | null;
  lastMessage: string;
  lastMessageTime: string; // ISO 8601 형식
  hasUnreadMessage: boolean;
}

interface DMRoomListResponse {
  chatRooms: DMRoom[];
}
