import { productCardMock_DELAYED } from "@/features/product/mock/productCard.delayed.mock";
import Pagenation from "../common/Pagenation";
import ProductCard from "../common/ProductCard";
import ProductsGrid from "../common/ProductsGrid";
import Title from "../common/Title";

export default function DelayPopularProducts() {
  return (
    <div className="mt-10">
      <Title>일반 인기 상품</Title>
      <ProductsGrid>
        {productCardMock_DELAYED.map(product => (
          <ProductCard context="CARD" key={product.id} data={product} />
        ))}
      </ProductsGrid>
      <Pagenation />
    </div>
  );
}
