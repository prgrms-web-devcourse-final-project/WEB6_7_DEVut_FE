"use client";

import { useDMList } from "@/features/message/hooks/useDMList";
import { useDMSocketStore } from "@/features/socket/store/useDMSocketStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getDelayProduct } from "@/features/product/api/product.client.api";

interface MessageLeftProps {
  selectedRoomId: number | null;
  onSelectRoom: (roomId: number) => void;
}

const ORANGE = "#FF8A00";
export default function MessageLeft({ selectedRoomId, onSelectRoom }: MessageLeftProps) {
  const { data } = useDMList();
  const { messagesByRoom } = useDMSocketStore();

  return (
    <div className="flex h-full min-h-0 w-full flex-col border-r-2 border-[#6D4C41] md:w-[394px]">
      <div className="text-title-main mx-auto flex min-h-[65px] items-center gap-3 border-b-2 border-[#6D4C41] px-[42px] py-5 text-2xl">
        메시지
      </div>
      <ul className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {!data || data.chatRooms.length === 0 ? (
          <div className="flex h-full items-center justify-center p-10">
            <div className="text-center">
              <p className="text-title-main text-center">대화를 시작해보세요!</p>
            </div>
          </div>
        ) : (
          data.chatRooms.map(room => {
            if (!room?.chatRoomId || !room?.otherUserNickname) {
              console.warn("[MessageLeft] Skipping room with missing data:", room);
              return null;
            }
            const isSelected = selectedRoomId === room.chatRoomId;
            const socketMessages = room.chatRoomId ? (messagesByRoom[room.chatRoomId] ?? []) : [];
            const latestSocketMessage = socketMessages[socketMessages.length - 1];

            return (
              <RoomListItem
                key={room.chatRoomId}
                room={room}
                isSelected={isSelected}
                latestSocketMessage={latestSocketMessage?.content}
                onSelectRoom={onSelectRoom}
              />
            );
          })
        )}
      </ul>
    </div>
  );
}

// 각 채팅방 아이템 컴포넌트 - itemId로 상품 정보 조회
function RoomListItem({
  room,
  isSelected,
  latestSocketMessage,
  onSelectRoom,
}: {
  room: DMRoom;
  isSelected: boolean;
  latestSocketMessage: string;
  onSelectRoom: (roomId: number) => void;
}) {
  const router = useRouter();

  // itemId로 상품 정보 조회
  const { data: productData } = useQuery({
    queryKey: ["product-brief", room.itemId],
    queryFn: () => getDelayProduct(room.itemId),
    enabled: !!room.itemId,
    staleTime: 5 * 60 * 1000, // 5분간 캐시
  });

  const itemName = productData?.name || `상품 #${room.itemId}`;

  return (
    <li
      onClick={() => {
        onSelectRoom(room.chatRoomId);
        router.push(`/message/${room.chatRoomId}`);
      }}
      className={`m-3 flex cursor-pointer items-center gap-3 rounded-xl border-[3px] p-3 transition-all hover:border-[#C56E33] ${
        isSelected
          ? `shadow-[0px_0px_10px_${ORANGE}] border-[#C56E33] bg-[#FFDAB9]`
          : "border-transparent"
      } `}
    >
      <div className="flex w-full flex-1 items-center gap-3 overflow-hidden">
        <div className="relative h-12 w-12 flex-shrink-0">
          {room.hasUnreadMessage && (
            <div
              className={`shadow-[0px_0px_10px_${ORANGE}] absolute top-0.5 -left-1 z-10 h-4 w-4 rounded-full bg-[#FF7043]`}
            />
          )}

          <div className="h-full w-full overflow-hidden rounded-full border-2 border-[#6D4C41]">
            {room.otherUserProfileImage ? (
              <Image
                src={room.otherUserProfileImage}
                alt={room.otherUserNickname}
                width={48}
                height={48}
                className="block h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                {room.otherUserNickname.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full flex-1 items-center justify-between gap-3 overflow-hidden">
          <div className="flex flex-1 flex-col gap-1 overflow-hidden">
            <span className="truncate text-[16px] font-bold text-[#6D4C41]">{itemName}</span>
            <span className="truncate text-[14px] text-[#8D6E63]">{room.otherUserNickname}</span>
          </div>
          <div className="flex flex-shrink-0 flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              {room.lastMessageTime && (
                <span className="text-[11px] whitespace-nowrap text-[#A1887F]">
                  {new Date(room.lastMessageTime).toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
            <p className="max-w-[100px] truncate text-right text-[14px] text-[#A1887F]">
              {latestSocketMessage ?? room.lastMessage ?? ""}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
