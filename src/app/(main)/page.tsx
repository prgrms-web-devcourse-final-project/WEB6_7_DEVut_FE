import ContentContainer from "@/components/common/ContentContainer";
import DelayPopularProducts from "@/components/home/DelayPopularProducts";
import LivePopularProducts from "@/components/home/LivePopularProducts";

export default function Home() {
  return (
    <ContentContainer bordered={false} className="pt-5">
      <section className="bg-content-area relative mb-5 h-[140px] w-full overflow-hidden rounded-sm sm:h-[180px] md:h-[220px] lg:h-[260px]">
        배너
      </section>
      <LivePopularProducts />
      <DelayPopularProducts />
    </ContentContainer>
  );
}
