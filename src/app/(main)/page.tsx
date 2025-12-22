import ContentContainer from "@/components/common/ContentContainer";
import DelayPopularProducts from "@/components/home/DelayPopularProducts";
import HomeBanner from "@/components/home/HomeBanner";
import { getDelayHotProducts, getLiveHotProducts } from "@/features/product/api/product.server.api";
import LivePopularProductsSection from "@/components/home/LivePopularProductsSection";

export default async function Home() {
  const [liveHotProducts, delayHotProducts] = await Promise.all([
    getLiveHotProducts(),
    getDelayHotProducts(),
  ]);

  console.log("라이브 인기 상품:", liveHotProducts);
  console.log("일반 인기 상품:", delayHotProducts);
  return (
    <ContentContainer bordered={false} className="pt-5">
      <HomeBanner />
      <LivePopularProductsSection liveHotProducts={liveHotProducts} />
      <DelayPopularProducts />
    </ContentContainer>
  );
}
