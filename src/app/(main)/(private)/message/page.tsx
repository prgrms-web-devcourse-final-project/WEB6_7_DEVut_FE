"use client";

import { useState } from "react";
import MessageLeft from "@/components/message/MessageLeft";
import MessageRight from "@/components/message/MessageRight";

export default function MessagePage() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    setIsChatOpen(true);
  };

  const closeRoom = () => {
    setIsChatOpen(false);
    setTimeout(() => {
      setSelectedRoomId(null);
    }, 300);
  };

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px]">
      {/* 왼쪽 채팅방 리스트 */}
      <MessageLeft selectedRoomId={selectedRoomId} onSelectRoom={openRoom} />

      {/* 오른쪽 채팅 내용 */}
      <MessageRight roomId={selectedRoomId} onBack={closeRoom} isOpen={isChatOpen} />
    </div>
  );
}
