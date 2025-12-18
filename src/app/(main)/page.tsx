import ContentContainer from "@/components/common/ContentContainer";
import DelayPopularProducts from "@/components/home/DelayPopularProducts";
import LivePopularProducts from "@/components/home/LivePopularProducts";

import HomeBanner from "@/components/home/HomeBanner";

export default function Home() {
  return (
    <ContentContainer bordered={false} className="pt-5">
      <HomeBanner />
      <LivePopularProducts />
      <DelayPopularProducts />
    </ContentContainer>
  );
}
