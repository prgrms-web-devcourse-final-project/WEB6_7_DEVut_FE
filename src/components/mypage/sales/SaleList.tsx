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

  return (
    <>
      <Title size="lg">판매중인 목록</Title>
      <ContentContainer className="border-border-sub/50 shadow-flat-light w-full border px-3 py-4 md:w-full">
        <ProductsGrid>
          {shownProducts.map((product, index) =>
            product.status.kind === "time" ||
            (product.status.kind === "status" && product.status.status === "IN_PROGRESS") ||
            (product.status.kind === "status" && product.status.status === "BEFORE_BIDDING") ? (
              <ProductCard context="MY_SELLING" key={index} product={product} />
            ) : (
              ""
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
