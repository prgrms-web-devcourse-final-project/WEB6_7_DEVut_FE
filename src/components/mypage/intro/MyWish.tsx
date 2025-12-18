import ContentContainer from "../../common/ContentContainer";
import ProductsGrid from "@/components/common/ProductsGrid";
import ProductCard from "@/components/common/ProductCard";
import { productMocks } from "@/features/product/mock/productCard.mock";
import Title from "@/components/common/Title";

export default function MyWish() {
  return (
    <>
      <ContentContainer className="flex min-h-[370px] flex-col justify-between gap-3">
        <Title size="lg" className="px-2">
          찜 목록
        </Title>
        <ProductsGrid>
          {productMocks.map(product => (
            <ProductCard key={product.id} data={product} />
          ))}
        </ProductsGrid>
      </ContentContainer>
    </>
  );
}
