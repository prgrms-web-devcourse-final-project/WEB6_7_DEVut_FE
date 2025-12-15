import CategorySection from "@/components/auction/delay/CategorySection";
import DelayProducts from "@/components/auction/delay/DelayProducts";
import ContentContainer from "@/components/common/ContentContainer";
import PageTabArea from "@/components/common/PageTabArea";
import { auctionItems } from "@/constants/route/auction";

export default function AuctionDelayPage() {
  return (
    <>
      <PageTabArea items={auctionItems} />
      <ContentContainer bordered={false} className="pt-5">
        <CategorySection />
        <DelayProducts />
      </ContentContainer>
    </>
  );
}
