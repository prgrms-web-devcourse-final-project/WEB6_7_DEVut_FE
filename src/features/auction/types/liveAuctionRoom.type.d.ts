// 관객
interface AudienceUser {
  userId: number;
  name: string;
  profileImageUrl?: string;
}

interface AudienceState {
  users: AudienceUser[];
}

// 채팅
type LiveChatType = "SYSTEM" | "BID" | "USER";

interface LiveChatMessage {
  tempId: string;
  type: LiveChatType;
  senderId?: number;
  nickname?: string;
  profileImageUrl?: string;
  message: string;
  sendTime: number;
}

// 상품 목록
type LiveProductStatus = "WAITING" | "ONGOING" | "DONE";

interface LiveAuctionProduct {
  id: number;
  name: string;
  imageUrl: string;
  startPrice: number;
  currentPrice: number;
  status: LiveProductStatus;
}

// 상품 스테이지
interface AuctionStageState {
  currentProductId: number | null;
  elapsedTimeSec: number;
}

// 경매 도메인
interface LiveAuctionState {
  stage: AuctionStageState;
  products: LiveAuctionProduct[];
}

// 경매방 입장 시 구독 id 반환 DTO
interface EnterChatRoomResponse {
  chatRoomId: number;
}

// 경매방 상품 목록 DTO
interface LiveRoomProduct {
  name: string;
  imageUrls: string[];
  price: number;
  auctionStatus: AuctionStatus;
}

interface LiveRoomProductsResponse {
  items: LiveRoomProduct[];
}
