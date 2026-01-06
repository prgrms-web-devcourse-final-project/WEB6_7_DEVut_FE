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

  const purchaseItems = purchaseData ?? [];

  const STATUS_MAP: Record<string, AuctionStatus | "ALL"> = {
    전체: "ALL",
    잔금대기: "PAYMENT_PENDING",
    "거래 중": "IN_DEAL",
    "구매 확정": "PURCHASE_CONFIRMED",
    "경매 종료": "FAILED",
  };

  const filteredItems = purchaseItems.filter(product => {
    if (product.status?.kind !== "status") return false;

    if (product.status.status === "IN_PROGRESS") return false;
    if (product.status.status === "BEFORE_BIDDING") return false;

    if (status === "전체") return true;

    return product.status.status === STATUS_MAP[status];
  });

  const isEmpty = filteredItems.length === 0;
  return (
    <div className="mt-10">
      <Title wrapperClassName="mb-0" size={"lg"}>
        구매 상세
      </Title>
      <div className="flex w-full justify-end gap-5">
        <div className="relative w-[110px] translate-y-2 scale-120"></div>

        <OptionDropdown label={status} className="mb-5">
          <OptionDropdown.Item onClick={() => setStatus("전체")}>전체</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("잔금대기")}>잔금대기</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("거래 중")}>거래 중</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("구매 확정")}>
            구매 확정
          </OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("경매 종료")}>
            경매 종료
          </OptionDropdown.Item>
        </OptionDropdown>
      </div>

      <ProductsGrid>
        {isEmpty ? (
          <div className="border-border-sub col-span-full flex min-h-[220px] flex-col items-center justify-center rounded-md border-2 border-dashed bg-[#FDF6E9] text-center">
            <p className="text-title-main text-lg font-bold">구매 이력이 없습니다</p>
          </div>
        ) : (
          filteredItems.map(product => (
            <ProductCard context="MY_BUYING" key={product.id} product={product} />
          ))
        )}
      </ProductsGrid>
      {/* <Pagenation className="mt-5" /> */}
    </div>
  );
}
