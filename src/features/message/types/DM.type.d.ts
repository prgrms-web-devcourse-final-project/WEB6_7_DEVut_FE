export interface ItemInfo {
  itemId: number;
  itemName: string;
  currentPrice: number;
  itemImageUrl: string;
  auctionStatus: string;
}

export interface Message {
  id: number;
  senderId: number;
  profileImageUrl: string;
  nickname: string;
  content: string;
  sendTime: string;
}

export interface UiMessage {
  id?: number;
  clientMessageId?: string; // 프론트용 임시 id. optimistic ui
  senderId?: number;
  profileImageUrl?: string;
  nickname?: string;
  content: string;
  sendTime: string;
  status?: "pending" | "sent" | "failed";
}

export interface DMDetailResponse {
  exists: boolean;
  chatRoomId?: number;
  itemInfo: ItemInfo;
  messages?: Message[];
}
