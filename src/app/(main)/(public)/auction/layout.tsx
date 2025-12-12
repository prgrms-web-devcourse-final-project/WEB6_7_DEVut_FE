import PageTabArea from "@/components/common/PageTabArea";
import { auctionItems } from "@/constants/route/auction";

export default function AuctionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageTabArea items={auctionItems} />
      {children}
    </div>
  );
}
