"use client";

import Link from "next/link";
import Title from "../common/Title";
import PopularProductsCarousel from "../product/PopularProductsCarousel";
import { CirclePlay } from "lucide-react";
import EmptyContainer from "../common/EmptyContainer";
import Button from "../common/Button";

export default function LivePopularProducts({ products }: { products: ProductCardType[] }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Title size="lg" icon={<CirclePlay size={24} className="text-custom-red" />}>
          라이브 인기 상품
        </Title>
        <Link
          href="/auction"
          className="text-border-sub2/60 hover:text-title-main translate-y-2 text-[12px] font-medium transition hover:underline"
        >
          더 보러가기
        </Link>
      </div>
      {!!products.length ? (
        <PopularProductsCarousel products={products} autoplayDelay={5000} />
      ) : (
        <EmptyContainer
          title="주목을 받는 라이브 상품이 없어요"
          description="관심 있는 상품을 먼저 찜해보세요"
          action={
            <Link href={"/schedule"} className="text-title-sub2/80 text-sm hover:underline">
              시간표 보러가기
            </Link>
          }
        />
      )}
    </div>
  );
}
