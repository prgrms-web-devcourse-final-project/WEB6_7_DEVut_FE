"use client";

import Link from "next/link";
import Title from "../common/Title";
import PopularProductsCarousel from "../product/PopularProductsCarousel";

export default function LivePopularProducts({ products }: { products: ProductCardType[] }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Title size="lg">라이브 인기 상품</Title>
        <Link
          href="/auction"
          className="text-border-sub2/60 hover:text-title-main translate-y-2 text-[12px] font-medium transition hover:underline"
        >
          더 보러가기
        </Link>
      </div>
      <PopularProductsCarousel products={products} autoplayDelay={4000} />
    </div>
  );
}
