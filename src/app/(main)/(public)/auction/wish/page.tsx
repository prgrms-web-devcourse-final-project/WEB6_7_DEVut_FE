import ContentContainer from "@/components/common/ContentContainer";
import Pagenation from "@/components/common/Pagenation";
import PageTabArea from "@/components/common/PageTabArea";
import ProductCard from "@/components/common/ProductCard";
import ProductsGrid from "@/components/common/ProductsGrid";
import { auctionItems } from "@/constants/route/auction";
import { productCardMock_DELAYED } from "@/features/product/mock/productCard.delayed.mock";

export default function AuctionWishPage() {
  return (
    <>
      <PageTabArea items={auctionItems} />
      <ContentContainer bordered={false} className="pt-5">
        <ProductsGrid>
          {productCardMock_DELAYED.map(product => (
            <ProductCard context="CARD" key={product.id} data={product} />
          ))}
        </ProductsGrid>
        <Pagenation />
      </ContentContainer>
    </>
  );
}
