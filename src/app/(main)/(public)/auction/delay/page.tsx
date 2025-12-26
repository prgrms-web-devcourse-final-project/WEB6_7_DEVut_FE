import DelayProducts from "@/components/auction/delay/DelayProducts";
import ContentContainer from "@/components/common/ContentContainer";
import PageTabArea from "@/components/common/PageTabArea";
import { auctionItems } from "@/constants/route/auction";
import { getDelayedProducts } from "@/features/product/api/product.server.api";
import { Suspense } from "react";

export default async function AuctionDelayPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    category?: string;
  };
}) {
  const params: GetProductsParams = {
    page: Number(searchParams.page ?? 1),
    size: 15,
    category: searchParams.category as CategoryKey,
  };

  const initialDelayProducts = await getDelayedProducts(params);

  return (
    <>
      <PageTabArea items={auctionItems} />
      <ContentContainer bordered={false} className="pt-5">
        <Suspense fallback={null}>
          <DelayProducts initialDelayProducts={initialDelayProducts} />
        </Suspense>
      </ContentContainer>
    </>
  );
}
