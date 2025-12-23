"use client";

import dynamic from "next/dynamic";
import LivePopularProductsSkeleton from "../skeleton/product/LivePopularProductsSkeleton";

const LivePopularProductsClient = dynamic(() => import("./LivePopularProducts"), {
  ssr: false,
  loading: () => <LivePopularProductsSkeleton />,
});

export default function LivePopularProductsSection({
  liveHotProducts,
}: {
  liveHotProducts: ProductCardType[];
}) {
  return <LivePopularProductsClient />;
}
