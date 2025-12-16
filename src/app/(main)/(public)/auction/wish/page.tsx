import ContentContainer from "@/components/common/ContentContainer";
import Pagenation from "@/components/common/Pagenation";
import PageTabArea from "@/components/common/PageTabArea";
import ProductCard from "@/components/common/ProductCard";
import ProductsGrid from "@/components/common/ProductsGrid";
import { auctionItems } from "@/constants/route/auction";
import { productMocks } from "@/features/product/mock/productCard.mock";

export default function AuctionWishPage() {
  return (
    <>
      <PageTabArea items={auctionItems} />
      <ContentContainer bordered={false} className="pt-5">
        <ProductsGrid>
          {productMocks.map(product => (
            <ProductCard key={product.id} data={product} />
          ))}
        </ProductsGrid>
        <Pagenation />
      </ContentContainer>
    </>
  );
}
