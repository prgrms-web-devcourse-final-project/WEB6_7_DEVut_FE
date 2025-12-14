"use client";

import OptionDropdown from "@/components/common/OptionDropdown";
import OrderSwitch from "@/components/common/OrderSwitch";
import Pagenation from "@/components/common/Pagenation";
import ProductCard from "@/components/common/ProductCard";
import Title from "@/components/common/Title";
import { useState } from "react";

export default function PurchaseDetail() {
  const [status, setStatus] = useState("전체");
  return (
    <div className="mt-10">
      <Title wrapperClassName="mb-0">구매 상세</Title>
      <div className="flex w-full justify-end gap-5">
        <div className="relative w-[110px] translate-y-2 scale-120">
          <OrderSwitch />
        </div>

        <OptionDropdown label={status}>
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

      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
      </div>
      <Pagenation />
    </div>
  );
}
