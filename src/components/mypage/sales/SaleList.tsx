"use client";

import ContentContainer from "@/components/common/ContentContainer";
import ProductCard from "@/components/common/ProductCard";
import ProductsGrid from "@/components/common/ProductsGrid";
import Title from "@/components/common/Title";
import { useMySell } from "@/features/mypage/hooks/useMySell";
import { productCardMock_LIVE } from "@/features/product/mock/productCard.live.mock";
import { myPageCardMapping } from "@/utils/myPageCardMapping";
import { useEffect, useState } from "react";

export default function SaleList() {
  const { data: mySells } = useMySell();
  const [expanded, setExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);
  console.log(mySells);
  const newMySells = myPageCardMapping({ card: mySells });

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;

      if (width >= 1024) setVisibleCount(5);
      else if (width >= 640) setVisibleCount(3);
      else setVisibleCount(2);
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const sellItems = newMySells ?? [];
  const shownProducts = expanded ? sellItems : sellItems.slice(0, visibleCount);
  const isEmpty = shownProducts.length === 0;

  return (
    <>
      <Title size="lg">판매중인 목록</Title>
      <ContentContainer className="border-border-sub/50 shadow-flat-light w-full border px-3 py-4 md:w-full">
        <ProductsGrid>
          {isEmpty ? (
            <>
              <div className="border-border-sub col-span-full flex min-h-[220px] flex-col items-center justify-center rounded-md border-2 border-dashed bg-[#FDF6E9] text-center">
                <p className="text-title-main text-lg font-bold">판매중인 상품이 없습니다</p>
                <p className="mt-2 text-sm opacity-70">
                  아직 등록된 판매 상품이 없어요.
                  <br />
                  상품을 등록해보세요!
                </p>
              </div>
            </>
          ) : (
            shownProducts.map(product =>
              product.status.kind === "time" ||
              (product.status.kind === "status" &&
                (product.status.status === "IN_PROGRESS" ||
                  product.status.status === "BEFORE_BIDDING")) ? (
                <ProductCard context="MY_SELLING" key={product.id} product={product} />
              ) : null
            )
          )}
        </ProductsGrid>

        {productCardMock_LIVE.length > visibleCount && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setExpanded(prev => !prev)}
              className="text-title-sub cursor-pointer text-sm hover:underline"
            >
              {expanded ? "접기" : "더보기"}
            </button>
          </div>
        )}
      </ContentContainer>
    </>
  );
}
