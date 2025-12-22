import ContentContainer from "../../common/ContentContainer";
import ProductsGrid from "@/components/common/ProductsGrid";
import ProductCard from "@/components/common/ProductCard";
import Title from "@/components/common/Title";
import { productCardMock_DELAYED } from "@/features/product/mock/productCard.delayed.mock";

export default function MyWish() {
  return (
    <>
      <ContentContainer className="flex min-h-[370px] flex-col justify-between gap-3">
        <Title size="lg" className="px-2">
          찜 목록
        </Title>
        <ProductsGrid>
          {productCardMock_DELAYED.map(product => (
            <ProductCard context="CARD" key={product.id} product={product} />
          ))}
        </ProductsGrid>
      </ContentContainer>
    </>
  );
}
