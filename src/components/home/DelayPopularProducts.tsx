import { productMocks } from "@/features/product/mock/productCard.mock";
import Pagenation from "../common/Pagenation";
import ProductCard from "../common/ProductCard";
import ProductsGrid from "../common/ProductsGrid";
import Title from "../common/Title";

export default function DelayPopularProducts() {
  return (
    <div className="mt-10">
      <Title>일반 인기 상품</Title>
      <ProductsGrid>
        {productMocks.map(product => (
          <ProductCard key={product.id} data={product} />
        ))}
      </ProductsGrid>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"></div>
      <Pagenation />
    </div>
  );
}
