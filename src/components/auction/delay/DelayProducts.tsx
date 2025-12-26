"use client";

import OrderSwitch from "@/components/common/OrderSwitch";
import Pagenation from "@/components/common/Pagenation";
import ProductCard from "@/components/common/ProductCard";
import ProductsGrid from "@/components/common/ProductsGrid";
import Title from "@/components/common/Title";
import CategorySection from "./CategorySection";
import { useDelayedProducts } from "@/features/product/hooks/useDelayedProducts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DelayProductsProps {
  initialDelayProducts: ProductCardType[];
}

export default function DelayProducts({ initialDelayProducts }: DelayProductsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page") ?? 1);
  const category = searchParams.get("category") as CategoryKey;

  const params: GetProductsParams = {
    page,
    size: 15,
    category: category ?? undefined,
  };

  const {
    data: products,
    isLoading,
    error,
  } = useDelayedProducts(params, {
    initialData: page === 1 && !category ? initialDelayProducts : undefined,
  });

  const updateParams = (next: { page?: number; category?: string }) => {
    const sp = new URLSearchParams(searchParams.toString());

    Object.entries(next).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
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
        category={category}
        setCategory={category => updateParams({ category, page: 1 })}
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
