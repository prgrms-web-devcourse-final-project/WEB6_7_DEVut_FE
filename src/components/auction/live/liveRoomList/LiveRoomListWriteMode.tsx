"use client";

import { useEffect, useState } from "react";
import LiveRoomCarousel from "./LiveRoomCarousel";
import useIsMobile from "@/hooks/useIsMobile";

interface LiveRoomListWriteModeProps {
  existingRooms: LiveRoom[];
  onSelect: (room: LiveRoom) => void;
  onRoomClick?: (room: LiveRoom) => void;
  onFocusedRoomChange?: (room: LiveRoom) => void;
}

export default function LiveRoomListWriteMode({
  existingRooms,
  onSelect,
  onRoomClick,
  onFocusedRoomChange,
}: LiveRoomListWriteModeProps) {
  const isMobile = useIsMobile();
  const [focusedIndex, setFocusedIndex] = useState(1);
  const [rooms, setRooms] = useState<LiveRoom[]>([]);

  useEffect(() => {
    // 5개 고정 방 생성
    const fullRooms: LiveRoom[] = Array.from({ length: 5 }, (_, i) => ({
      roomId: i + 1,
      roomIndex: i + 1, // 1 ~ 5
      status: "SCHEDULED",
      itemCount: 0,
      items: [],
    }));

    if (existingRooms && existingRooms.length > 0) {
      existingRooms.forEach(room => {
        if (room.roomIndex >= 1 && room.roomIndex <= 5) {
          fullRooms[room.roomIndex - 1] = room;
        }
      });
    }

    setRooms(fullRooms);
  }, [existingRooms]);

  useEffect(() => {
    if (onFocusedRoomChange && rooms.length > 0) {
      const currentRoom = rooms[focusedIndex];
      if (currentRoom) {
        onFocusedRoomChange(currentRoom);
      }
    }
  }, [focusedIndex, rooms, onFocusedRoomChange]);

  return (
    <LiveRoomCarousel
      rooms={rooms}
      focusedIndex={focusedIndex}
      setFocusedIndex={setFocusedIndex}
      onRoomClick={onRoomClick}
      onSelect={onSelect}
      isMobile={isMobile}
    />
  );
}
