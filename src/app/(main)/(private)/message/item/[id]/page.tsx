import MessageClient from "@/components/message/MessageClient";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function MessageByItemDetail({ params }: PageProps) {
  const resolvedParams = await params;
  const productId = Number(resolvedParams.id);

  return <MessageClient productId={productId} />;
}
