import CategorySection from "@/components/auction/delay/CategorySection";
import DelayProducts from "@/components/auction/delay/DelayProducts";
import ContentContainer from "@/components/common/ContentContainer";

export default function AuctionDelayPage() {
  return (
    <ContentContainer bordered={false} className="pt-5">
      <CategorySection />
      <DelayProducts />
    </ContentContainer>
  );
}
