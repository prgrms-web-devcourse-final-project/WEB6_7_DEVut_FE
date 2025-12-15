"use client";

import OptionDropdown from "@/components/common/OptionDropdown";
import BizzLogCard from "./BizzLogCard";
import { useState } from "react";

export default function MyBizzLog({ simple = false }: { simple?: boolean }) {
  const [status, setStatus] = useState("전체");
  return (
    <div className="mx-auto w-full max-w-[1440px]">
      {!simple && (
        <OptionDropdown label={status}>
          <OptionDropdown.Item onClick={() => setStatus("전체")}>전체</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("구매")}>구매</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("충전")}>충전</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("출금")}>출금</OptionDropdown.Item>
        </OptionDropdown>
      )}
      <div className="border-border-sub2 text-border-sub2 bg-content-gray mt-3 grid grid-cols-[1fr_1fr_1fr_1fr] rounded-lg border-2 px-4 py-2 text-center font-bold">
        <div>구분</div>
        <div>일시</div>
        <div>금액</div>
        <div>잔액</div>
      </div>
      <div className="mt-1 flex flex-col gap-3">
        <BizzLogCard />
        <BizzLogCard />
        <BizzLogCard />
        <BizzLogCard />
      </div>
    </div>
  );
}
