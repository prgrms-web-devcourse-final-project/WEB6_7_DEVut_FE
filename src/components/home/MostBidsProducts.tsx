"use client";

import Link from "next/link";
import Title from "../common/Title";
import PopularProductsCarousel from "../product/PopularProductsCarousel";
import { Flame } from "lucide-react";

export default function MostBidsProducts({ products }: { products: ProductCardType[] }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Title size="lg" icon={<Flame size={24} className="text-custom-red" />}>
          입찰 경쟁 폭주 상품
        </Title>
        <Link
          href="/auction/delay"
          className="text-border-sub2/60 hover:text-title-main translate-y-2 text-[12px] font-medium transition hover:underline"
        >
          더 보러가기
        </Link>
      </div>
      <PopularProductsCarousel products={products} autoplayDelay={4000} />
    </div>
  );
}
