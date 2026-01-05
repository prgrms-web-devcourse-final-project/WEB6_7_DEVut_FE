"use client";

import OptionDropdown from "@/components/common/OptionDropdown";
import OrderSwitch from "@/components/common/OrderSwitch";
import Pagenation from "@/components/common/Pagenation";
import ProductCard from "@/components/common/ProductCard";
import ProductsGrid from "@/components/common/ProductsGrid";
import Title from "@/components/common/Title";
import { useMyPurchase } from "@/features/mypage/hooks/useMyPurchase";
import { useState } from "react";

export default function PurchaseDetail({ initialData }: { initialData?: ProductCardType[] }) {
  const [status, setStatus] = useState("전체");
  const { data: purchaseData } = useMyPurchase({ initialData });
  const isEmpty = !purchaseData || purchaseData.length === 0;
  return (
    <div className="mt-10">
      <Title wrapperClassName="mb-0" size={"lg"}>
        구매 상세
      </Title>
      <div className="flex w-full justify-end gap-5">
        <div className="relative w-[110px] translate-y-2 scale-120">
          <OrderSwitch />
        </div>

        <OptionDropdown label={status} className="mb-5">
          <OptionDropdown.Item onClick={() => setStatus("전체")}>전체</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("잔금대기")}>잔금대기</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("거래 중")}>거래 중</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("거래 완료")}>
            거래 완료
          </OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("구매 확정")}>
            구매 확정
          </OptionDropdown.Item>
        </OptionDropdown>
      </div>

      <ProductsGrid>
        {isEmpty ? (
          <div className="border-border-sub col-span-full flex min-h-[220px] flex-col items-center justify-center rounded-md border-2 border-dashed bg-[#FDF6E9] text-center">
            <p className="text-title-main text-lg font-bold">구매 이력이 없습니다</p>
          </div>
        ) : (
          purchaseData.map(product => (
            <ProductCard context="MY_BUYING" key={product.id} product={product} />
          ))
        )}
      </ProductsGrid>
      {/* <Pagenation className="mt-5" /> */}
    </div>
  );
}
