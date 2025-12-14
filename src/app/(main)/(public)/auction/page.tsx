import PageTabArea from "@/components/common/PageTabArea";
import { auctionItems } from "@/constants/route/auction";

export default function AuctionPage() {
  return (
    <>
      <PageTabArea items={auctionItems} />
      <h1>AuctionPage</h1>
    </>
  );
}
