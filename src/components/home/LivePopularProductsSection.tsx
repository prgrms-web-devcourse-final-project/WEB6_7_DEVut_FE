"use client";

import dynamic from "next/dynamic";
import LivePopularProductsSkeleton from "../skeleton/product/LivePopularProductsSkeleton";
import HomeBannerSkeleton from "../skeleton/banner/HomeBannerSkeleton";

const LivePopularProductsClient = dynamic(() => import("./LivePopularProducts"), {
  ssr: false,
  loading: () => <LivePopularProductsSkeleton />,
});

const HomeBannerClient = dynamic(() => import("./HomeBanner"), {
  ssr: false,
  loading: () => <HomeBannerSkeleton />,
});

export default function LivePopularProductsSection({
  liveHotProducts,
}: {
  liveHotProducts: ProductCardType[];
}) {
  return (
    <>
      <HomeBannerClient />
      <LivePopularProductsClient products={liveHotProducts} />
    </>
  );
}
