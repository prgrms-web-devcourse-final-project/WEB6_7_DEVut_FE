import ContentContainer from "@/components/common/ContentContainer";
import PagePrevArea from "@/components/common/PagePrevArea";
import TradeInfo from "@/components/trade/TradeInfo";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <PagePrevArea title="거래 상세" />
      <TradeInfo tradeId={id} />
    </>
  );
}
