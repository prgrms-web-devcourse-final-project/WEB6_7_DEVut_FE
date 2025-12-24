"use client";
import ContentContainer from "../../common/ContentContainer";
import ProductsGrid from "@/components/common/ProductsGrid";
import ProductCard from "@/components/common/ProductCard";
import Title from "@/components/common/Title";
import { useMyWish } from "@/features/mypage/hooks/useMyWish";
import delayBadge from "@/assets/common/delayBadge.svg";
import liveBadge from "@/assets/common/liveBadge.svg";

export default function MyWish() {
  const { data: myWish } = useMyWish();
  console.log("MyWish 컴포넌트 실행 ", myWish);
  const newMyWish = myWish?.items.map(item => ({
    id: item.id,
    title: item.name,
    amount: item.initPrice,
    image: item.image,
    href: `/product/${item.id}`,
    isWish: true,
    badge: { image: item.type === "DELAYED" ? delayBadge : liveBadge, alt: "일반 경매" },
    type: item.type,
  }));
  return (
    <>
      <ContentContainer className="flex flex-col justify-between gap-3" bordered={false}>
        <Title size="lg" className="px-2">
          찜 목록
        </Title>
        <ProductsGrid>
          {newMyWish?.map(product => (
            <ProductCard context="CARD" key={product.id} product={product} />
          ))}
        </ProductsGrid>
      </ContentContainer>
    </>
  );
}
