import { productCardMock_DELAYED } from "@/features/product/mock/productCard.delayed.mock";
import PopularProductsCarousel from "../product/PopularProductsCarousel";

export default function DelayPopularProducts({ products }: { products: ProductCardType[] }) {
  return (
    <PopularProductsCarousel
      title="인기 상품"
      products={products}
      autoplayDelay={5000}
      href="/auction/delay"
    />
  );
}
