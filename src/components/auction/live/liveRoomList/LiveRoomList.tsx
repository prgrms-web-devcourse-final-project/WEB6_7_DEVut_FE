import { useEffect, useState } from "react";
import LiveRoomCarousel from "./LiveRoomCarousel";
import useIsMobile from "@/hooks/useIsMobile";

interface LiveRoomListProps {
  rooms: LiveRoom[];
  onRoomClick?: (room: LiveRoom) => void;
  onFocusedRoomChange?: (room: LiveRoom) => void;
  startAt?: string;
}

export default function LiveRoomList({
  rooms,
  onRoomClick,
  onFocusedRoomChange, // setFocusedRoom
  startAt,
}: LiveRoomListProps) {
  const isMobile = useIsMobile();
  const [focusedIndex, setFocusedIndex] = useState(1);

  useEffect(() => {
    if (rooms.length > 0) {
      setFocusedIndex(Math.floor(rooms.length / 2));
    }
  }, [rooms]);

  // 현재 중앙에 있는 방 정보 전달
  useEffect(() => {
    if (onFocusedRoomChange && rooms.length > 0) {
      const currentRoom = rooms[focusedIndex];
      if (currentRoom) {
        onFocusedRoomChange(currentRoom);
      }
    }
  }, [focusedIndex, rooms, onFocusedRoomChange]);

  if (rooms.length === 0)
    return (
      <div className="flex h-full w-full items-center justify-center text-center text-2xl">
        🧚🏻‍♀️ 예정된 라이브 경매방이 없어요 🧚🏻‍♀️
      </div>
    );

  return (
    <LiveRoomCarousel
      rooms={rooms}
      focusedIndex={focusedIndex}
      setFocusedIndex={setFocusedIndex}
      onRoomClick={onRoomClick}
      isMobile={isMobile}
      startAt={startAt}
    />
  );
}
