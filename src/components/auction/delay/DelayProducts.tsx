"use client";

import OrderSwitch from "@/components/common/OrderSwitch";
import Pagenation from "@/components/common/Pagenation";
import ProductCard from "@/components/common/ProductCard";
import ProductsGrid from "@/components/common/ProductsGrid";
import Title from "@/components/common/Title";
import CategorySection from "./CategorySection";
import { useState } from "react";
import { useDelayedProducts } from "@/features/product/hooks/useDelayedProducts";

interface DelayProductsProps {
  initialParams: GetProductsParams;
  initialDelayProducts: ProductCardType[];
}

export default function DelayProducts({ initialParams, initialDelayProducts }: DelayProductsProps) {
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [page, setPage] = useState(initialParams.page);
  const params: GetProductsParams = {
    ...initialParams,
    page,
    category: category ?? undefined,
  };

  const {
    data: products,
    isLoading,
    error,
  } = useDelayedProducts(params, {
    initialData:
      page === initialParams.page && category === null ? initialDelayProducts : undefined,
  });

  if (isLoading) return <div>일반 경매 목록 불러오는중...</div>;
  if (error) return <div>목록을 불러오는 중 오류가 발생하였습니다.</div>;

  return (
    <>
      <CategorySection
        category={category}
        setCategory={(category: CategoryKey) => {
          setCategory(category);
          setPage(1);
        }}
      />
      <div className="mt-10">
        <Title size={"sm"} className="font-normal">
          <span>
            카테고리
            <span className="mx-3">&gt;</span>
          </span>
          <span className="underline underline-offset-8">엔터테이너먼트</span>
        </Title>
        <div className="h-[15px] w-[90%] text-right">
          <OrderSwitch />
        </div>
        <ProductsGrid>
          {products?.map(product => (
            <ProductCard context="CARD" key={product.id} product={product} />
          ))}
        </ProductsGrid>
        <Pagenation />
      </div>
    </>
  );
}
