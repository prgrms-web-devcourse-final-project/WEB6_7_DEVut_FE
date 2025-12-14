"use client";
import { useState } from "react";
import Input from "../common/Input";
import { FileSearch, Search } from "lucide-react";
import { twMerge } from "tailwind-merge";
import OptionDropdown from "../common/OptionDropdown";

export default function SearchInput() {
  const [onSell, setOnSell] = useState(false);
  const [status, setStatus] = useState("전체");
  return (
    <div className="flex w-full flex-wrap items-center gap-4">
      {/* 검색 인풋 */}
      <div className="relative flex w-full lg:flex-1">
        <Input placeholder="상품명을 입력해주세요" />
        <div className="text-custom-dark-brown absolute top-3 right-2">
          <button className="border-custom-brown mr-3 border-r px-3">
            <FileSearch size={30} />
          </button>
          <button className="transition-all hover:scale-110 active:scale-95">
            <Search size={30} />
          </button>
        </div>
      </div>

      {/* 판매중 토글 */}
      <div className="flex shrink-0 items-center gap-3">
        <p className="text-custom-dark-brown text-[18px] whitespace-nowrap">판매중인 상품만 보기</p>
        <div
          className="border-custom-dark-brown relative h-8 w-14 cursor-pointer rounded-full border-4"
          onClick={() => setOnSell(prev => !prev)}
        >
          <div
            className={twMerge(
              "border-custom-dark-brown bg-custom-orange absolute top-1/2 left-0 h-6 w-6 -translate-y-1/2 rounded-full border-4",
              "transition-transform duration-300 ease-in-out",
              onSell && "translate-x-6"
            )}
          />
        </div>
      </div>

      {/* 정렬 드롭다운 */}
      <div className="shrink-0">
        <OptionDropdown label={status}>
          <OptionDropdown.Item onClick={() => setStatus("전체")}>전체</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("잔금대기")}>라이브</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("거래 중")}>지연</OptionDropdown.Item>
        </OptionDropdown>
      </div>
    </div>
  );
}
