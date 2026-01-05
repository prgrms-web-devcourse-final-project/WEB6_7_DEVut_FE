"use client";
import ContentContainer from "../../common/ContentContainer";
import ProductsGrid from "@/components/common/ProductsGrid";
import ProductCard from "@/components/common/ProductCard";
import Title from "@/components/common/Title";
import { useMyWish } from "@/features/mypage/hooks/useMyWish";

export default function MyWish({ initialData }: { initialData?: ProductCardType[] }) {
  const { data: myWish } = useMyWish({ initialData });
  const isEmpty = !myWish || myWish.length === 0;

  return (
    <>
      <ContentContainer className="flex flex-col justify-between gap-3" bordered={false}>
        <Title size="lg" className="px-2">
          찜 목록
        </Title>
        <ProductsGrid>
          {isEmpty ? (
            <div className="border-border-sub col-span-full flex min-h-[220px] flex-col items-center justify-center rounded-md border-2 border-dashed bg-[#FDF6E9] text-center">
              <p className="text-title-main text-lg font-bold">찜으로 등록된 상품이 없습니다</p>
              <p className="mt-2 text-sm opacity-70">
                아직 등록된 판매 상품이 없어요.
                <br />
                상품을 등록해보세요!
              </p>
            </div>
          ) : (
            myWish?.map((product, index) => (
              <ProductCard context="CARD" key={index} product={product} />
            ))
          )}
        </ProductsGrid>
      </ContentContainer>
    </>
  );
}
