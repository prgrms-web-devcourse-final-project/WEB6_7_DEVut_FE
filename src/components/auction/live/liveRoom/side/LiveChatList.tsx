import { useEffect, useRef } from "react";
import LiveChatItem, { LiveChatItemProps } from "./LiveChatItem";

export default function LiveChatList({ messages }: { messages: LiveChatItemProps[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ul className="px-2">
      {messages.map((msg, idx) => (
        <LiveChatItem key={idx} {...msg} />
      ))}
      <div ref={bottomRef} />
    </ul>
  );
}
