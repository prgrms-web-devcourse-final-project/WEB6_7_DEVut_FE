import ContentContainer from "@/components/common/ContentContainer";
import { getDelayHotProducts, getLiveHotProducts } from "@/features/product/api/product.server.api";

import SocialLoginSuccessHandler from "@/components/auth/SocialLoginSuccessHandler";
import PopularProductsSection from "@/components/home/PopularProductsSection";

export default async function Home() {
  const [liveHotProducts, delayHotProducts] = await Promise.all([
    getLiveHotProducts(),
    getDelayHotProducts(),
  ]);

  return (
    <ContentContainer
      bordered={false}
      className="flex h-full min-h-[calc(100vh-75px)] flex-col overflow-hidden pt-5"
    >
      <SocialLoginSuccessHandler />
      <PopularProductsSection
        liveHotProducts={liveHotProducts}
        delayHotProducts={delayHotProducts}
      />
    </ContentContainer>
  );
}
