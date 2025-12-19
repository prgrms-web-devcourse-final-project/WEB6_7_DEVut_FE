import CategorySection from "@/components/auction/delay/CategorySection";
import DelayProducts from "@/components/auction/delay/DelayProducts";
import ContentContainer from "@/components/common/ContentContainer";
import PageTabArea from "@/components/common/PageTabArea";
import { auctionItems } from "@/constants/route/auction";
import { getDelayedProducts } from "@/features/product/api/product.server.api";

export default async function AuctionDelayPage() {
  const initialDelayProducts = await getDelayedProducts({
    page: 1,
    size: 15,
  });

  console.log(initialDelayProducts);

  return (
    <>
      <PageTabArea items={auctionItems} />
      <ContentContainer bordered={false} className="pt-5">
        <CategorySection />
        <DelayProducts initialDelayProducts={initialDelayProducts}/>
      </ContentContainer>
    </>
  );
}
