import MessageClient from "@/components/message/MessageClient";

export default async function MessagePage() {
  // fetching
  return (
    <div className="relative mx-auto flex min-h-screen w-full">
      <MessageClient />
    </div>
  );
}
