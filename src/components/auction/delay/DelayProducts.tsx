"use client";

import OrderSwitch from "@/components/common/OrderSwitch";
import ProductCard from "@/components/common/ProductCard";
import ProductsGrid from "@/components/common/ProductsGrid";
import Title from "@/components/common/Title";
import CategorySection from "./CategorySection";
import { useDelayedProducts } from "@/features/product/hooks/useDelayedProducts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCategoryLabel } from "@/utils/category";
import Pagination from "@/components/common/Pagenation";
import EmptyContainer from "@/components/common/EmptyContainer";
import { useState } from "react";
import SellingToggle from "@/components/search/SellingToggle";

interface DelayProductsProps {
  initialDelayProducts: ProductsResponse;
}

export default function DelayProducts({ initialDelayProducts }: DelayProductsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page") ?? 1);
  const category = searchParams.get("category") as CategoryKey;
  const [isSelling, setIsSelling] = useState(true);

  const params: GetProductsParams = {
    page,
    size: 15,
    category: category ?? undefined,
    isSelling,
  };

  const { data, isLoading, error } = useDelayedProducts(params, {
    initialData: page === 1 && isSelling && !category ? initialDelayProducts : undefined,
  });

  const updateParams = (next: { page?: number; category?: CategoryKey | null }) => {
    const sp = new URLSearchParams(searchParams.toString());

    Object.entries(next).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        sp.delete(key);
      } else {
        sp.set(key, String(value));
      }
    });

    router.push(`${pathname}?${sp.toString()}`, { scroll: false });
  };

  if (isLoading) return <div>일반 경매 목록 불러오는중...</div>;
  if (error) return <div>목록을 불러오는 중 오류가 발생하였습니다.</div>;

  return (
    <>
      <CategorySection
        all={true}
        category={category}
        setCategory={category => updateParams({ category, page: 1 })}
      />
      <div className="mt-10">
        <div className="flex w-full items-start justify-between">
          <Title size={"sm"} className="mb-2 font-normal">
            <span>
              카테고리
              <span className="mx-3">&gt;</span>
            </span>
            <span className="underline underline-offset-8">
              {category ? getCategoryLabel(category) : "전체"}
            </span>
          </Title>
          <SellingToggle
            isSelling={isSelling}
            handleIsSelling={() => setIsSelling(prev => !prev)}
          />
        </div>

        {/* <div className="h-[15px] w-[90%] text-right">
          <OrderSwitch />
        </div> */}
        {!!!data?.totalCount && (
          <EmptyContainer
            className="h-100"
            title="등록된 상품이 없습니다"
            description="조금만 기다려 주세요. 곧 새로운 상품이 등록될 예정입니다."
          />
        )}
        <ProductsGrid>
          {data?.products?.map(product => (
            <ProductCard context="CARD" key={product.id} product={product} />
          ))}
        </ProductsGrid>
        {data && <Pagination totalPages={Math.ceil(data.totalCount / params.size)} />}
      </div>
    </>
  );
}
