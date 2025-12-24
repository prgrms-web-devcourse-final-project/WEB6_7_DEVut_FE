"use client";

import { useState } from "react";
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight";

export default function MessageClient() {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openRoom = (roomId: number) => {
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
    <>
      <MessageLeft selectedRoomId={selectedRoomId} onSelectRoom={openRoom} />
      <MessageRight roomId={selectedRoomId} onBack={closeRoom} isOpen={isChatOpen} />
    </>
  );
}
