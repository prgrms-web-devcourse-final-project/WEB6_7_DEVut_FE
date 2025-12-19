"use client";

import OrderSwitch from "@/components/common/OrderSwitch";
import Pagenation from "@/components/common/Pagenation";
import ProductCard from "@/components/common/ProductCard";
import ProductsGrid from "@/components/common/ProductsGrid";
import Title from "@/components/common/Title";
import CategorySection from "./CategorySection";
import { useState } from "react";

interface DelayProductsProps {
  params: GetProductsParams;
  initialDelayProducts: ProductCardType[];
}

export default function DelayProducts({ params, initialDelayProducts }: DelayProductsProps) {
  const [category, setCategory] = useState<CategoryKey | null>(null);
  // tanstack query

  return (
    <>
      <CategorySection
        category={category}
        setCategory={(category: CategoryKey) => setCategory(category)}
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
          {initialDelayProducts.map(product => (
            <ProductCard context="CARD" key={product.id} data={product} />
          ))}
        </ProductsGrid>
        <Pagenation />
      </div>
    </>
  );
}
