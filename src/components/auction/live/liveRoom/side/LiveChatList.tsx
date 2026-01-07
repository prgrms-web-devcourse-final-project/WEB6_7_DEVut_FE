"use client";

import { useEffect, useRef } from "react";
import LiveChatItem from "./LiveChatItem";

interface LiveChatListProps {
  messages: LiveChatMessage[];
  userId: number | undefined;
}

export default function LiveChatList({ messages, userId }: LiveChatListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  if (!userId) return;

  return (
    <div className="min-h-0 flex-1">
      <div className="aspect-[3/5] max-h-[1000px] w-full">
        <div ref={containerRef} className="h-full space-y-3 overflow-y-auto p-3">
          {messages.map((message, index) => (
            <LiveChatItem key={index} message={message} userId={userId} />
          ))}
        </div>
      </div>
    </div>
  );
}
