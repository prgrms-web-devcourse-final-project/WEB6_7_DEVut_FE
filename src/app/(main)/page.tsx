import ContentContainer from "@/components/common/ContentContainer";
import DelayPopularProducts from "@/components/home/DelayPopularProducts";
import LivePopularProducts from "@/components/home/LivePopularProducts";

export default function Home() {
  return (
    <ContentContainer bordered={false}>
      <LivePopularProducts />
      <DelayPopularProducts />
    </ContentContainer>
  );
}
