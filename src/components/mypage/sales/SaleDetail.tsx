"use client";

import OptionDropdown from "@/components/common/OptionDropdown";
import OrderSwitch from "@/components/common/OrderSwitch";
import Pagenation from "@/components/common/Pagenation";
import ProductCard from "@/components/common/ProductCard";
import ProductsGrid from "@/components/common/ProductsGrid";
import Title from "@/components/common/Title";
import { useMySell } from "@/features/mypage/hooks/useMySell";
<<<<<<< HEAD
=======
import { myPageSellCardMapping } from "@/utils/myPageCardMapping";
>>>>>>> 8bc8c0987040080705d87ce89e044ff117a7df99
import { useState } from "react";

export default function SaleDetail({ initialData }: { initialData: ProductCardType[] }) {
  const { data: mySells } = useMySell({ initialData });
  const [status, setStatus] = useState("전체");

<<<<<<< HEAD
=======
  const newMySells = myPageSellCardMapping({ card: mySells });
  const sellItems = newMySells ?? [];

>>>>>>> 8bc8c0987040080705d87ce89e044ff117a7df99
  const STATUS_MAP: Record<string, AuctionStatus | "ALL"> = {
    전체: "ALL",
    잔금대기: "PAYMENT_PENDING",
    "거래 중": "IN_DEAL",
    "판매 확정": "PURCHASE_CONFIRMED",
    유찰: "FAILED",
  };

  const filteredItems =
    mySells?.filter(product => {
      if (product.status?.kind !== "status") return false;
      if (product.status.status === "IN_PROGRESS") return false;
      if (product.status.status === "BEFORE_BIDDING") return false;
      if (status === "전체") return true;
      return product.status.status === STATUS_MAP[status];
    }) ?? [];

  const isEmpty = filteredItems.length === 0;

  console.log("filteredItems", filteredItems);

  return (
    <div className="mt-10">
      <Title wrapperClassName="mb-0" size={"lg"}>
        판매 상세
      </Title>
      <div className="flex w-full justify-end gap-5">
        <div className="relative w-[110px] translate-y-2 scale-120">
          <OrderSwitch />
        </div>

        <OptionDropdown label={status} className="mb-5">
          <OptionDropdown.Item onClick={() => setStatus("전체")}>전체</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("잔금대기")}>잔금대기</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("거래 중")}>거래 중</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("판매 확정")}>
            판매 확정
          </OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("유찰")}>유찰</OptionDropdown.Item>
        </OptionDropdown>
      </div>

      <ProductsGrid>
        {isEmpty ? (
          <div className="border-border-sub col-span-full flex min-h-[220px] flex-col items-center justify-center rounded-md border-2 border-dashed bg-[#FDF6E9] text-center">
            <p className="text-title-main text-lg font-bold">판매 이력이 없습니다</p>
          </div>
        ) : (
          filteredItems.map(product => (
            <ProductCard key={product.uid} context="MY_SELLING" product={product} />
          ))
        )}
      </ProductsGrid>
      {/* <Pagenation className="mt-5" /> */}
    </div>
  );
}
