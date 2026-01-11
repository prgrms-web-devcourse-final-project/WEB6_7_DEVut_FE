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
type LiveChatType = "SYSTEM" | "LIVE_BID" | "USER" | "AUCTION_END";

interface LiveChatMessage {
  tempId: string;
  type: LiveChatType;
  senderId?: number;
  nickname?: string;
  profileImageUrl?: string;
  message: string;
  sendTime: number;
  newPrice?: number;
  bidderId?: number;
  result?: "SUCCESS" | "FAILED";
  winnerId?: number;
  finalPrice?: number;
  bidderNickname?: string;
  winnerNickname?: string;
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
  participantCount: number;
}

// 경매방 상품 목록 DTO
interface LiveRoomProduct {
  id: number;
  name: string;
  imageUrls: string[];
  initPrice: number;
  currentPrice: number;
  auctionStatus: AuctionStatus;
}

interface LiveRoomProductsResponse {
  items: LiveRoomProduct[];
  remainingMs: number | null;
}

// 라이브 상품 입찰 리퀘스트 DTO
interface LiveBidRequest {
  liveItemId: number;
  auctionId: number;
  bidPrice: number;
}

// 응답 DTO
interface LiveBidResponse {
  isSuccess: boolean;
  message: string;
  bidPrice: number;
}
