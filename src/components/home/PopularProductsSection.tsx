"use client";

import dynamic from "next/dynamic";
import LivePopularProductsSkeleton from "../skeleton/product/LivePopularProductsSkeleton";
import HomeBannerSkeleton from "../skeleton/banner/HomeBannerSkeleton";

const HomeBannerClient = dynamic(() => import("./HomeBanner"), {
  ssr: false,
  loading: () => <HomeBannerSkeleton />,
});

const LivePopularProductsClient = dynamic(() => import("./LivePopularProducts"), {
  ssr: false,
  loading: () => <LivePopularProductsSkeleton />,
});

const DelayPopularProductsClient = dynamic(() => import("./DelayPopularProducts"), {
  ssr: false,
  loading: () => <LivePopularProductsSkeleton />,
});

export default function PopularProductsSection({
  liveHotProducts,
  delayHotProducts,
}: {
  liveHotProducts: ProductCardType[];
  delayHotProducts: ProductCardType[];
}) {
  return (
    <div className="flex flex-col gap-7">
      <HomeBannerClient />
      <div className="flex flex-col gap-12">
        {/* <LivePopularProductsClient products={liveHotProducts} /> */}
        <DelayPopularProductsClient products={delayHotProducts} />
      </div>
    </div>
  );
}
