import LiveChatItem from "./LiveChatItem";

interface LiveChatListProps {
  messages: LiveChatMessage[];
  userId: number | undefined;
}

export default function LiveChatList({ messages, userId }: LiveChatListProps) {
  return (
    <ul className="space-y-3 p-3">
      {messages.map((message, index) => (
        <LiveChatItem key={index} message={message} isMine={message.userId === userId} />
      ))}
    </ul>
  );
}
