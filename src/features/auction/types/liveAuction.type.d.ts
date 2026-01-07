interface LiveRoomItem {
  id: number;
  title: string;
  amount: number;
  image: string;
  isLiked: boolean;
}

interface LiveRoom {
  roomId: number;
  roomIndex: number;
  status: "SCHEDULED" | "LIVE" | "ENDED";
  itemCount: number;
  items: LiveRoomItem[];
}

interface LiveRoomData {
  startAt: string;
  rooms: LiveRoom[];
}

interface LiveRoomResponse {
  resultCode: string;
  msg: string;
  data: LiveRoomData;
}
