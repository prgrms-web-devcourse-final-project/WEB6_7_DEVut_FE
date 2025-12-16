import PageTabArea from "@/components/common/PageTabArea";
import { auctionItems } from "@/constants/route/auction";

export default function AuctionPage() {
  return (
    <>
      <PageTabArea items={auctionItems} />
      <div className="mx-auto w-full max-w-[1440px]">
        <h1>AuctionPage</h1>
      </div>
    </>
  );
}
