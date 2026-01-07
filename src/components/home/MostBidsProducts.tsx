"use client";

import Link from "next/link";
import Title from "../common/Title";
import PopularProductsCarousel from "../product/PopularProductsCarousel";
import { Flame } from "lucide-react";
import EmptyContainer from "../common/EmptyContainer";

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
      {!!products.length ? (
        <PopularProductsCarousel
          initialData={products}
          autoplayDelay={4000}
          type={"mostBidDelay"}
        />
      ) : (
        <EmptyContainer
          title="현재 치열한 입찰이 진행 중인 상품이 없어요"
          description="새로운 경매를 기다려보세요"
        />
      )}
    </div>
  );
}
