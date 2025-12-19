import CategorySection from "@/components/auction/delay/CategorySection";
import DelayProducts from "@/components/auction/delay/DelayProducts";
import ContentContainer from "@/components/common/ContentContainer";
import PageTabArea from "@/components/common/PageTabArea";
import { auctionItems } from "@/constants/route/auction";
import { getDelayedProducts } from "@/features/product/api/product.server.api";

export default async function AuctionDelayPage() {
  const params = {
    page: 1,
    size: 15,
    category: undefined,
  };
  const initialDelayProducts = await getDelayedProducts(params);

  return (
    <>
      <PageTabArea items={auctionItems} />
      <ContentContainer bordered={false} className="pt-5">
        <DelayProducts initialDelayProducts={initialDelayProducts} params={params} />
      </ContentContainer>
    </>
  );
}
