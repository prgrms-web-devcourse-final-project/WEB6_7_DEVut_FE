"use client";

import OptionDropdown from "@/components/common/OptionDropdown";
import OrderSwitch from "@/components/common/OrderSwitch";
import Pagenation from "@/components/common/Pagenation";
import ProductCard from "@/components/common/ProductCard";
import ProductsGrid from "@/components/common/ProductsGrid";
import Title from "@/components/common/Title";
import { useMySell } from "@/features/mypage/hooks/useMySell";
import { productCardMock_MY_SELLING } from "@/features/product/mock/productCard.mySelling.mock";
import { myPageCardMapping } from "@/utils/myPageCardMapping";
import { se } from "date-fns/locale";
import { useState } from "react";

export default function SaleDetail() {
  const { data: mySells } = useMySell();
  const [status, setStatus] = useState("전체");

  const newMySells = myPageCardMapping({ card: mySells });
  const sellItems = newMySells ?? [];
  return (
    <div className="mt-10">
      <Title wrapperClassName="mb-0" size={"lg"}>
        판매 상세
      </Title>
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
          <OptionDropdown.Item onClick={() => setStatus("판매 확정")}>
            판매 확정
          </OptionDropdown.Item>
        </OptionDropdown>
      </div>

      <ProductsGrid>
        {sellItems.map((product, index) => (
          <ProductCard context="MY_SELLING" key={index} product={product} />
        ))}
      </ProductsGrid>
      <Pagenation />
    </div>
  );
}
