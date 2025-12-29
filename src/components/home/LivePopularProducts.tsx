import PopularProductsCarousel from "../product/PopularProductsCarousel";

export default function LivePopularProducts({ products }: { products: ProductCardType[] }) {
  return (
    <PopularProductsCarousel
      title="라이브 인기 상품"
      products={products}
      autoplayDelay={4000}
      href="/auction"
    />
  );
}
