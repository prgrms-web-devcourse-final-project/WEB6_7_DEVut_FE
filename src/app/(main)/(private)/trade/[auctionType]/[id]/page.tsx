import PagePrevArea from "@/components/common/PagePrevArea";
import TradeInfo from "@/components/trade/TradeInfo";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params?: { auctionType?: string; id?: string } }) {
  if (!params) {
    notFound();
  }
  const { auctionType, id } = await params;

  const mappedAuctionType =
    auctionType === "live" ? "LIVE" : auctionType === "delayed" ? "DELAYED" : null;

  if (!mappedAuctionType || !id) {
    notFound();
  }

  return (
    <>
      <PagePrevArea title="거래 상세" />
      <TradeInfo auctionType={mappedAuctionType} dealId={id} />
    </>
  );
}
