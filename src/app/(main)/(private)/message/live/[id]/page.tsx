"use client";

import MessageClient from "@/components/message/MessageClient";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function LiveMessageDetail({ params }: PageProps) {
  const resolvedParams = await params;
  const productId = Number(resolvedParams.id);

  return <MessageClient productId={productId} />;
}
