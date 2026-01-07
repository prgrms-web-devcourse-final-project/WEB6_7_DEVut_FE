import MessageClient from "@/components/message/MessageClient";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function MessageDetail({ params }: PageProps) {
  const resolvedParams = await params;
  const roomId = Number(resolvedParams.id);

  return <MessageClient roomId={roomId} />;
}
