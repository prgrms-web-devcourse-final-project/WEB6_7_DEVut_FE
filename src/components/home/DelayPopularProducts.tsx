"use client";

import Link from "next/link";
import Title from "../common/Title";
import PopularProductsCarousel from "../product/PopularProductsCarousel";
import { Star } from "lucide-react";
import EmptyContainer from "../common/EmptyContainer";

export default function DelayPopularProducts({ products }: { products: ProductCardType[] }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Title size="lg" icon={<Star size={24} className="text-custom-orange" />}>
          찜 많이 받은 상품
        </Title>
        <Link
          href="/auction/delay"
          className="text-border-sub2/60 hover:text-title-main translate-y-2 text-[12px] font-medium transition hover:underline"
        >
          더 보러가기
        </Link>
      </div>
      {!!products.length ? (
        <PopularProductsCarousel initialData={products} autoplayDelay={5000} type={"delayHot"} />
      ) : (
        <EmptyContainer
          title="지금은 찜한 사람이 많은 상품이 없어요"
          description="관심 있는 상품을 먼저 찜해보세요"
        />
      )}
    </div>
  );
}
