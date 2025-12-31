"use client";
import ContentContainer from "../../common/ContentContainer";
import ProductsGrid from "@/components/common/ProductsGrid";
import ProductCard from "@/components/common/ProductCard";
import Title from "@/components/common/Title";
import { useMyWish } from "@/features/mypage/hooks/useMyWish";
import { myPageCardMapping } from "@/utils/myPageCardMapping";

export default function MyWish() {
  const { data: myWish } = useMyWish();
  const newMyWish = myPageCardMapping({ card: myWish });

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
