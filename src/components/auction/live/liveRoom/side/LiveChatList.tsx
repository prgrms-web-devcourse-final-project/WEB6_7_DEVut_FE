import { useEffect, useRef } from "react";
import LiveChatItem, { LiveChatItemProps } from "./LiveChatItem";

export default function LiveChatList({ messages }: { messages: LiveChatItemProps[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevLengthRef = useRef(messages.length);

  useEffect(() => {
    if (messages.length > prevLengthRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevLengthRef.current = messages.length;
  }, [messages.length]);

  return (
    <ul className="px-2">
      {messages.map((msg, idx) => (
        <LiveChatItem key={idx} {...msg} />
      ))}
      <div ref={bottomRef} />
    </ul>
  );
}
