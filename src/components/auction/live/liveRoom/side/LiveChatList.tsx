// LiveChatList.tsx
import { useEffect, useRef } from "react";
import LiveChatItem from "./LiveChatItem";

interface LiveChatListProps {
  messages: LiveChatMessage[];
  userId: number;
}

export default function LiveChatList({ messages, userId }: LiveChatListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ul className="space-y-2 px-2">
      {messages.map(message => (
        <LiveChatItem key={message.id} message={message} isMine={message.userId === userId} />
      ))}
      <div ref={bottomRef} />
    </ul>
  );
}
